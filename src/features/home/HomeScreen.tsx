import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons, {
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';
import { prepareMiniAppBundle } from '../../core/miniapp/MiniAppBundleManager';
import { MiniAppHostScreen } from '../../core/miniapp/MiniAppHostScreen';
import { MiniAppManifest } from '../../core/miniapp/MiniAppManifest';
import { fetchMiniAppManifests } from '../../core/miniapp/MiniAppManifestService';
import { AppCard } from '../../shared/components/AppCard';
import { AppScreen } from '../../shared/components/AppScreen';
import { colors } from '../../shared/theme/colors';
import { spacing } from '../../shared/theme/spacing';
import { getCachedMiniApp } from '../../core/miniapp/MiniAppCacheStore';
import { canGrantMiniAppPermissions } from '../../core/miniapp/MiniAppPermissionManager';

const iconMap: Partial<Record<MiniAppManifest['key'], IoniconsIconName>> = {
  wallet: 'wallet-outline',
  booking: 'calendar-outline',
};

export function HomeScreen() {
  const [miniApps, setMiniApps] = useState<MiniAppManifest[]>([]);
  const [activeMiniApp, setActiveMiniApp] = useState<MiniAppManifest | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [openingKey, setOpeningKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cacheVersion, setCacheVersion] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetchMiniAppManifests()
      .then(manifests => {
        if (isMounted) {
          setMiniApps(manifests);
        }
      })
      .catch(error => {
        console.error('Failed to fetch mini app manifests:', error);

        if (isMounted) {
          setErrorMessage('Cannot load mini apps.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function openMiniApp(manifest: MiniAppManifest) {
    try {
      setErrorMessage(null);
      setOpeningKey(manifest.key);

      const permissionOk = canGrantMiniAppPermissions(manifest);

      if (!permissionOk) {
        Alert.alert(
          'Permission denied',
          `${manifest.name} requires unsupported permissions`,
        );
        return;
      }

      const result = await prepareMiniAppBundle(manifest);
      setCacheVersion(version => version + 1);

      if (result.ready) {
        setActiveMiniApp(manifest);
      } else {
        setErrorMessage(`${manifest.name} is not ready yet.`);
      }
    } catch (error) {
      console.error('Failed to open mini app:', error);
      setErrorMessage(`Cannot open ${manifest.name}.`);
    } finally {
      setOpeningKey(null);
    }
  }

  if (activeMiniApp) {
    return (
      <MiniAppHostScreen
        manifest={activeMiniApp}
        onClose={() => setActiveMiniApp(null)}
      />
    );
  }

  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello Tan 👋</Text>
            <Text style={styles.subtitle}>Welcome to your Super App</Text>
          </View>

          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={24} color="#FFFFFF" />
          </View>
        </View>

        <AppCard style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>$12,450.00</Text>
        </AppCard>

        <Text style={styles.sectionTitle}>Mini Apps</Text>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.grid} key={cacheVersion}>
            {miniApps.map(item => {
              const cached = getCachedMiniApp(item.key);

              return (
                <Pressable
                  key={item.key}
                  style={styles.pressable}
                  onPress={() => openMiniApp(item)}
                >
                  <AppCard style={styles.serviceCard}>
                    {openingKey === item.key ? (
                      <ActivityIndicator />
                    ) : (
                      <Ionicons
                        name={iconMap[item.key] ?? 'apps-outline'}
                        size={28}
                        color={colors.primary}
                      />
                    )}

                    <View>
                      <Text style={styles.serviceTitle}>{item.name}</Text>

                      <Text style={styles.version}>remote v{item.version}</Text>

                      <Text style={styles.cacheStatus}>
                        {cached
                          ? `cached v${cached.activeVersion}`
                          : 'not cached'}
                      </Text>
                    </View>
                  </AppCard>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.textMuted,
    fontSize: 15,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
  },
  balanceLabel: {
    color: '#DBEAFE',
    fontSize: 15,
  },
  balanceValue: {
    marginTop: spacing.sm,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  pressable: {
    width: '47%',
  },
  serviceCard: {
    height: 140,
    justifyContent: 'space-between',
  },
  serviceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  version: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
  },
  errorText: {
    marginBottom: spacing.md,
    color: colors.danger,
    fontSize: 14,
  },
  cacheStatus: {
    marginTop: 2,
    fontSize: 11,
    color: colors.textMuted,
  },
});

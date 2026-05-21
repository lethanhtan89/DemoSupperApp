import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Ionicons, {
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';
import { MiniAppHostScreen } from '../../core/miniapp/MiniAppHostScreen';
import { MiniAppKey } from '../../core/miniapp/MiniAppManifest';
import { AppCard } from '../../shared/components/AppCard';
import { AppScreen } from '../../shared/components/AppScreen';
import { colors } from '../../shared/theme/colors';
import { spacing } from '../../shared/theme/spacing';

const services: Array<{
  title: string;
  icon: IoniconsIconName;
  miniAppKey: MiniAppKey;
}> = [
  {
    title: 'Wallet',
    icon: 'wallet-outline',
    miniAppKey: 'wallet',
  },
  {
    title: 'Booking',
    icon: 'calendar-outline',
    miniAppKey: 'booking',
  },
];

export function HomeScreen() {
  const [activeMiniApp, setActiveMiniApp] = useState<MiniAppKey | null>(null);

  if (activeMiniApp) {
    return (
      <MiniAppHostScreen
        miniAppKey={activeMiniApp}
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

        <View style={styles.grid}>
          {services.map(item => (
            <Pressable
              key={item.title}
              style={styles.pressable}
              onPress={() => setActiveMiniApp(item.miniAppKey)}
            >
              <AppCard style={styles.serviceCard}>
                <Ionicons name={item.icon} size={28} color={colors.primary} />
                <Text style={styles.serviceTitle}>{item.title}</Text>
              </AppCard>
            </Pressable>
          ))}
        </View>
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
});

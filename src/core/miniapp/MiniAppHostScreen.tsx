import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useAuthStore} from '../auth/authStore';
import {AppScreen} from '../../shared/components/AppScreen';
import {colors} from '../../shared/theme/colors';
import {spacing} from '../../shared/theme/spacing';
import {MiniAppContext, MiniAppEvent} from './MiniAppContext';
import {MiniAppKey} from './MiniAppManifest';
import {miniAppManifestMock} from './miniAppManifest.mock';
import {miniAppRegistry} from './MiniAppRegistry';

type Props = {
  miniAppKey: MiniAppKey;
  onClose: () => void;
};

export function MiniAppHostScreen({miniAppKey, onClose}: Props) {
  const token = useAuthStore(state => state.token);
  const manifest = miniAppManifestMock.find(item => item.key === miniAppKey);
  const MiniApp = miniAppRegistry[miniAppKey];

  const context = useMemo<MiniAppContext>(
    () => ({
      userId: 'demo-user',
      accessToken: token ?? '',
      language: 'vi',
      close: onClose,
      navigate: route => {
        console.log('Mini app navigate:', route);
      },
      emitEvent: (event: MiniAppEvent) => {
        console.log('Mini app event:', event);
      },
      callApi: async () => {
        throw new Error('Mini app API client is not configured yet.');
      },
    }),
    [onClose, token],
  );

  if (!manifest?.enabled || !MiniApp) {
    return (
      <AppScreen>
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.iconButton}>
            <Ionicons name="close" size={22} color={colors.text} />
          </Pressable>
        </View>
        <Text style={styles.title}>Mini app unavailable</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.header}>
        <Text style={styles.title}>{manifest.name}</Text>
        <Pressable onPress={onClose} style={styles.iconButton}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
      </View>

      <MiniApp context={context} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

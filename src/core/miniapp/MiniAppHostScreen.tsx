import React, { useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppScreen } from '../../shared/components/AppScreen';
import { colors } from '../../shared/theme/colors';
import { MiniAppEvent, MiniAppContext } from './MiniAppContext';
import { MiniAppKey } from './MiniAppManifest';
import { miniAppRegistry } from './MiniAppRegistry';
import { rollbackMiniApp } from './MiniAppCacheStore';
import { AppButton } from '../../shared/components/AppButton';

type Props = {
  miniAppKey: MiniAppKey;
  onClose: () => void;
};

export function MiniAppHostScreen({ miniAppKey, onClose }: Props) {
  const MiniAppComponent = miniAppRegistry[miniAppKey];

  const handleEvent = (event: MiniAppEvent) => {
    switch (event.type) {
      case 'miniapp.close':
        onClose();
        break;

      case 'payment.success':
        Alert.alert(
          'Payment success',
          `Transaction: ${event.payload.transactionId}\nAmount: ${event.payload.amount}`,
        );
        break;
    }
  };

  const context = useMemo<MiniAppContext>(
    () => ({
      userId: 'user-demo-001',
      accessToken: 'fake-access-token',
      language: 'vi',

      close: onClose,

      navigate: (route, params) => {
        console.log('Mini app navigate:', route, params);
      },

      emitEvent: handleEvent,

      callApi: async <T,>(path: string, body?: unknown): Promise<T> => {
        console.log('Mini app callApi:', path, body);

        return {
          success: true,
        } as T;
      },
    }),
    [onClose],
  );

  if (!MiniAppComponent) {
    return (
      <AppScreen>
        <Text style={styles.error}>Mini app not found</Text>
      </AppScreen>
    );
  }

  function handleRollback() {
    const success = rollbackMiniApp(miniAppKey);
    if (success) {
      Alert.alert('Rollback success', `Rolled back ${miniAppKey}`);
      onClose();
    } else {
      Alert.alert('Rollback failed', 'No previous version found');
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppButton title="Rollback mini app" onPress={handleRollback} />
        <MiniAppComponent context={context} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  error: {
    color: colors.danger,
    fontSize: 16,
  },
});

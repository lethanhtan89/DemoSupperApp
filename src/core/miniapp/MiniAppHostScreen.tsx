import React, { useEffect, useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppScreen } from '../../shared/components/AppScreen';
import { colors } from '../../shared/theme/colors';
import { MiniAppEvent, MiniAppContext } from './MiniAppContext';
import { miniAppRegistry } from './MiniAppRegistry';
import { rollbackMiniApp } from './MiniAppCacheStore';
import { AppButton } from '../../shared/components/AppButton';
import { MiniAppManifest } from './MiniAppManifest';
import { hostApiGateway } from '../../api/HostApiGateway';
import { requestMiniAppPermission } from './MiniAppPermissionManager';

type Props = {
  manifest: MiniAppManifest;
  onClose: () => void;
};

export function MiniAppHostScreen({ manifest, onClose }: Props) {
  const miniAppModule = miniAppRegistry[manifest.key];

  const handleEvent = (event: MiniAppEvent) => {
    switch (event.type) {
      case 'miniapp.ready':
        console.log('[Host] mini app ready', manifest.key);
        break;

      case 'miniapp.close':
        onClose();
        break;

      case 'payment.success':
        Alert.alert(
          'Payment success',
          `Transaction: ${event.payload.transactionId}\nAmount: ${event.payload.amount}`,
        );
        break;

      case 'auth.expired':
        console.log('Session is expired, please re-login');
        break;

      case 'analytics.track':
        console.log('[Analytics]', event.payload.name, event.payload.params);
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

      requestPermission: requestMiniAppPermission,

      callApi: hostApiGateway,
    }),
    [onClose],
  );

  useEffect(() => {
    miniAppModule.bootstrap?.(context);
    context.emitEvent({
      type: 'miniapp.ready',
    });
    return () => {
      miniAppModule.destroy?.();
    };
  }, [context, miniAppModule]);

  if (!miniAppModule) {
    return (
      <AppScreen>
        <Text style={styles.error}>Mini app not found: {manifest.key}</Text>
      </AppScreen>
    );
  }

  function handleRollback() {
    const success = rollbackMiniApp(manifest.key);
    if (success) {
      Alert.alert('Rollback success', `Rolled back ${manifest.key}`);
      onClose();
    } else {
      Alert.alert('Rollback failed', 'No previous version found');
    }
  }

  return (
    <AppScreen>
      <View style={styles.container}>
        <AppButton title="Rollback mini app" onPress={handleRollback} />
        {miniAppModule.render({ context })}
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

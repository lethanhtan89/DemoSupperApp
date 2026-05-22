import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppScreen } from '../../shared/components/AppScreen';
import { colors } from '../../shared/theme/colors';
import { MiniAppContext } from './MiniAppContext';
import { MiniAppManifest } from './MiniAppManifest';
import { hostApiGateway } from '../../api/HostApiGateway';
import { requestMiniAppPermission } from './MiniAppPermissionManager';
import { miniAppEventBus } from './MiniAppEventBus';
import { MiniAppModule } from './MiniAppModule';
import { loadMiniAppModule } from './MiniAppLoader';

type Props = {
  manifest: MiniAppManifest;
  onClose: () => void;
};

export function MiniAppHostScreen({ manifest, onClose }: Props) {
  const [miniAppModule, setMiniAppModule] = useState<MiniAppModule | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEvent = useCallback(
    (event: MiniAppContext['emitEvent'] extends (value: infer Event) => void
      ? Event
      : never) => {
      const hostEvent = {
        ...event,
        source: manifest.key,
      };

      miniAppEventBus.emit(hostEvent);

      switch (hostEvent.type) {
        case 'miniapp.ready':
          console.log('[Host] mini app ready', hostEvent.source);
          break;

        case 'miniapp.close':
          onClose();
          break;

        case 'payment.success':
          Alert.alert(
            'Payment success',
            `Transaction: ${hostEvent.payload.transactionId}\nAmount: ${hostEvent.payload.amount}`,
          );
          break;

        case 'auth.expired':
          console.log('Session is expired, please re-login');
          break;

        case 'analytics.track':
          console.log(
            '[Analytics]',
            hostEvent.payload.name,
            hostEvent.payload.params,
          );
          break;
      }
    },
    [manifest.key, onClose],
  );

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
    [onClose, handleEvent],
  );

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setMiniAppModule(null);
    setErrorMessage(null);

    loadMiniAppModule(manifest)
      .then(module => {
        if (mounted) {
          setMiniAppModule(module);
        }
      })
      .catch(error => {
        console.error('Failed to load mini app module:', error);

        if (mounted) {
          setErrorMessage(`Cannot load mini app: ${manifest.name}`);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [manifest]);

  useEffect(() => {
    if (!miniAppModule) {
      return;
    }

    miniAppModule.bootstrap?.(context);

    context.emitEvent({
      type: 'miniapp.ready',
      source: manifest.key,
    });

    return () => {
      miniAppModule.destroy?.();
    };
  }, [miniAppModule, context, manifest.key]);

  if (loading) {
    return (
      <AppScreen>
        <Text>Loading mini app...</Text>
      </AppScreen>
    );
  }

  if (errorMessage || !miniAppModule) {
    return (
      <AppScreen>
        <Text style={styles.error}>
          {errorMessage ?? `Mini app not found: ${manifest.key}`}
        </Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <View style={styles.container}>{miniAppModule.render({ context })}</View>
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { MiniAppContext } from '../MiniAppContext';
import { MiniAppModule } from '../MiniAppModule';

type Props = {
  context: MiniAppContext;
};

function WalletScreen({ context }: Props) {
  async function getBalance() {
    const result = context.callApi<{
      balance: number;
      currency: string;
    }>({
      service: 'wallet',
      path: '/balabce',
      method: 'GET',
    });
    console.log('Wallet balance', result);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Mini App</Text>

      <AppCard style={styles.card}>
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.amount}>500,000 VND</Text>

        <AppButton title="Get balance via host api" onPress={getBalance} />

        <AppButton
          title="Simulate payment success"
          onPress={() => {
            context.emitEvent({
              type: 'payment.success',
              payload: {
                transactionId: 'TXN_123456',
                amount: 500000,
              },
            });
          }}
        />

        <AppButton title="Close mini app" onPress={context.close} />
      </AppCard>
    </View>
  );
}

export const WalletMiniAppModule: MiniAppModule = {
  key: 'wallet',
  version: '1.0.0',
  bootstrap: async context => {
    console.log('[Wallet] bootstrap', context.userId);
  },
  render: ({ context }) => {
    return <WalletScreen context={context} />;
  },
  destroy: () => {
    console.log('[Wallet] destroyed');
  },
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  card: {
    gap: spacing.md,
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
  },
  amount: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
});

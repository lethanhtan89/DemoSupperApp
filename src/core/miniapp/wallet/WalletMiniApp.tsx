import {StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../../../shared/components/AppButton';
import {AppCard} from '../../../shared/components/AppCard';
import {colors} from '../../../shared/theme/colors';
import {spacing} from '../../../shared/theme/spacing';
import {MiniAppContext} from '../MiniAppContext';

type Props = {
  context: MiniAppContext;
};

export function WalletMiniApp({context}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Mini App</Text>

      <AppCard style={styles.card}>
        <Text style={styles.balanceLabel}>Available balance</Text>
        <Text style={styles.balanceValue}>$12,450.00</Text>
        <AppButton title="Close mini app" onPress={context.close} />
      </AppCard>
    </View>
  );
}

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
  balanceLabel: {
    fontSize: 15,
    color: colors.textMuted,
  },
  balanceValue: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
  },
});

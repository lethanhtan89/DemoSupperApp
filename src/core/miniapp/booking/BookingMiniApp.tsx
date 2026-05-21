import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { MiniAppContext } from '../MiniAppContext';
import { AppCard } from '../../../shared/components/AppCard';
import { AppButton } from '../../../shared/components/AppButton';

type Props = {
  context: MiniAppContext;
};

export function BookingMiniApp({ context }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Mini App</Text>

      <AppCard style={styles.card}>
        <Text style={styles.title}>Booking hotel.....</Text>
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
  text: {
    fontSize: 16,
    color: colors.text,
  },
});

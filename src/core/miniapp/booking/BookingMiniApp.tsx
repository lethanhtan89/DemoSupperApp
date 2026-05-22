import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { MiniAppContext } from '../MiniAppContext';
import { AppCard } from '../../../shared/components/AppCard';
import { AppButton } from '../../../shared/components/AppButton';
import { MiniAppModule } from '../MiniAppModule';

type Props = {
  context: MiniAppContext;
};

export function BookingScreen({ context }: Props) {
  async function getHotels() {
    const result = await context.callApi({
      service: 'booking',
      path: '/hotels',
      method: 'GET',
    });

    console.log('Hotels:', result);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Mini App</Text>

      <AppCard style={styles.card}>
        <Text style={styles.title}>Booking hotel.....</Text>
        <AppButton title="Get hotels via Host API" onPress={getHotels} />
        <AppButton title="Close mini app" onPress={context.close} />
      </AppCard>
    </View>
  );
}

export const BookingMiniAppModule: MiniAppModule = {
  key: 'booking',
  version: '1.0.0',

  bootstrap: async context => {
    console.log('[Booking] bootstrap', context.userId);
  },

  render: ({ context }) => {
    return <BookingScreen context={context} />;
  },

  destroy: () => {
    console.log('[Booking] destroy');
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
  text: {
    fontSize: 16,
    color: colors.text,
  },
});

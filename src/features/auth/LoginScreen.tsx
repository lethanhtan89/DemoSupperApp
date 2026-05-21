import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../../core/auth/authStore';
import { spacing } from '../../shared/theme/spacing';
import { colors } from '../../shared/theme/colors';
import { AppScreen } from '../../shared/components/AppScreen';
import { AppCard } from '../../shared/components/AppCard';
import { AppInput } from '../../shared/components/AppInput';
import { AppButton } from '../../shared/components/AppButton';

export function LoginScreen() {
  const login = useAuthStore(state => state.login);

  return (
    <AppScreen>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Login to continue your Super App</Text>
        </View>

        <AppCard style={styles.card}>
          <AppInput label="Phone number" placeholder="Enter phone number" />
          <AppInput label="Password" placeholder="Enter password" secureTextEntry />

          <AppButton title="Login" onPress={login} />
        </AppCard>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: colors.textMuted,
  },
  card: {
    gap: spacing.md,
  },
});

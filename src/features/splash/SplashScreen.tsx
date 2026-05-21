import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAuthStore } from '../../core/auth/authStore';

export function SplashScreen() {
  const finishLoading = useAuthStore(state => state.finishLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 1000);
    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <View>
      <Text>Loading Supper App</Text>
    </View>
  );
}

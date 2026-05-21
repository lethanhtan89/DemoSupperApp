import React from 'react';
import {Text} from 'react-native';
import { useAuthStore } from '../../core/auth/authStore';
import { Button } from 'react-native';
import { AppScreen } from '../../shared/components/AppScreen';

export function ProfileScreen() {

  const logout = useAuthStore(state => state.logout)

  return (
    <AppScreen>
      <Text>Profile</Text>
      <Button title='Logout' onPress={logout}/>
    </AppScreen>
  );
}

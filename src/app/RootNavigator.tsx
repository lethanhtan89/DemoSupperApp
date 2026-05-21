import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../features/home/HomeScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { SplashScreen } from '../features/splash/SplashScreen';
import { LoginScreen } from '../features/auth/LoginScreen';
import { useAuthStore } from '../core/auth/authStore';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors } from '../shared/theme/colors';

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type TabBarIconProps = {
  color: string;
  size: number;
};

function HomeTabIcon({color, size}: TabBarIconProps) {
  return <Ionicons size={size} color={color} name="home" />;
}

function ProfileTabIcon({color, size}: TabBarIconProps) {
  return <Ionicons size={size} color={color} name="person" />;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#94A3B8',

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: HomeTabIcon}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarIcon: ProfileTabIcon}}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const isLoading = useAuthStore(state => state.isLoading);
  const token = useAuthStore(state => state.token);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!token) {
    return <LoginScreen />;
  }

  return <MainTabs />;
}

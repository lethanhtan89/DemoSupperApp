/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-screens';

import React from 'react';
import { AppProvider } from './src/app/AppProvider';
import { RootNavigator } from './src/app/RootNavigator';

function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}

export default App;

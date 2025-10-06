import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, AptosProvider, ContactsProvider } from './src/hooks';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/constants';

export default function App() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <AptosProvider>
          <StatusBar style="dark" backgroundColor={theme.colors.background.primary} />
          <AppNavigator />
        </AptosProvider>
      </ContactsProvider>
    </AuthProvider>
  );
}

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, AptosProvider, ContactsProvider } from './src/hooks';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/constants';
import { DemoDataProvider } from './src/hooks/useDemoData';

export default function App() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <AptosProvider>
          <DemoDataProvider>
            <StatusBar style="dark" backgroundColor={theme.colors.background.primary} />
            <AppNavigator />
          </DemoDataProvider>
        </AptosProvider>
      </ContactsProvider>
    </AuthProvider>
  );
}

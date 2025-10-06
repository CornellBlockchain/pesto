import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, AptosProvider, ContactsProvider } from './src/hooks';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/constants';
import { DemoDataProvider } from './src/hooks/useDemoData';

export default function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <ContactsProvider>
        <AptosProvider>
          <StatusBar style="dark" backgroundColor={theme.colors.background.primary} />
          <AppNavigator />
        </AptosProvider>
      </ContactsProvider>
=======
      <AptosProvider>
        <ContactsProvider>
          <DemoDataProvider>
            <StatusBar style="dark" backgroundColor={theme.colors.background.primary} />
            <AppNavigator />
          </DemoDataProvider>
        </ContactsProvider>
      </AptosProvider>
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    </AuthProvider>
  );
}

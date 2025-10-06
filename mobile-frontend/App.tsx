import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/hooks/useAuth';
import { AptosProvider } from './src/hooks/useAptos';
import { ContactsProvider } from './src/hooks/useContacts';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/constants';
import { DemoDataProvider } from './src/hooks/useDemoData';

export default function App() {
  return (
    <AuthProvider>
      <AptosProvider>
        <ContactsProvider>
          <DemoDataProvider>
            <StatusBar style="dark" backgroundColor={theme.colors.background.primary} />
            <AppNavigator />
          </DemoDataProvider>
        </ContactsProvider>
      </AptosProvider>
    </AuthProvider>
  );
}

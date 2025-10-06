import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/hooks/useAuth';
import { AptosProvider } from './src/hooks/useAptos';
import { ContactsProvider } from './src/hooks/useContacts';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/constants';

export default function App() {
  return (
    <AuthProvider>
      <AptosProvider>
        <ContactsProvider>
          <StatusBar style="dark" backgroundColor={theme.colors.background.primary} />
          <AppNavigator />
        </ContactsProvider>
      </AptosProvider>
    </AuthProvider>
  );
}

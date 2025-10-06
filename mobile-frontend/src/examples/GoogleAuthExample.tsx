/**
 * Example component showing how to use Google OAuth authentication
 * This is for demonstration purposes only
 */

import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { theme } from '../constants';

export const GoogleAuthExample: React.FC = () => {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    loginWithGoogle, 
    logout 
  } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      Alert.alert('Success', 'Successfully signed in with Google!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Google sign-in failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Success', 'Successfully signed out!');
    } catch (error: any) {
      Alert.alert('Error', 'Sign-out failed');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (isAuthenticated && user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        {user.avatar && (
          <Text style={styles.text}>Avatar: {user.avatar}</Text>
        )}
        
        <Button
          title="Sign Out"
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google OAuth Example</Text>
      <Text style={styles.subtitle}>
        This example shows how to use Google OAuth authentication
      </Text>
      
      {error && (
        <Text style={styles.errorText}>Error: {error}</Text>
      )}
      
      <Button
        title="Sign in with Google"
        onPress={handleGoogleLogin}
        icon="logo-google"
        fullWidth
      />
      
      <Text style={styles.note}>
        Note: Google Sign-In requires a physical device and proper configuration.
        See GOOGLE_OAUTH_SETUP.md for setup instructions.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.screen.horizontal,
    justifyContent: 'center',
    backgroundColor: theme.colors.background.primary,
  },
  title: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  subtitle: {
    ...theme.typography.textStyles.bodyLarge,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  text: {
    ...theme.typography.textStyles.bodyMedium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  errorText: {
    ...theme.typography.textStyles.bodyMedium,
    color: theme.colors.status.error,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  note: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing['2xl'],
    fontStyle: 'italic',
  },
});

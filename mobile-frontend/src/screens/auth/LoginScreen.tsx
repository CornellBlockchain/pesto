import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
=======
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
import { useAuth } from '../../hooks/useAuth';
import { Button, TextInput, Logo } from '../../components';
import { theme } from '../../constants';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleEmailLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    try {
      await login(email.trim());
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your details and try again');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      Alert.alert('Google Login Failed', 'Please try again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Logo size="hero" />
            </View>

            <Text style={styles.title}>Log In</Text>
            <Text style={styles.subtitle}>Create an account or sign in</Text>

            <View style={styles.fullWidth}>
              <TextInput
                placeholder="email@domain.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                leftIcon="mail"
              />
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="Continue"
                onPress={handleEmailLogin}
                loading={isLoading}
                fullWidth
              />
            </View>

            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.buttonGroup}>
              <Button
                title="Continue with Google"
                onPress={handleGoogleLogin}
                variant="secondary"
                icon="logo-google"
                fullWidth
                disabled={isLoading}
              />
            </View>

            <Text style={styles.legalText}>
              By clicking continue, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingTop: theme.spacing['6xl'],
    paddingBottom: theme.spacing['4xl'],
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: theme.spacing['4xl'],
  },
  title: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.textStyles.bodyLarge,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing['3xl'],
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  buttonGroup: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing['4xl'],
    marginBottom: theme.spacing['2xl'],
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.light,
  },
  separatorText: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.light,
    marginHorizontal: theme.spacing.lg,
  },
  legalText: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing['4xl'],
    lineHeight: 18,
  },
  linkText: {
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
});


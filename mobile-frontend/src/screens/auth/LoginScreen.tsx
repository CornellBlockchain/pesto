import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Button, TextInput, Logo } from '../../components';
import { theme } from '../../constants';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again');
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Logo size="large" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Create an account or sign in</Text>

          {/* Email Input */}
          <TextInput
            placeholder="email@domain.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon="mail"
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock-closed"
          />

          {/* Continue Button */}
          <Button
            title="Continue"
            onPress={handleEmailLogin}
            loading={isLoading}
            fullWidth
          />

          {/* Separator */}
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Google Login Button */}
          <Button
            title="Continue with Google"
            onPress={handleGoogleLogin}
            variant="secondary"
            icon="logo-google"
            fullWidth
            disabled={isLoading}
          />

          {/* Legal Text */}
          <Text style={styles.legalText}>
            By clicking continue, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.screen.horizontal,
  },
  content: {
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
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing['2xl'],
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


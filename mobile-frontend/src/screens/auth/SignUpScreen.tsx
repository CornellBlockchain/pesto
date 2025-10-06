import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Button, TextInput, Logo } from '../../components';
import { theme } from '../../constants';

export const SignUpScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await signup(name, email, password);
    } catch (error) {
      Alert.alert('Signup Failed', 'Please try again');
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
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Create your Pesto account</Text>

          {/* Name Input */}
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            leftIcon="person"
          />

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

          {/* Confirm Password Input */}
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon="lock-closed"
          />

          {/* Sign Up Button */}
          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={isLoading}
            fullWidth
          />

          {/* Legal Text */}
          <Text style={styles.legalText}>
            By creating an account, you agree to our{' '}
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


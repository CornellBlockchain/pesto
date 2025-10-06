import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { Button, TextInput, Logo } from '../../components';
import { theme } from '../../constants';

export const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading } = useAuth();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await forgotPassword(email);
      Alert.alert(
        'Email Sent',
        'Please check your email for password reset instructions'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
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
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder="email@domain.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon="mail"
          />

          {/* Send Button */}
          <Button
            title="Send Reset Link"
            onPress={handleForgotPassword}
            loading={isLoading}
            fullWidth
          />
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
    lineHeight: 24,
  },
});


import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { theme } from '../../constants';

interface OverlayProps {
  visible: boolean;
  type?: 'loading' | 'error' | 'success';
  message?: string;
  onPress?: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({
  visible,
  type = 'loading',
  message,
  onPress,
}) => {
  if (!visible) return null;

  const renderContent = () => {
    switch (type) {
      case 'loading':
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary.green} />
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
        );
      
      case 'error':
        return (
          <View style={styles.messageContainer}>
            <Text style={[styles.message, styles.errorMessage]}>{message}</Text>
            {onPress && (
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      
      case 'success':
        return (
          <View style={styles.messageContainer}>
            <Text style={[styles.message, styles.successMessage]}>{message}</Text>
            {onPress && (
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.shadow.medium,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.spacing.dimensions.modal.borderRadius,
    padding: theme.spacing['2xl'],
    marginHorizontal: theme.spacing.lg,
    alignItems: 'center',
    minWidth: 200,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  messageContainer: {
    alignItems: 'center',
  },
  message: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  errorMessage: {
    color: theme.colors.status.error,
  },
  successMessage: {
    color: theme.colors.status.success,
  },
  button: {
    backgroundColor: theme.colors.primary.green,
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.spacing.dimensions.button.borderRadius,
  },
  buttonText: {
    ...theme.typography.textStyles.button,
    color: theme.colors.text.white,
  },
});


import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <Ionicons
        name={icon as any}
        size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
        color={variant === 'primary' ? theme.colors.text.white : theme.colors.text.primary}
        style={iconPosition === 'left' ? styles.iconLeft : styles.iconRight}
      />
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.text.white : theme.colors.text.primary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && renderIcon()}
          <Text style={textStyle}>{title}</Text>
          {icon && iconPosition === 'right' && renderIcon()}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.spacing.dimensions.button,
  },
  
  // Variants
  primary: {
    backgroundColor: theme.colors.button.primary,
  },
  secondary: {
    backgroundColor: theme.colors.button.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.button.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  small: {
    height: 36,
    paddingHorizontal: 12,
  },
  medium: {
    height: theme.spacing.dimensions.button.height,
    paddingHorizontal: 16,
  },
  large: {
    height: 56,
    paddingHorizontal: 24,
  },
  
  // States
  disabled: {
    backgroundColor: theme.colors.button.disabled,
    borderColor: theme.colors.button.disabled,
  },
  fullWidth: {
    width: '100%',
  },
  
  // Text styles
  text: {
    ...theme.typography.textStyles.button,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.colors.button.primaryText,
  },
  secondaryText: {
    color: theme.colors.button.secondaryText,
  },
  outlineText: {
    color: theme.colors.button.primary,
  },
  ghostText: {
    color: theme.colors.button.primary,
  },
  disabledText: {
    color: theme.colors.button.disabledText,
  },
  
  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: theme.typography.textStyles.button.fontSize,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Icon styles
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});


import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { InputProps } from '../../types';

export const TextInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  error,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  label,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const containerStyle = [
    styles.container,
    isFocused && styles.focused,
    error && styles.error,
    disabled && styles.disabled,
  ];

  const inputStyle = [
    styles.input,
    multiline && styles.multilineInput,
    disabled && styles.disabledInput,
  ];

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setIsSecure(!isSecure);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return isSecure ? 'eye-off' : 'eye';
    }
    return rightIcon;
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={containerStyle}>
        {leftIcon && (
          <Ionicons
            name={leftIcon as any}
            size={20}
            color={theme.colors.text.tertiary}
            style={styles.leftIcon}
          />
        )}
        
        <RNTextInput
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress && !secureTextEntry}
          >
            <Ionicons
              name={getRightIcon() as any}
              size={20}
              color={theme.colors.text.tertiary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: theme.spacing.component.input.marginVertical,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.spacing.dimensions.input.borderRadius,
    height: theme.spacing.dimensions.input.height,
    paddingHorizontal: theme.spacing.component.input.paddingHorizontal,
  },
  focused: {
    borderColor: theme.colors.primary.green,
    borderWidth: 2,
  },
  error: {
    borderColor: theme.colors.status.error,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: theme.colors.background.secondary,
    borderColor: theme.colors.border.light,
  },
  input: {
    flex: 1,
    ...theme.typography.textStyles.input,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.component.input.paddingVertical,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    color: theme.colors.text.placeholder,
  },
  label: {
    ...theme.typography.textStyles.captionMedium,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  required: {
    color: theme.colors.status.error,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIconContainer: {
    marginLeft: 12,
    padding: 4,
  },
  errorText: {
    ...theme.typography.textStyles.small,
    color: theme.colors.status.error,
    marginTop: 4,
  },
});


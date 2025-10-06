import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../constants';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 'medium',
  backgroundColor = theme.colors.primary.green,
  textColor = theme.colors.text.white,
  style,
}) => {
  const sizeMap = {
    small: theme.spacing.dimensions.avatar.sm,
    medium: theme.spacing.dimensions.avatar.md,
    large: theme.spacing.dimensions.avatar.lg,
    xlarge: theme.spacing.dimensions.avatar.xl,
  };
  const sizeValue = sizeMap[size];
  const fontSize = size === 'small' ? 12 : size === 'large' ? 18 : size === 'xlarge' ? 24 : 14;

  const avatarStyle = [
    styles.avatar,
    {
      width: sizeValue,
      height: sizeValue,
      borderRadius: sizeValue / 2,
      backgroundColor,
    },
    style,
  ];

  const textStyle = [
    styles.text,
    {
      fontSize,
      color: textColor,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatar, {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
        }]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={avatarStyle}>
      {name && (
        <Text style={textStyle}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontWeight: '600',
  },
});


import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../constants';
import { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({
  children,
  padding = theme.spacing.component.card.padding,
  margin = theme.spacing.component.card.marginVertical,
  borderRadius = theme.spacing.dimensions.card.borderRadius,
  backgroundColor = theme.colors.background.primary,
  shadow = true,
  onPress,
}) => {
  const cardStyle = [
    styles.card,
    {
      padding,
      margin,
      borderRadius,
      backgroundColor,
    },
    shadow && styles.shadow,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: theme.spacing.dimensions.card.minHeight,
  },
  shadow: {
    shadowColor: theme.colors.shadow.medium,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

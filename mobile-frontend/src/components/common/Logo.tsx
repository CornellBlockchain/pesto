import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { theme } from '../../constants';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  showText?: boolean;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  showText = true,
  color = theme.colors.primary.green,
}) => {
  const sizeValue = (() => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 80;
      case 'hero':
        return 112;
      default:
        return 48;
    }
  })();

  const fontSize = (() => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 16;
      case 'hero':
        return 18;
      default:
        return 12;
    }
  })();

  return (
    <View style={styles.container}>
      <View style={[styles.logo, { width: sizeValue, height: sizeValue, backgroundColor: color }]}>
        <Text style={[styles.logoText, { fontSize: sizeValue * 0.6 }]}>P</Text>
      </View>
      {showText && (
        <Text style={[styles.text, { fontSize }]}>PESTO</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: theme.colors.text.white,
    fontWeight: '700',
  },
  text: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

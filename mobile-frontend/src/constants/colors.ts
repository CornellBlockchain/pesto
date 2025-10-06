/**
 * Color palette extracted from Figma designs
 * Based on the Pesto remittance app design system
 */

export const colors = {
  // Primary Colors
  primary: {
    green: '#2ECC71', // Pesto brand green
    black: '#000000',
    white: '#FFFFFF',
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    dark: '#363636', // Status bar background
    card: '#FFFFFF',
  },

  // Text Colors
  text: {
    primary: '#000000',
    secondary: '#333333',
    tertiary: '#4A4A4A',
    placeholder: '#AAAAAA',
    light: '#BBBBBB',
    white: '#FFFFFF',
  },

  // Accent Colors
  accent: {
    blue: '#007AFF', // USDC blue
    green: '#00C851', // USDT green
    orange: '#FF9500', // wBTC orange
    red: '#FF3B30', // Error states, dots
    gold: '#FFD700', // Bitcoin gold
  },

  // Button Colors
  button: {
    primary: '#000000',
    primaryText: '#FFFFFF',
    secondary: '#F2F2F2',
    secondaryText: '#000000',
    google: '#F2F2F2',
    googleText: '#000000',
    disabled: '#E0E0E0',
    disabledText: '#9E9E9E',
  },

  // Status Colors
  status: {
    success: '#00C851',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#007AFF',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    medium: '#CCCCCC',
    dark: '#999999',
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },

  // Crypto Asset Colors
  crypto: {
    apt: '#007AFF', // Aptos blue
    usdc: '#2775CA', // USDC blue
    usdt: '#26A17B', // USDT green
    wbtc: '#F7931A', // Bitcoin orange
    kapt: '#2ECC71', // Kofi Aptos green
    amapt: '#007AFF', // Amnis Aptos blue
  },
} as const;

export type ColorKey = keyof typeof colors;
export type ColorValue = typeof colors[ColorKey];


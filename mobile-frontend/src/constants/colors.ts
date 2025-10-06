/**
 * Color palette extracted from Figma designs
 * Based on the Pesto remittance app design system
 */

export const colors = {
  // Brand palette derived from Figma
  primary: {
    green: '#00C46F',
    black: '#111111',
    white: '#FFFFFF',
  },

  neutral: {
    900: '#111111',
    700: '#3C3C43',
    500: '#8E8E93',
    400: '#A1A1A8',
    300: '#C7C7CC',
    200: '#E5E5EA',
    100: '#F2F2F7',
    50: '#FAFAFD',
  },

  // Background layers
  background: {
    primary: '#FFFFFF',
    secondary: '#F7F7FA',
    elevated: '#FFFFFF',
    screen: '#F5F5F7',
    inverse: '#111111',
  },

  // Copy colors
  text: {
    primary: '#111111',
    secondary: '#3C3C43',
    tertiary: '#6C6C7A',
    placeholder: '#9A9AA1',
    light: '#A1A1A8',
    white: '#FFFFFF',
  },

  accent: {
    blue: '#0A84FF',
    green: '#30D158',
    orange: '#FF9F0A',
    red: '#FF3B30',
    yellow: '#FFD60A',
  },

  button: {
    primary: '#111111',
    primaryText: '#FFFFFF',
    secondary: '#F2F2F7',
    secondaryText: '#111111',
    ghost: 'transparent',
    ghostText: '#111111',
    google: '#F7F7FA',
    googleText: '#1F1F24',
    disabled: '#D8D8DC',
    disabledText: '#A1A1A8',
  },

  status: {
    success: '#30D158',
    error: '#FF3B30',
    warning: '#FF9F0A',
    info: '#0A84FF',
  },

  border: {
    light: '#E5E5EA',
    medium: '#C7C7CC',
    dark: '#8E8E93',
  },

  shadow: {
    light: 'rgba(17, 17, 17, 0.08)',
    medium: 'rgba(17, 17, 17, 0.14)',
    dark: 'rgba(17, 17, 17, 0.24)',
  },

  overlay: {
    scrim: 'rgba(0, 0, 0, 0.4)',
    scrimStrong: 'rgba(0, 0, 0, 0.6)',
  },

  crypto: {
    apt: '#0A84FF',
    usdc: '#2775CA',
    usdt: '#26A17B',
    wbtc: '#F7931A',
    kapt: '#00C46F',
    amapt: '#0D6EFD',
  },
} as const;

export type ColorKey = keyof typeof colors;
export type ColorValue = typeof colors[ColorKey];

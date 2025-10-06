/**
 * Main theme configuration combining all design tokens
 * Based on the Pesto remittance app design system
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
} as const;

export type Theme = typeof theme;

// Default theme export
export default theme;

// Theme provider context type
export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}


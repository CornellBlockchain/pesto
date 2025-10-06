/**
 * Central export for all constants
 */

export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
export { theme, default as defaultTheme } from './theme';

// Re-export types
export type { ColorKey, ColorValue } from './colors';
export type { TypographyKey, TextStyleKey } from './typography';
export type { SpacingKey, ComponentSpacingKey, DimensionKey } from './spacing';
export type { Theme, ThemeContextType } from './theme';


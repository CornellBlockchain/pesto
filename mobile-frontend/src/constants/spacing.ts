/**
 * Spacing system extracted from Figma designs
 * Based on the Pesto remittance app design system
 */

export const spacing = {
  // Base spacing unit (4px grid)
  unit: 4,

  // Core spacing scale mapped to Figma naming
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 56,
  '7xl': 64,
  '8xl': 80,

  // Screen level padding pulled from layout specs
  screen: {
    horizontal: 20,
    vertical: 24,
    gutter: 16,
  },

  // Component spacing primitives
  component: {
    button: {
      paddingHorizontal: 20,
      paddingVertical: 14,
      marginVertical: 12,
    },
    input: {
      paddingHorizontal: 18,
      paddingVertical: 14,
      marginVertical: 12,
    },
    card: {
      padding: 20,
      gap: 12,
      marginVertical: 16,
    },
    listItem: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      gap: 12,
    },
    section: {
      marginVertical: 32,
      paddingHorizontal: 20,
    },
    header: {
      paddingTop: 16,
      paddingBottom: 12,
      paddingHorizontal: 20,
    },
    navigation: {
      tabBarHeight: 60,
      headerHeight: 56,
      statusBarHeight: 44,
    },
  },

  layout: {
    screenMargin: 20,
    sectionGap: 24,
    elementGap: 16,
    smallGap: 8,
    largeGap: 32,
    xlGap: 40,
  },

  borderRadius: {
    none: 0,
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  dimensions: {
    button: {
      height: 52,
      minWidth: 140,
      borderRadius: 14,
    },
    input: {
      height: 52,
      borderRadius: 14,
    },
    avatar: {
      sm: 32,
      md: 44,
      lg: 56,
      xl: 72,
      '2xl': 96,
    },
    icon: {
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
    },
    logo: {
      height: 120,
      width: 120,
    },
    card: {
      borderRadius: 20,
      minHeight: 92,
    },
    tab: {
      height: 42,
      borderRadius: 22,
      paddingHorizontal: 18,
    },
    bottomSheet: {
      borderRadius: 24,
      handleHeight: 5,
    },
    modal: {
      borderRadius: 24,
      maxWidth: 420,
    },
  },
} as const;

export type SpacingKey = keyof typeof spacing;
export type ComponentSpacingKey = keyof typeof spacing.component;
export type DimensionKey = keyof typeof spacing.dimensions;

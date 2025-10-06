/**
 * Spacing system extracted from Figma designs
 * Based on the Pesto remittance app design system
 */

export const spacing = {
  // Base spacing unit (4px)
  unit: 4,

  // Spacing scale
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 12,   // 12px
  lg: 16,   // 16px
  xl: 20,   // 20px
  '2xl': 24, // 24px
  '3xl': 32, // 32px
  '4xl': 40, // 40px
  '5xl': 48, // 48px
  '6xl': 56, // 56px
  '7xl': 64, // 64px
  '8xl': 80, // 80px

  // Semantic spacing
  screen: {
    horizontal: 16, // Horizontal padding for screens
    vertical: 20,   // Vertical padding for screens
  },

  // Component spacing
  component: {
    // Button spacing
    button: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginVertical: 8,
    },

    // Input spacing
    input: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginVertical: 8,
    },

    // Card spacing
    card: {
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
    },

    // List item spacing
    listItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 4,
    },

    // Section spacing
    section: {
      marginVertical: 24,
      paddingHorizontal: 16,
    },

    // Header spacing
    header: {
      paddingTop: 16,
      paddingBottom: 12,
      paddingHorizontal: 16,
    },

    // Navigation spacing
    navigation: {
      tabBarHeight: 60,
      headerHeight: 44,
      statusBarHeight: 44,
    },
  },

  // Layout spacing
  layout: {
    // Screen margins
    screenMargin: 16,
    
    // Section gaps
    sectionGap: 24,
    
    // Element gaps
    elementGap: 16,
    
    // Small gaps
    smallGap: 8,
    
    // Large gaps
    largeGap: 32,
  },

  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },

  // Specific component dimensions
  dimensions: {
    // Button dimensions
    button: {
      height: 48,
      minWidth: 120,
      borderRadius: 12,
    },

    // Input dimensions
    input: {
      height: 48,
      borderRadius: 12,
    },

    // Avatar dimensions
    avatar: {
      sm: 32,
      md: 48,
      lg: 64,
      xl: 80,
      '2xl': 100,
    },

    // Icon dimensions
    icon: {
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
    },

    // Logo dimensions
    logo: {
      height: 40,
      width: 40,
    },

    // Card dimensions
    card: {
      borderRadius: 16,
      minHeight: 80,
    },

    // Tab dimensions
    tab: {
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 16,
    },

    // Bottom sheet dimensions
    bottomSheet: {
      borderRadius: 20,
      handleHeight: 4,
    },

    // Modal dimensions
    modal: {
      borderRadius: 16,
      maxWidth: 400,
    },
  },
} as const;

export type SpacingKey = keyof typeof spacing;
export type ComponentSpacingKey = keyof typeof spacing.component;
export type DimensionKey = keyof typeof spacing.dimensions;


/**
 * Typography scale extracted from Figma designs
 * Based on the Pesto remittance app design system
 */

export const typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Text Styles (Predefined combinations)
  textStyles: {
    // Headers
    h1: {
      fontSize: 28,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },

    // Body Text
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 1.5,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },

    // Captions and Small Text
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    captionMedium: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.3,
    },

    // Button Text
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },

    // Input Text
    input: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    inputPlaceholder: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },

    // Status Bar
    statusBar: {
      fontSize: 17,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },

    // Asset Values
    assetValue: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    assetValueLarge: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 1.1,
    },

    // Transaction Text
    transactionName: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    transactionDescription: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    transactionTime: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.3,
    },
  },
} as const;

export type TypographyKey = keyof typeof typography;
export type TextStyleKey = keyof typeof typography.textStyles;


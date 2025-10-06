/**
 * Typography scale extracted from Figma designs
 * Based on the Pesto remittance app design system
 */

export const typography = {
  // Font families (system fallbacks until custom fonts are added)
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  lineHeight: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  textStyles: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700' as const,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
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
    statusBar: {
      fontSize: 17,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    assetValue: {
      fontSize: 28,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    assetValueLarge: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 1.1,
    },
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
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.3,
    },
  },
} as const;

export type TypographyKey = keyof typeof typography;
export type TextStyleKey = keyof typeof typography.textStyles;

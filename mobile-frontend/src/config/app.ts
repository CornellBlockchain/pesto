/**
 * App configuration
 */

export const appConfig = {
  // Aptos Network Configuration
  aptos: {
    network: 'testnet' as const, // Change to 'mainnet' for production
    nodeUrl: 'https://fullnode.testnet.aptoslabs.com',
    faucetUrl: 'https://faucet.testnet.aptoslabs.com',
  },

  // Google OAuth Configuration
  google: {
    webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Replace with your actual client ID
    iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID', // Replace with your actual iOS client ID
  },

  // API Configuration
  api: {
    baseUrl: 'https://api.pesto.com', // Replace with your actual API URL
    timeout: 10000,
  },

  // App Features
  features: {
    enableBiometrics: true,
    enableNotifications: true,
    enableAnalytics: true,
    enableCrashReporting: true,
  },

  // Security
  security: {
    enablePinCode: true,
    enableFaceId: true,
    enableTouchId: true,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
  },

  // UI Configuration
  ui: {
    enableDarkMode: true,
    enableAnimations: true,
    enableHaptics: true,
  },

  // Compliance Features
  compliance: {
    enableKYC: true,
    enableAML: true,
    enableTransactionLimits: true,
    maxTransactionAmount: 10000, // USD
    dailyTransactionLimit: 50000, // USD
  },
} as const;

export type AppConfig = typeof appConfig;


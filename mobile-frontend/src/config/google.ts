/**
 * Google OAuth Configuration
 * 
 * To set up Google OAuth:
 * 1. Go to Google Cloud Console (https://console.cloud.google.com/)
 * 2. Create a new project or select existing one
 * 3. Enable Google+ API
 * 4. Create OAuth 2.0 credentials
 * 5. Add your bundle ID (com.pesto.remittance) to the iOS credentials
 * 6. Add your package name (com.pesto.remittance) to the Android credentials
 * 7. Download the configuration files:
 *    - iOS: GoogleService-Info.plist
 *    - Android: google-services.json
 * 8. Place them in the mobile-frontend root directory
 * 9. Update the client IDs below with your actual client IDs
 */

export const GOOGLE_CONFIG = {
  // Web Client ID (from Google Cloud Console) - only one needed for Expo
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  
  // Scopes for Google OAuth
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

// Development/Testing configuration
export const GOOGLE_CONFIG_DEV = {
  webClientId: '123456789-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

// Demo configuration for Expo testing (this is a placeholder - replace with real client ID)
export const GOOGLE_CONFIG_DEMO = {
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

// Use demo config for now - replace with actual config when ready
export const CURRENT_GOOGLE_CONFIG = GOOGLE_CONFIG_DEMO;

# Google OAuth Setup Guide (Expo Compatible)

This guide explains how to set up Google OAuth authentication for the Pesto mobile app using web-based OAuth (Expo compatible).

## Prerequisites

- Google Cloud Console account
- Expo development environment
- No native compilation required (works with Expo Go)

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 1.2 Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" and enable it
3. Also enable "Google Identity" if available

### 1.3 Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Fill in the required information:
   - App name: "Pesto"
   - User support email: your email
   - Developer contact information: your email
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Add test users (for development)

### 1.4 Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Create Web application credentials:

#### Web Credentials (Required)
- Application type: "Web application"
- Authorized JavaScript origins: 
  - `http://localhost:8081` (for Expo development)
  - `https://yourdomain.com` (for production)
- Authorized redirect URIs: 
  - `exp://127.0.0.1:8081` (for Expo development)
  - `https://yourdomain.com/auth/callback` (for production)

## Step 2: Configure the App

### 2.1 Update Configuration

1. Open `src/config/google.ts`
2. Replace the placeholder client ID with your actual web client ID:

```typescript
export const GOOGLE_CONFIG = {
  webClientId: 'YOUR_ACTUAL_WEB_CLIENT_ID.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};
```

### 2.2 Get Web Client ID

- **Web Client ID**: Found in the Google Cloud Console credentials page under your OAuth 2.0 client ID

## Step 3: Development Setup

### 3.1 Install Dependencies

The required dependencies are already installed:
- `expo-auth-session`
- `expo-crypto`
- `expo-web-browser`

### 3.2 Test the Integration

1. Start the development server:
   ```bash
   npm run start
   ```

2. Test on Expo Go app or web browser
3. Try the "Continue with Google" button on the login screen
4. The OAuth flow will open in a web browser

## Step 4: Production Setup

### 4.1 Update Bundle Identifiers

Ensure your production app uses the same bundle identifiers:
- iOS: `com.pesto.remittance`
- Android: `com.pesto.remittance`

### 4.2 Update OAuth Consent Screen

1. Add your production domain to authorized domains
2. Submit for verification if needed
3. Update test users list

### 4.3 Build and Deploy

1. Build your app for production
2. Test Google Sign-In on production builds
3. Monitor for any authentication issues

## Troubleshooting

### Common Issues

1. **"Sign-in was cancelled"**
   - User cancelled the sign-in flow
   - This is normal behavior

2. **"Google Play Services not available"**
   - Test on a physical device
   - Ensure Google Play Services is installed and updated

3. **"Invalid client ID"**
   - Check that client IDs match your Google Cloud Console configuration
   - Ensure bundle identifiers are correct

4. **"OAuth consent screen not configured"**
   - Complete the OAuth consent screen setup
   - Add test users for development

### Debug Mode

To enable debug logging, add this to your app:

```typescript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Enable debug mode
GoogleSignin.configure({
  // ... your config
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
```

## Security Considerations

1. **Never commit client secrets** to version control
2. **Use environment variables** for sensitive configuration
3. **Validate tokens** on your backend
4. **Implement proper error handling**
5. **Use HTTPS** in production

## API Reference

### GoogleAuthService Methods

- `signIn()`: Main sign-in method (tries native first, then web)
- `signOut()`: Sign out from Google
- `isSignedIn()`: Check if user is signed in
- `getCurrentUser()`: Get current user info

### useAuth Hook

- `loginWithGoogle()`: Trigger Google sign-in
- `logout()`: Sign out (includes Google sign-out)
- `isAuthenticated`: Boolean indicating auth state
- `user`: Current user object
- `isLoading`: Loading state
- `error`: Error message if any

## Support

For issues with Google Sign-In:
1. Check the [Google Sign-In documentation](https://developers.google.com/identity/sign-in/web)
2. Review the [React Native Google Sign-In documentation](https://github.com/react-native-google-signin/google-signin)
3. Check the [Expo AuthSession documentation](https://docs.expo.dev/versions/latest/sdk/auth-session/)

For app-specific issues:
1. Check the console logs
2. Verify configuration files are in place
3. Ensure all dependencies are installed
4. Test on physical devices

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { CURRENT_GOOGLE_CONFIG } from '../../config/google';
import { User } from '../../types';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  photo?: string;
  givenName?: string;
  familyName?: string;
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private isConfigured = false;

  private constructor() {}

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  /**
   * Configure Google Sign-In (web-based only for Expo compatibility)
   */
  public async configure(): Promise<void> {
    if (this.isConfigured) return;

    try {
      // For Expo compatibility, we only use web-based OAuth
      // No native configuration needed
      this.isConfigured = true;
    } catch (error) {
      console.error('Google Sign-In configuration error:', error);
      throw new Error('Failed to configure Google Sign-In');
    }
  }

  /**
   * Sign in with Google using native Google Sign-In (disabled for Expo compatibility)
   */
  public async signInNative(): Promise<GoogleUser> {
    // Native Google Sign-In is not available in Expo Go
    // Fall back to web OAuth
    throw new Error('Native Google Sign-In not available in Expo Go. Use web OAuth instead.');
  }

  /**
   * Sign in with Google using web OAuth (Expo compatible)
   */
  public async signInWeb(): Promise<GoogleUser> {
    try {
      // Use Expo-compatible redirect URI
      const redirectUri = AuthSession.makeRedirectUri();

      console.log('Redirect URI:', redirectUri);

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${CURRENT_GOOGLE_CONFIG.webClientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(CURRENT_GOOGLE_CONFIG.scopes.join(' '))}&` +
        `access_type=offline&` +
        `prompt=consent`;

      console.log('Auth URL:', authUrl);

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      console.log('OAuth result:', result);

      if (result.type === 'success' && result.url) {
        // Extract code from URL
        const url = new URL(result.url);
        const code = url.searchParams.get('code');
        const error = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');
        
        if (error) {
          const errorMsg = errorDescription || error;
          throw new Error(`OAuth error: ${errorMsg}`);
        }
        
        if (code) {
          console.log('Authorization code received:', code);
          // Exchange code for access token
          const tokenResponse = await this.exchangeCodeForToken(code, redirectUri);
          console.log('Token response:', tokenResponse);
          
          // Get user info
          const userInfo = await this.getUserInfo(tokenResponse.access_token);
          console.log('User info:', userInfo);
          return userInfo;
        } else {
          throw new Error('No authorization code received from Google');
        }
      } else if (result.type === 'cancel') {
        throw new Error('Authentication was cancelled by user');
      } else if (result.type === 'dismiss') {
        throw new Error('Authentication was dismissed');
      } else {
        throw new Error(`Authentication failed: ${result.type}`);
      }
    } catch (error: any) {
      console.error('Google Web Sign-In error:', error);
      throw new Error(error.message || 'Google Web Sign-In failed');
    }
  }

  /**
   * Main sign-in method - uses web OAuth for Expo compatibility
   */
  public async signIn(): Promise<GoogleUser> {
    try {
      // For Expo compatibility, always use web OAuth
      return await this.signInWeb();
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      throw error;
    }
  }

  /**
   * Sign out from Google (web-based only)
   */
  public async signOut(): Promise<void> {
    try {
      await this.configure();
      // For web OAuth, we just clear local state
      // The actual sign-out happens when the user closes the browser
      console.log('Google sign-out completed (web OAuth)');
    } catch (error) {
      console.error('Google Sign-Out error:', error);
      // Don't throw error for sign-out failures
    }
  }

  /**
   * Check if user is signed in (web-based only)
   */
  public async isSignedIn(): Promise<boolean> {
    try {
      await this.configure();
      // For web OAuth, we check if we have a stored user
      // This is handled by the useAuth hook
      return false; // Always return false for web OAuth as we don't persist Google sessions
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current user info (web-based only)
   */
  public async getCurrentUser(): Promise<GoogleUser | null> {
    try {
      await this.configure();
      // For web OAuth, we don't persist Google sessions
      // User info is handled by the useAuth hook
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Exchange authorization code for access token
   */
  private async exchangeCodeForToken(code: string, redirectUri: string): Promise<any> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CURRENT_GOOGLE_CONFIG.webClientId,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    return await response.json();
  }

  /**
   * Get user info from Google API
   */
  private async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    
    const response = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    const userData = await response.json();
    return this.mapGoogleUserToAppUser(userData);
  }

  /**
   * Map Google user data to our app's user format
   */
  private mapGoogleUserToAppUser(googleUser: any): GoogleUser {
    return {
      id: googleUser.id || googleUser.sub,
      email: googleUser.email,
      name: googleUser.name || `${googleUser.given_name || ''} ${googleUser.family_name || ''}`.trim(),
      photo: googleUser.picture || googleUser.photo,
      givenName: googleUser.given_name,
      familyName: googleUser.family_name,
    };
  }

  /**
   * Convert Google user to our app's User type
   */
  public convertToAppUser(googleUser: GoogleUser): User {
    return {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

}

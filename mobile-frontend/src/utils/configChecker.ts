/**
 * Configuration checker for Google OAuth setup
 * Helps identify missing or incorrect configuration
 */

import { CURRENT_GOOGLE_CONFIG } from '../config/google';
import { Platform } from 'react-native';

export interface ConfigCheckResult {
  isValid: boolean;
  issues: string[];
  warnings: string[];
}

export class ConfigChecker {
  /**
   * Check if Google OAuth configuration is properly set up
   */
  public static checkGoogleConfig(): ConfigCheckResult {
    const issues: string[] = [];
    const warnings: string[] = [];

    // Check if config exists
    if (!CURRENT_GOOGLE_CONFIG) {
      issues.push('Google OAuth configuration is not loaded. Check src/config/google.ts');
      return { isValid: false, issues, warnings };
    }

    // Check if web client ID is still placeholder value
    if (CURRENT_GOOGLE_CONFIG.webClientId && CURRENT_GOOGLE_CONFIG.webClientId.includes('YOUR_WEB_CLIENT_ID')) {
      issues.push('Web Client ID is not configured. Please update src/config/google.ts with your actual Google OAuth client ID');
    }

    // Check if using development config
    if (CURRENT_GOOGLE_CONFIG.webClientId && CURRENT_GOOGLE_CONFIG.webClientId.includes('123456789-abcdefghijklmnopqrstuvwxyz123456')) {
      warnings.push('Using development Google OAuth configuration. Update with real client ID for production.');
    }


    // Check platform-specific requirements
    if (Platform.OS === 'ios') {
      // iOS-specific checks could go here
    } else if (Platform.OS === 'android') {
      // Android-specific checks could go here
    }

    return {
      isValid: issues.length === 0,
      issues,
      warnings,
    };
  }

  /**
   * Get setup instructions based on configuration issues
   */
  public static getSetupInstructions(result: ConfigCheckResult): string[] {
    const instructions: string[] = [];

    if (result.issues.length > 0) {
      instructions.push('Google OAuth Setup Required:');
      instructions.push('1. Go to Google Cloud Console (https://console.cloud.google.com/)');
      instructions.push('2. Create a new project or select existing one');
      instructions.push('3. Enable Google+ API');
      instructions.push('4. Create OAuth 2.0 credentials for Web application');
      instructions.push('5. Set authorized redirect URIs to include your Expo redirect URI');
      instructions.push('6. Update src/config/google.ts with your actual web client ID');
      instructions.push('7. See GOOGLE_OAUTH_SETUP.md for detailed instructions');
    }

    if (result.warnings.length > 0) {
      instructions.push('Warnings:');
      instructions.push(...result.warnings);
    }

    return instructions;
  }

  /**
   * Log configuration status to console
   */
  public static logConfigStatus(): void {
    const result = this.checkGoogleConfig();
    
    console.log('🔍 Google OAuth Configuration Check:');
    
    if (result.isValid) {
      console.log('✅ Configuration appears to be valid');
    } else {
      console.log('❌ Configuration issues found:');
      result.issues.forEach(issue => console.log(`  - ${issue}`));
    }

    if (result.warnings.length > 0) {
      console.log('⚠️  Warnings:');
      result.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    if (!result.isValid) {
      console.log('📋 Setup Instructions:');
      this.getSetupInstructions(result).forEach(instruction => {
        console.log(`  ${instruction}`);
      });
    }
  }
}

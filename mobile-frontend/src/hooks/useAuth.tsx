import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '../types';
import { GoogleAuthService } from '../services/auth/GoogleAuthService';
<<<<<<< HEAD
import { ConfigChecker } from '../utils';
=======
import { ConfigChecker } from '../utils/configChecker';
import { MockDatabase, DemoUserRecord } from '../services/db/mockDb';
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0

interface AuthContextType extends AuthState {
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const googleAuthService = GoogleAuthService.getInstance();

  const mapDemoUser = (record: DemoUserRecord): User => ({
    id: record.id,
    email: record.email,
    name: record.name,
    avatar: record.avatar,
    aptosAddress: record.aptosAddress,
    createdAt: new Date(record.createdAt),
    updatedAt: new Date(record.updatedAt),
  });

  useEffect(() => {
    initializeAuth();
    // Check Google OAuth configuration on startup
    try {
      ConfigChecker.logConfigStatus();
    } catch (error) {
      console.warn('Configuration check failed:', error);
    }
  }, []);

  const initializeAuth = async () => {
    try {
      // Check if user is already logged in
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        const demoUser = await MockDatabase.getDefaultUser();
        const mappedUser = mapDemoUser(demoUser);
        await AsyncStorage.setItem('user', JSON.stringify(mappedUser));
        setAuthState({
          user: mappedUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: 'Failed to initialize authentication' 
      }));
    }
  };

  const login = async (email: string, password?: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const demoUser = await MockDatabase.findUserByEmail(email);
      if (!demoUser) {
        throw new Error('User not found');
      }

      if (demoUser.password && password && password !== demoUser.password) {
        throw new Error('Invalid credentials');
      }

      const user = mapDemoUser(demoUser);

      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please check your credentials.',
      }));
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Use the Google Auth Service to sign in
      const googleUser = await googleAuthService.signIn();
      
      // Convert Google user to our app's User type
      const user: User = googleAuthService.convertToAppUser(googleUser);

      // Store user data locally
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Google login error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Google login failed',
      }));
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      console.warn('Signup is disabled in the demo build. Using existing demo users.');
      const demoUser = await MockDatabase.getDefaultUser();
      const user = mapDemoUser({ ...demoUser, name, email });

      await AsyncStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Signup failed. Please try again.',
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Sign out from Google if user was signed in with Google
      try {
        await googleAuthService.signOut();
      } catch (error) {
        console.log('Google sign-out failed (user might not have been signed in with Google):', error);
      }

      // Clear local storage
      await AsyncStorage.removeItem('user');
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Logout failed',
      }));
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // TODO: Implement actual forgot password logic with your backend
      console.log('Forgot password for:', email);
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to send reset email',
      }));
      throw error;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    loginWithGoogle,
    signup,
    logout,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

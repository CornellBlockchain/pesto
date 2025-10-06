import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User } from '../types';
import { GoogleAuthService } from '../services/auth/GoogleAuthService';
import { ConfigChecker } from '../utils';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
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

  useEffect(() => {
    initializeAuth();
    try {
      ConfigChecker.logConfigStatus();
    } catch (error) {
      console.warn('Configuration check failed:', error);
    }
  }, []);

  const initializeAuth = async () => {
    try {
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
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to initialize authentication',
      }));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

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

      const googleUser = await googleAuthService.signIn();
      const user: User = googleAuthService.convertToAppUser(googleUser);

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

      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

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

      try {
        await googleAuthService.signOut();
      } catch (error) {
        console.log('Google sign-out failed:', error);
      }

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

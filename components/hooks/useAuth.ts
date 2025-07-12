import { apiService, LoginRequest, RegisterRequest, User } from '@/services/api';
import { useEffect, useState } from 'react';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
  });

  const login = async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await apiService.login(credentials);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        setAuthState({
          user,
          token: token || null,
          isLoading: false,
          isAuthenticated: true,
        });

        // Store token for future requests (you might want to use secure storage)
        if (token) {
          // For web, you could use localStorage
          // For mobile, consider using expo-secure-store
          try {
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', JSON.stringify(user));
          } catch (e) {
            console.warn('Could not store auth data:', e);
          }
        }

        return { success: true, user };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { 
          success: false, 
          error: response.error || 'Login failed' 
        };
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  };

  const register = async (userData: RegisterRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await apiService.register(userData);
      
      if (response.success && response.data) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { success: true, user: response.data };
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return { 
          success: false, 
          error: response.error || 'Registration failed' 
        };
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });

    // Clear stored auth data
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } catch (e) {
      console.warn('Could not clear auth data:', e);
    }
  };

  // Check for stored auth data on app start
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user_data');
      
      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          token: storedToken,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    } catch (e) {
      console.warn('Could not restore auth data:', e);
    }
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
  };
}
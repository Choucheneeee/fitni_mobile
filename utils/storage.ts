// Storage utilities for authentication data
// This is a simple implementation for web. For production mobile apps,
// consider using expo-secure-store for better security.

export const storage = {
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Storage setItem failed:', error);
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.warn('Storage getItem failed:', error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn('Storage removeItem failed:', error);
    }
  },

  clear: async (): Promise<void> => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
    } catch (error) {
      console.warn('Storage clear failed:', error);
    }
  },
};

// Auth-specific storage keys
export const AUTH_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  REFRESH_TOKEN: 'refresh_token',
} as const;
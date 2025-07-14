const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL ;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  status?: number; // Added status code for better error handling
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  address: string;
  age: number;
  gender: string;
  profilePicture?: string;
  role: 'coach' | 'athlete';
  weight?: number;
  height?: number;
  activityLevel?: string;
  bio?: string;
  certification?: string;
  specialities?: string;
  price?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  address: string;
  password: string;
  age: number;
  gender: string;
  profilePicture?: string;
  role: 'coach' | 'athlete';
  weight?: number;
  height?: number;
  activityLevel?: string;
  bio?: string;
  certification?: string;
  specialities?: string;
  price?: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log("API Request:", url, options.method || 'GET');
      
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json') 
        ? await response.json() 
        : await response.text();

      if (!response.ok) {
        return {
          success: false,
          error: typeof data === 'object' 
            ? data.message || data.error || `Request failed with status ${response.status}`
            : data || `Request failed with status ${response.status}`,
          status: response.status,
        };
      }

      return {
        success: true,
        data: data as T,
        status: response.status,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.makeRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    return this.makeRequest<User>('/api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.makeRequest<User[]>('/api/allUsers');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.makeRequest<any>('/health/db');
  }

  // Exercise endpoints
  async getAllExercises(): Promise<ApiResponse<any[]>> {
    return this.makeRequest<any[]>('/api/exercice/all');
  }

  async getExerciseById(id: string): Promise<ApiResponse<any>> {
    return this.makeRequest<any>(`/api/exercice/get/${id}`);
  }

  async createExercise(exerciseData: any): Promise<ApiResponse<any>> {
    return this.makeRequest<any>('/api/exercice/create', {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  async updateExercise(exerciseData: any): Promise<ApiResponse<any>> {
    return this.makeRequest<any>('/api/exercice/update', {
      method: 'PUT',
      body: JSON.stringify(exerciseData),
    });
  }

  async deleteExercise(id: string): Promise<ApiResponse<any>> {
    return this.makeRequest<any>(`/api/exercice/delete/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
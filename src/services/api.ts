import AsyncStorage from '@react-native-async-storage/async-storage';

// Default to localhost if not specified in .env
// Note: for Android emulator use 10.0.2.2, for physical device use your local IP
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000/api';

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  data?: any;
}

export const api = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { data, headers, ...customConfig } = options;

    const token = await AsyncStorage.getItem('userToken');

    const config: RequestInit = {
      method: 'GET',
      ...customConfig,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      
      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        // Handle 401 Unauthorized globally if needed
        if (response.status === 401) {
          // You could emit an event here to trigger a logout
          console.warn('API returned 401 Unauthorized');
        }
        
        throw new ApiError(
          response.status, 
          responseData?.message || response.statusText || 'API Request Failed', 
          responseData
        );
      }

      return responseData as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof TypeError && error.message === 'Network request failed') {
        throw new Error('Unable to connect to server. Please check your connection or server status.');
      }
      
      throw new Error(error instanceof Error ? error.message : 'Network request failed');
    }
  },

  get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return this.request<T>(endpoint, { ...options, method: 'POST', data });
  },

  put<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', data });
  },

  patch<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', data });
  },

  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'data'>) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
};

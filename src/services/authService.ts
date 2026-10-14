import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginCredentials, UserProfile } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userRole', response.role);
    }
    return response;
  },

  async registerSuperAdmin(data: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register-super', data);
    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userRole', response.role);
    }
    return response;
  },

  async register(data: any): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.token) {
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userRole', response.role);
    }
    return response;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userRole');
  },

  async getMe(): Promise<UserProfile> {
    return await api.get<UserProfile>('/auth/me');
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('userToken');
  },
  
  async getRole(): Promise<string | null> {
    return await AsyncStorage.getItem('userRole');
  }
};

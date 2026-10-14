import { api } from './api';

export interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  activeSubs: number;
  expiredSubs: number;
  activePlans: number;
  recentRegistrations: any[];
}

export class AdminService {
  static async getStats(): Promise<AdminStats> {
    return await api.get<AdminStats>('/stats');
  }
  
  static async getUsers(): Promise<any[]> {
    return await api.get<any[]>('/users');
  }

  static async suspendUser(userId: string): Promise<any> {
    return await api.patch<any>(`/users/${userId}/suspend`);
  }

  static async activateUser(userId: string): Promise<any> {
    return await api.patch<any>(`/users/${userId}/activate`);
  }
}

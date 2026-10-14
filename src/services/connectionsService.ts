import { ConnectedAccount, ConnectionStatus } from '../types/connections';
import { api } from './api';

export class ConnectionsService {
  static async getConnections(): Promise<ConnectedAccount[]> {
    try {
      const response = await api.get<any[]>('/social/accounts');
      
      // Transform backend response to frontend ConnectedAccount type if needed
      return response.map(acc => ({
        id: acc._id,
        platformId: acc.platform,
        accountName: acc.accountName,
        username: acc.accountId,
        status: 'connected',
        connectedAt: acc.createdAt,
      }));
    } catch (error) {
      console.error('Error fetching connections:', error);
      return [];
    }
  }

  static async connectPlatform(platformId: string, setStatus?: (status: ConnectionStatus) => void): Promise<ConnectedAccount | null> {
    if (setStatus) setStatus('connecting');
    try {
      const response = await api.post<any>('/social/connect', {
        platform: platformId,
        accountId: `user-${Date.now()}`, // Temporary mock data for the UI since backend only simulates oauth
        accountName: `My ${platformId} Account`
      });
      
      if (setStatus) setStatus('connected');
      return {
        id: response.account._id,
        platformId: response.account.platform,
        accountName: response.account.accountName,
        username: response.account.accountId,
        status: 'connected',
        connectedAt: response.account.createdAt,
      };
    } catch (error) {
      console.error('Error connecting platform:', error);
      if (setStatus) setStatus('error');
      return null;
    }
  }

  static async disconnectPlatform(platformId: string): Promise<boolean> {
    // The backend doesn't currently have a disconnect endpoint, so we can't implement it purely using the API.
    // If one existed it would be:
    // await api.delete(`/social/disconnect/${platformId}`);
    console.warn(`Disconnect endpoint not implemented on backend for platform: ${platformId}`);
    return false;
  }
}

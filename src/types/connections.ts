export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export type ConnectedAccount = {
  id: string;
  platformId: string;
  accountName?: string;
  username?: string;
  status: ConnectionStatus;
  connectedAt?: string;
};

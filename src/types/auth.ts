export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  companyLogo?: string;
  brandLogo?: string;
  assignedAdminId?: string;
  allocatedPlatforms?: string[];
  status?: string;
  subscriptionId?: any;
  [key: string]: any;
}

export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  token: string;
  companyLogo?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

import { SettingsState } from '../types/settings';

const initialSettingsState: SettingsState = {
  account: {
    fullName: 'Jane Doe',
    email: 'jane.doe@binj.ai',
    profilePhotoUri: undefined,
  },
  apiLicensing: {
    apiKey: 'sk-prod-9a8b7c6d5e4f3g2h1i0j8A91',
    status: 'Connected',
    plan: 'Pro Tier',
  },
  youtube: {
    status: 'Disconnected',
  },
  aiPreferences: {
    defaultModel: 'Claude 3.5 Sonnet',
    responseStyle: 'Professional',
    autoGenerateContent: true,
    autoReply: false,
  },
  billing: {
    plan: 'Pro Tier ($49/mo)',
    status: 'Active',
    nextBillingDate: 'Sept 15, 2026',
  },
  notifications: {
    email: true,
    push: true,
    postPublished: true,
    postScheduled: true,
    failedPublication: true,
    aiGenerationComplete: false,
    newMessages: true,
    connectionIssues: true,
  }
};

let currentSettings = { ...initialSettingsState };

export class SettingsService {
  static async getSettings(): Promise<SettingsState> {
    try {
      const { authService } = require('./authService');
      const user = await authService.getMe();
      
      const settings = JSON.parse(JSON.stringify(currentSettings));
      if (user) {
        settings.account.fullName = user.username || user.name || settings.account.fullName;
        settings.account.email = user.email || settings.account.email;
        settings.account.profilePhotoUri = user.profilePicture || settings.account.profilePhotoUri;
      }
      return settings;
    } catch (e) {
      // Fallback to mock if API fails
      return JSON.parse(JSON.stringify(currentSettings));
    }
  }

  static async updateAccount(fullName: string, photoUri?: string): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 800));
    currentSettings.account.fullName = fullName;
    if (photoUri) {
      currentSettings.account.profilePhotoUri = photoUri;
    }
  }

  static async regenerateApiKey(): Promise<string> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 1200));
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    currentSettings.apiLicensing.apiKey = `sk-prod-xxx...${randomChars}`;
    return currentSettings.apiLicensing.apiKey;
  }

  static async connectYouTube(): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 1500));
    currentSettings.youtube = {
      status: 'Connected',
      channelName: 'Binj.ai Official',
      channelId: 'UC1234567890',
    };
  }
  
  static async disconnectYouTube(): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 800));
    currentSettings.youtube = {
      status: 'Disconnected',
    };
  }

  static async updateAIPreferences(prefs: Partial<SettingsState['aiPreferences']>): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 600));
    currentSettings.aiPreferences = { ...currentSettings.aiPreferences, ...prefs };
  }

  static async toggleNotification(key: keyof SettingsState['notifications']): Promise<void> {
    currentSettings.notifications[key] = !currentSettings.notifications[key];
  }

  static async deleteAllData(): Promise<boolean> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 3000));
    // In a real app this would call the backend and trigger a forced logout.
    return true;
  }
}

export type AIModelType = 'GPT-4o' | 'Claude 3.5 Sonnet' | 'Gemini 1.5 Pro' | 'Llama 3';
export type AIResponseStyle = 'Professional' | 'Friendly' | 'Concise' | 'Creative' | 'Detailed';

export type SettingsState = {
  account: {
    fullName: string;
    email: string;
    profilePhotoUri?: string;
  };
  apiLicensing: {
    apiKey: string;
    status: 'Connected' | 'Disconnected';
    plan: string;
  };
  youtube: {
    status: 'Connected' | 'Disconnected';
    channelName?: string;
    channelId?: string;
  };
  aiPreferences: {
    defaultModel: AIModelType;
    responseStyle: AIResponseStyle;
    autoGenerateContent: boolean;
    autoReply: boolean;
  };
  billing: {
    plan: string;
    status: 'Active' | 'Past Due' | 'Canceled';
    nextBillingDate: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    postPublished: boolean;
    postScheduled: boolean;
    failedPublication: boolean;
    aiGenerationComplete: boolean;
    newMessages: boolean;
    connectionIssues: boolean;
  };
};

export interface Platform {
  id: string;
  name: string;
  icon: string;
  accentColor?: string;
  unreadCount?: number;
  activeConversations?: number;
  dmCount?: number;
  commentCount?: number;
}

export interface AgentConfig {
  platformId: string;
  dmPrompt: string;
  commentPrompt: string;
  autoReplyDM: boolean;
  autoReplyComments: boolean;
  logToInbox: boolean;
  automationEnabled: boolean;
}

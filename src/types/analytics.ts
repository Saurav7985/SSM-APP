export type AnalyticsSummary = {
  totalReach: number;
  totalEngagement: number;
  totalImpressions: number;
  engagementRate: number;
  reachChange: number;
  engagementChange: number;
  impressionsChange: number;
  engagementRateChange: number;
};

export type AnalyticsPoint = {
  date: string;
  reach: number;
  engagement: number;
  impressions: number;
};

export type PlatformAnalytics = {
  platformId: string;
  reach: number;
  engagement: number;
  impressions: number;
};

export type PostAnalytics = {
  id: string;
  title: string;
  caption?: string;
  platformId: string; // Changed to platformId to match existing constants
  thumbnail?: string;
  reach: number;
  engagement: number;
  impressions: number;
  engagementRate: number;
  publishedAt: string;
};

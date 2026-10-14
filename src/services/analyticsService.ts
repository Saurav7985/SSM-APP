import { AnalyticsSummary, AnalyticsPoint, PlatformAnalytics, PostAnalytics } from '../types/analytics';

export class AnalyticsService {
  
  static async getAnalyticsSummary(platformId: string, days: number): Promise<AnalyticsSummary> {
    // Mock simulation delay
    await new Promise(r => setTimeout(() => r(undefined), 600));

    // Dynamic mock generation based on filters
    const multiplier = days / 30;
    const platformMultiplier = platformId === 'all' ? 1 : 0.4;
    const overall = multiplier * platformMultiplier;

    return {
      totalReach: Math.floor(124500 * overall),
      totalEngagement: Math.floor(18200 * overall),
      totalImpressions: Math.floor(245000 * overall),
      engagementRate: Number((7.3 * (Math.random() * 0.5 + 0.8)).toFixed(1)),
      reachChange: 12.4,
      engagementChange: 8.7,
      impressionsChange: 15.2,
      engagementRateChange: -1.2,
    };
  }

  static async getTrendAnalytics(platformId: string, days: number): Promise<AnalyticsPoint[]> {
    await new Promise(r => setTimeout(() => r(undefined), 400));
    const points: AnalyticsPoint[] = [];
    const now = new Date();
    
    // Generate roughly one point per day (or grouped if large range)
    const pointsCount = days > 90 ? 12 : days; 
    
    for (let i = pointsCount; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * (days / pointsCount));
      
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const baseReach = isWeekend ? 8000 : 15000;
      
      points.push({
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reach: Math.floor(baseReach * (Math.random() * 0.5 + 0.7)),
        engagement: Math.floor(baseReach * 0.15 * (Math.random() * 0.5 + 0.7)),
        impressions: Math.floor(baseReach * 1.5),
      });
    }
    return points;
  }

  static async getPlatformAnalytics(): Promise<PlatformAnalytics[]> {
    await new Promise(r => setTimeout(() => r(undefined), 500));
    return [
      { platformId: 'instagram', reach: 65000, engagement: 8200, impressions: 120000 },
      { platformId: 'facebook', reach: 35000, engagement: 4100, impressions: 80000 },
      { platformId: 'linkedin', reach: 15000, engagement: 3500, impressions: 25000 },
      { platformId: 'twitter', reach: 9500, engagement: 2400, impressions: 20000 },
    ];
  }

  static async getPostAnalytics(platformId: string): Promise<PostAnalytics[]> {
    await new Promise(r => setTimeout(() => r(undefined), 300));
    
    const allPosts: PostAnalytics[] = [
      {
        id: 'p1',
        title: 'Product Launch 2026',
        platformId: 'instagram',
        reach: 12400,
        engagement: 1800,
        impressions: 21000,
        engagementRate: 14.5,
        publishedAt: '2026-08-15T10:00:00Z'
      },
      {
        id: 'p2',
        title: 'Weekly Tips',
        platformId: 'linkedin',
        reach: 8200,
        engagement: 1100,
        impressions: 14000,
        engagementRate: 13.4,
        publishedAt: '2026-08-12T14:30:00Z'
      },
      {
        id: 'p3',
        title: 'Behind the Scenes',
        platformId: 'instagram',
        reach: 15600,
        engagement: 2100,
        impressions: 28000,
        engagementRate: 13.5,
        publishedAt: '2026-08-10T16:00:00Z'
      },
      {
        id: 'p4',
        title: 'Company Update',
        platformId: 'facebook',
        reach: 5400,
        engagement: 450,
        impressions: 9000,
        engagementRate: 8.3,
        publishedAt: '2026-08-08T09:00:00Z'
      }
    ];

    if (platformId === 'all') return allPosts;
    return allPosts.filter(p => p.platformId === platformId);
  }
}

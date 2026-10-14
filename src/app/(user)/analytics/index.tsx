import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { StyleSheet,  Platform, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { AnalyticsService } from '../../../services/analyticsService';
import { AnalyticsSummary as SummaryType, AnalyticsPoint, PlatformAnalytics, PostAnalytics } from '../../../types/analytics';

import AnalyticsHeader from '../../../components/analytics/AnalyticsHeader';
import TimeRangeSelector from '../../../components/analytics/TimeRangeSelector';
import PlatformFilter from '../../../components/analytics/PlatformFilter';
import AnalyticsSummary from '../../../components/analytics/AnalyticsSummary';
import ReachEngagementChart from '../../../components/analytics/ReachEngagementChart';
import PlatformPerformanceChart from '../../../components/analytics/PlatformPerformanceChart';
import PostPerformanceLibrary from '../../../components/analytics/PostPerformanceLibrary';

export default function AnalyticsScreen() {
  const [activePlatformId, setActivePlatformId] = useState<string>('all');
  const [activeTimeRange, setActiveTimeRange] = useState<number>(30); // 30 Days default
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [summaryData, setSummaryData] = useState<SummaryType | null>(null);
  const [trendData, setTrendData] = useState<AnalyticsPoint[]>([]);
  const [platformData, setPlatformData] = useState<PlatformAnalytics[]>([]);
  const [postData, setPostData] = useState<PostAnalytics[]>([]);

  const loadData = async () => {
    try {
      const [summary, trends, platforms, posts] = await Promise.all([
        AnalyticsService.getAnalyticsSummary(activePlatformId, activeTimeRange),
        AnalyticsService.getTrendAnalytics(activePlatformId, activeTimeRange),
        AnalyticsService.getPlatformAnalytics(),
        AnalyticsService.getPostAnalytics(activePlatformId)
      ]);
      
      setSummaryData(summary);
      setTrendData(trends);
      setPlatformData(platforms);
      setPostData(posts);
    } catch (error) {
      console.error("Failed to load analytics data", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, [activePlatformId, activeTimeRange]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AnalyticsHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing && !isLoading} 
            onRefresh={handleRefresh} 
            tintColor={COLORS.orange}
            colors={[COLORS.orange]}
          />
        }
      >
        <TimeRangeSelector 
          activeRange={activeTimeRange} 
          onSelect={setActiveTimeRange} 
        />
        
        <AnalyticsSummary summary={summaryData} />
        
        <PlatformFilter 
          activePlatformId={activePlatformId} 
          onSelect={setActivePlatformId} 
        />
        
        <ReachEngagementChart data={trendData} />
        
        {/* Only show platform breakdown if "all" platforms is selected */}
        {activePlatformId === 'all' && (
          <PlatformPerformanceChart data={platformData} />
        )}
        
        <PostPerformanceLibrary posts={postData} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  container: {
    flex: 1,
  },
});

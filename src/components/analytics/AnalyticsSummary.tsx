import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnalyticsSummary as SummaryType } from '../../types/analytics';
import MetricCard from './MetricCard';

interface AnalyticsSummaryProps {
  summary: SummaryType | null;
}

export default function AnalyticsSummary({ summary }: AnalyticsSummaryProps) {
  if (!summary) return <View style={styles.container} />;

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MetricCard 
          title="Total Reach" 
          value={formatNumber(summary.totalReach)} 
          change={summary.reachChange} 
        />
        <MetricCard 
          title="Total Engagement" 
          value={formatNumber(summary.totalEngagement)} 
          change={summary.engagementChange} 
        />
      </View>
      <View style={styles.row}>
        <MetricCard 
          title="Impressions" 
          value={formatNumber(summary.totalImpressions)} 
          change={summary.impressionsChange} 
        />
        <MetricCard 
          title="Engagement Rate" 
          value={`${summary.engagementRate}%`} 
          change={summary.engagementRateChange} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  }
});

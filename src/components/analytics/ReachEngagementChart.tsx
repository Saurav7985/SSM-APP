import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/colors';
import { AnalyticsPoint } from '../../types/analytics';

interface ReachEngagementChartProps {
  data: AnalyticsPoint[];
}

export default function ReachEngagementChart({ data }: ReachEngagementChartProps) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Reach & Engagement Trends</Text>
        <Text style={styles.subtitle}>Historical performance over the selected period</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No analytics data available</Text>
        </View>
      </View>
    );
  }

  // To fit on screen nicely, maybe pick fewer labels if data is large
  const step = Math.ceil(data.length / 6);
  const labels = data.map((d, i) => (i % step === 0 ? d.date : ''));
  const reachData = data.map(d => d.reach);
  const engagementData = data.map(d => d.engagement);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Reach & Engagement Trends</Text>
      <Text style={styles.subtitle}>Historical performance over the selected period</Text>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: COLORS.orange }]} />
          <Text style={styles.legendText}>Reach</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
          <Text style={styles.legendText}>Engagement</Text>
        </View>
      </View>

      <LineChart
        data={{
          labels,
          datasets: [
            { data: reachData, color: (opacity = 1) => `rgba(255, 100, 34, ${opacity})`, strokeWidth: 2 },
            { data: engagementData, color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, strokeWidth: 2 }
          ],
        }}
        width={Dimensions.get('window').width - 64} // padding 16*2 inside card, card margin 16*2
        height={220}
        withDots={data.length <= 15}
        withInnerLines={false}
        chartConfig={{
          backgroundColor: COLORS.card,
          backgroundGradientFrom: COLORS.card,
          backgroundGradientTo: COLORS.card,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "3", strokeWidth: "1" }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  emptyContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  legendContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    color: COLORS.gray,
    fontSize: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: -16, // pull back the chart kit default left padding
  }
});

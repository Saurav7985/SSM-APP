import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/colors';
import { PlatformAnalytics } from '../../types/analytics';

interface PlatformPerformanceChartProps {
  data: PlatformAnalytics[];
}

export default function PlatformPerformanceChart({ data }: PlatformPerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Platform Performance Breakdown</Text>
        <Text style={styles.subtitle}>Reach and engagement levels comparing active networks</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No platform data available</Text>
        </View>
      </View>
    );
  }

  const labels = data.map(d => d.platformId.substring(0, 3).toUpperCase());
  const reachData = data.map(d => d.reach);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Platform Performance Breakdown</Text>
      <Text style={styles.subtitle}>Reach and engagement levels comparing active networks</Text>

      <BarChart
        data={{
          labels,
          datasets: [{ data: reachData }]
        }}
        width={Dimensions.get('window').width - 64}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        withInnerLines={false}
        showValuesOnTopOfBars
        chartConfig={{
          backgroundColor: COLORS.card,
          backgroundGradientFrom: COLORS.card,
          backgroundGradientTo: COLORS.card,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 100, 34, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
          style: { borderRadius: 16 },
        }}
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: -16,
  }
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PostAnalytics } from '../../types/analytics';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface PostPerformanceCardProps {
  post: PostAnalytics;
  onAction: (action: string, postId: string) => void;
}

export default function PostPerformanceCard({ post, onAction }: PostPerformanceCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const platform = PLATFORMS_DATA.find(p => p.id === post.platformId);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const handleAction = (action: string) => {
    setMenuOpen(false);
    onAction(action, post.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.platformIcon, { backgroundColor: platform?.accentColor + '20' }]}>
            <Feather name={platform?.icon as any || 'box'} size={16} color={platform?.accentColor || COLORS.gray} />
          </View>
          <View>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.platformName}>{platform?.name || 'Unknown'}</Text>
          </View>
        </View>
        
        <Pressable 
          hitSlop={10} 
          style={styles.moreButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Feather name="more-vertical" size={20} color={COLORS.gray} />
        </Pressable>
      </View>

      {menuOpen && (
        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem} onPress={() => handleAction('view')}>
            <Feather name="eye" size={16} color={COLORS.white} />
            <Text style={styles.menuItemText}>View Post</Text>
          </Pressable>
          <Pressable style={styles.menuItem} onPress={() => handleAction('boost')}>
            <Feather name="trending-up" size={16} color={COLORS.white} />
            <Text style={styles.menuItemText}>Boost Post</Text>
          </Pressable>
          <Pressable style={[styles.menuItem, styles.menuItemDanger]} onPress={() => handleAction('delete')}>
            <Feather name="trash-2" size={16} color="#EF4444" />
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Delete</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Reach</Text>
          <Text style={styles.metricValue}>{formatNumber(post.reach)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Engagement</Text>
          <Text style={styles.metricValue}>{formatNumber(post.engagement)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Rate</Text>
          <Text style={styles.metricValue}>{post.engagementRate}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  platformName: {
    color: COLORS.gray,
    fontSize: 12,
  },
  moreButton: {
    padding: 4,
  },
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    padding: 8,
    zIndex: 10,
    minWidth: 140,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  menuItemDanger: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 4,
    paddingTop: 12,
  },
  menuItemText: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 12,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    color: COLORS.gray,
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

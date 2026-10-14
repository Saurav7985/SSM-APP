import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface ConnectionsHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function ConnectionsHeader({ onRefresh, isRefreshing }: ConnectionsHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Feather name="link" size={24} color={COLORS.orange} style={{ marginRight: 12 }} />
        <View>
          <Text style={styles.headerTitle}>Connected Accounts</Text>
          <Text style={styles.headerSubtitle}>
            Link and manage multiple social media profiles for your brand
          </Text>
        </View>
      </View>
      <Pressable 
        hitSlop={10} 
        style={[styles.refreshBtn, isRefreshing && styles.refreshing]} 
        onPress={onRefresh}
        disabled={isRefreshing}
      >
        <Feather name="refresh-cw" size={20} color={COLORS.gray} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 16,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  refreshBtn: {
    padding: 8,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  refreshing: {
    opacity: 0.5,
  },
});

import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/colors';

export const SETTINGS_TABS = [
  'Account',
  'API & Licensing',
  'YouTube Console',
  'AI Preferences',
  'Billing',
  'Notifications'
] as const;

export type SettingsTab = typeof SETTINGS_TABS[number];

interface SettingsNavigationProps {
  activeTab: SettingsTab;
  onSelect: (tab: SettingsTab) => void;
}

export default function SettingsNavigation({ activeTab, onSelect }: SettingsNavigationProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {SETTINGS_TABS.map((tab) => (
        <Pressable
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.tabActive
          ]}
          onPress={() => onSelect(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.tabTextActive
          ]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  content: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: 'rgba(255, 100, 34, 0.1)',
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.orange,
    fontWeight: 'bold',
  },
});

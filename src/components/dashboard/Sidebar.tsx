import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { router } from 'expo-router';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MENU_ITEMS = [
  { name: 'Dashboard', icon: 'grid' as const },
  { name: 'Create Content', icon: 'edit-3' as const },
  { name: 'Inbox', icon: 'inbox' as const },
  { name: 'Messenger', icon: 'message-circle' as const },
  { name: 'AI Studio', icon: 'cpu' as const },
  { name: 'Library', icon: 'book-open' as const },
  { name: 'Calendar', icon: 'calendar' as const },
  { name: 'Analytics', icon: 'bar-chart-2' as const },
  { name: 'Brand Kit', icon: 'briefcase' as const },
  { name: 'Connections', icon: 'link' as const },
  { name: 'Support Tickets', icon: 'help-circle' as const },
  { name: 'Plan', icon: 'credit-card' as const },
  { name: 'Recycle Bin', icon: 'trash-2' as const },
  { name: 'Activity Logs', icon: 'activity' as const },
  { name: 'Settings', icon: 'settings' as const },
];

export default function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backgroundPressable} onPress={onClose} />
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.logoText}>Binjwa SMM</Text>
          <Pressable onPress={onClose} hitSlop={8}>
            <Feather name="x" size={24} color={COLORS.white} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {MENU_ITEMS.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.menuItem,
                item.name === 'Dashboard' && styles.menuItemSelected
              ]}
              onPress={() => {
                if (item.name === 'Create Content') {
                  router.push('/(user)/create');
                } else if (item.name === 'Dashboard') {
                  router.push('/(user)/dashboard');
                } else if (item.name === 'Inbox') {
                  router.push('/(user)/messenger' as any);
                } else if (item.name === 'Messenger') {
                  router.push('/(user)/messenger/ai-agents' as any);
                } else if (item.name === 'AI Studio') {
                  router.push('/(user)/ai-studio' as any);
                } else if (item.name === 'Library') {
                  router.push('/(user)/library' as any);
                } else if (item.name === 'Calendar') {
                  router.push('/(user)/calendar' as any);
                } else if (item.name === 'Analytics') {
                  router.push('/(user)/analytics' as any);
                } else if (item.name === 'Brand Kit') {
                  router.push('/(user)/brand-kit' as any);
                } else if (item.name === 'Connections') {
                  router.push('/(user)/connections' as any);
                } else if (item.name === 'Settings') {
                  router.push('/(user)/settings' as any);
                } else {
                  console.log(item.name);
                }
                onClose();
              }}
            >
              <Feather
                name={item.icon}
                size={20}
                color={item.name === 'Dashboard' ? COLORS.orange : COLORS.gray}
              />
              <Text
                style={[
                  styles.menuItemText,
                  item.name === 'Dashboard' && styles.menuItemTextSelected
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.logoutButton} onPress={onLogout}>
            <Feather name="log-out" size={20} color={COLORS.orange} />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
  },
  backgroundPressable: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '75%',
    maxWidth: 300,
    height: '100%',
    backgroundColor: COLORS.background,
    borderRightWidth: 1,
    borderRightColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    marginTop: 30, // Safe area approx
  },
  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemSelected: {
    backgroundColor: 'rgba(255, 100, 34, 0.1)',
    borderRightWidth: 3,
    borderRightColor: COLORS.orange,
  },
  menuItemText: {
    color: COLORS.gray,
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '500',
  },
  menuItemTextSelected: {
    color: COLORS.orange,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#222',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.orange,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});

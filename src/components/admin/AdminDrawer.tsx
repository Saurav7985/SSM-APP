import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { router, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { authService } from '../../services/authService';

const drawerItems = [
  { name: 'Dashboard', route: '/(admin)/dashboard', icon: 'home' },
  { name: 'Team Management', route: '/(admin)/team', icon: 'users' },
  { name: 'User Management', route: '/(admin)/users', icon: 'user' },
  { name: 'Brand Management', route: '/(admin)/brands', icon: 'briefcase' },
  { name: 'Social Accounts', route: '/(admin)/social-accounts', icon: 'share-2' },
  { name: 'Content Approval', route: '/(admin)/content-approval', icon: 'check-circle' },
  { name: 'Content Library', route: '/(admin)/content-library', icon: 'folder' },
  { name: 'Calendar', route: '/(admin)/calendar', icon: 'calendar' },
  { name: 'Analytics', route: '/(admin)/analytics', icon: 'activity' },
  { name: 'Client Reports', route: '/(admin)/reports', icon: 'file-text' },
  { name: 'Credits', route: '/(admin)/credits', icon: 'credit-card' },
  { name: 'Support Tickets', route: '/(admin)/tickets', icon: 'message-square' },
  { name: 'Notifications', route: '/(admin)/notifications', icon: 'bell' },
  { name: 'User Sessions', route: '/(admin)/sessions', icon: 'monitor' },
  { name: 'Activity Logs', route: '/(admin)/activity', icon: 'clock' },
  { name: 'Workspace Settings', route: '/(admin)/settings', icon: 'settings' },
];

export function AdminDrawerContent(props: any) {
  const pathname = usePathname();
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    authService.getMe().then((user: any) => {
      if (user && user.name) {
        setUsername(user.name);
      }
    });
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>BINJ.AI</Text>
      </View>
      
      <Drawer {...props} style={styles.scrollContent}>
        {drawerItems.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Pressable
              key={item.route}
              style={[
                styles.drawerItem,
                isActive && styles.drawerItemActive
              ]}
              onPress={() => router.push(item.route as any)}
            >
              <Feather 
                name={item.icon as any} 
                size={20} 
                color={isActive ? COLORS.white : COLORS.gray} 
              />
              <Text style={[
                styles.drawerItemText,
                isActive && styles.drawerItemTextActive
              ]}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </Drawer>

      <View style={styles.footer}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.userName}>{username}</Text>
            <Text style={styles.userRole}>Workspace Admin</Text>
          </View>
        </View>
        
        <Pressable 
          style={styles.drawerItem} 
          onPress={() => router.push('/(admin)/profile')}
        >
          <Feather name="user" size={20} color={COLORS.gray} />
          <Text style={styles.drawerItemText}>Profile</Text>
        </Pressable>
        
        <Pressable 
          style={styles.drawerItem} 
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#ff4444" />
          <Text style={[styles.drawerItemText, { color: '#ff4444' }]}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 8,
  },
  drawerItemActive: {
    backgroundColor: COLORS.orange,
  },
  drawerItemText: {
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 14,
  },
  drawerItemTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  userName: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  userRole: {
    color: COLORS.gray,
    fontSize: 12,
  },
});

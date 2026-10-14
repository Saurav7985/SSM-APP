import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView,  Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../../constants/colors';
import { authService } from '../../services/authService';
import Sidebar from '../../components/dashboard/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import QuickActionCard from '../../components/dashboard/QuickActionCard';
import RecentPosts from '../../components/dashboard/RecentPosts';

export default function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getMe();
        if (user) {
          setUserName(user.username || user.name || 'User');
          setCredits(user.credits || 0);
        } else {
          setUserName('User');
        }
      } catch (err) {
        setUserName('User');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace('/(auth)/login');
    } catch (e) {
      console.error('Logout error', e);
      router.replace('/(auth)/login');
    }
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => setIsSidebarOpen(true)} hitSlop={10} style={styles.menuButton}>
            <Feather name="menu" size={24} color={COLORS.white} />
          </Pressable>
          
          <Text style={styles.logoText}>Binjwa</Text>

          <View style={styles.headerRight}>
            <Pressable hitSlop={8} style={styles.headerIcon}>
              <Feather name="bell" size={20} color={COLORS.white} />
            </Pressable>
            <Pressable style={styles.avatarContainer} onPress={() => router.push('/(user)/settings')}>
              <Text style={styles.avatarText}>{getInitial(userName)}</Text>
            </Pressable>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <StatCard value="0" label="Posts Created" icon="zap" />
            <StatCard value="0%" label="Avg Engagement" icon="trending-up" />
            <StatCard value="0" label="Total Reach" icon="star" />
            <StatCard value="0" label="Total Likes" icon="heart" />
            <StatCard value={credits.toString()} label="AI Credits" icon="cpu" />
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <QuickActionCard
              title="Generate New Post"
              subtitle="Create in 30 seconds"
              icon="star"
              backgroundColor="#333333"
              onPress={() => console.log('Generate New Post')}
            />
            <QuickActionCard
              title="Schedule Campaign"
              subtitle="Plan your content"
              icon="calendar"
              backgroundColor="#3478E5"
              onPress={() => console.log('Schedule Campaign')}
            />
            <QuickActionCard
              title="Upload Brand Assets"
              subtitle="Update your brand kit"
              icon="upload"
              backgroundColor="#08C49A"
              onPress={() => console.log('Upload Brand Assets')}
            />
          </View>

          {/* Recent Posts */}
          <RecentPosts />
          
        </ScrollView>

        {/* Floating Create Button */}
        <Pressable style={styles.fab} onPress={() => router.push('/(user)/create')}>
          <Feather name="plus" size={30} color={COLORS.white} />
        </Pressable>

        {/* Sidebar Overlay */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onLogout={handleLogout} 
        />
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  menuButton: {
    padding: 4,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionsContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});

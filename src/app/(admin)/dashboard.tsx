import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';
import { AdminService, AdminStats } from '../../services/adminService';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Feather } from '@expo/vector-icons';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;

  const loadData = async () => {
    try {
      setError(false);
      const data = await AdminService.getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  // Format current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[...Array(6)].map((_, i) => (
        <View key={i} style={[styles.card, styles.skeletonCard, isSmallScreen ? { width: '100%' } : {}]} />
      ))}
    </View>
  );

  const StatCard = ({ title, value, description, icon, iconColor }: any) => (
    <View style={[styles.card, isSmallScreen ? { width: '100%', marginBottom: 12 } : { width: '48%', marginBottom: 16 }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Feather name={icon} size={16} color={iconColor} />
        </View>
      </View>
      <Text style={styles.cardValue}>{value !== undefined ? value : '—'}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AdminHeader title="Dashboard" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.orange} />}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workspace Overview</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Unable to load workspace data.</Text>
            <Pressable style={styles.retryButton} onPress={loadData}>
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : loading && !refreshing ? (
          renderSkeleton()
        ) : (
          <View style={styles.grid}>
            {/* Using mock properties or falling back to totalUsers for the sake of layout mapping.
                The backend adminService.getStats() will need to return these exact fields. */}
            <StatCard 
              title="Team Members" 
              value={stats?.teamMembers ?? stats?.totalAdmins ?? 0} 
              description="Active in workspace" 
              icon="users" iconColor="#FF6422" 
            />
            <StatCard 
              title="Connected Accounts" 
              value={stats?.connectedAccounts ?? 0} 
              description="Social profiles" 
              icon="share-2" iconColor="#3B82F6" 
            />
            <StatCard 
              title="Total Brands" 
              value={stats?.totalBrands ?? 0} 
              description="Managed entities" 
              icon="briefcase" iconColor="#8B5CF6" 
            />
            <StatCard 
              title="Pending Approvals" 
              value={stats?.pendingApprovals ?? 0} 
              description="Require review" 
              icon="clock" iconColor="#F59E0B" 
            />
            <StatCard 
              title="Scheduled Posts" 
              value={stats?.scheduledPosts ?? 0} 
              description="Upcoming content" 
              icon="calendar" iconColor="#10B981" 
            />
            <StatCard 
              title="Published Posts" 
              value={stats?.publishedPosts ?? 0} 
              description="Successfully sent" 
              icon="check-circle" iconColor="#06B6D4" 
            />
          </View>
        )}

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Pressable style={styles.actionButton}>
              <Feather name="user-plus" size={18} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Invite Team</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Feather name="plus-circle" size={18} color={COLORS.white} />
              <Text style={styles.actionButtonText}>New Brand</Text>
            </Pressable>
          </View>
          <Pressable style={[styles.actionButton, { marginTop: 10 }]}>
            <Feather name="link" size={18} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Connect Social Account</Text>
          </Pressable>
        </View>

        <View style={styles.creditDistribution}>
          <Text style={styles.sectionTitle}>Credit Distribution Overview</Text>
          <Text style={styles.sectionSubtitle}>Manage AI credits allocated to your workspace users.</Text>
          
          <View style={styles.creditStats}>
            <View style={styles.creditStatRow}>
              <Text style={styles.creditStatLabel}>Total Credits</Text>
              <Text style={styles.creditStatValue}>{stats?.totalCredits ?? 1000}</Text>
            </View>
            <View style={styles.creditStatRow}>
              <Text style={styles.creditStatLabel}>Available</Text>
              <Text style={styles.creditStatValue}>{stats?.availableCredits ?? 1000}</Text>
            </View>
            <View style={styles.creditStatRow}>
              <Text style={styles.creditStatLabel}>Distributed</Text>
              <Text style={styles.creditStatValue}>{stats?.distributedCredits ?? 0}</Text>
            </View>
            <View style={styles.creditStatRow}>
              <Text style={styles.creditStatLabel}>Used by Users</Text>
              <Text style={styles.creditStatValue}>{stats?.usedCredits ?? 0}</Text>
            </View>
            <View style={styles.creditStatRow}>
              <Text style={styles.creditStatLabel}>Users w/ Credits</Text>
              <Text style={styles.creditStatValue}>{stats?.usersWithCredits ?? 0}</Text>
            </View>
          </View>
          
          <Pressable style={styles.auditLogButton}>
            <Text style={styles.auditLogText}>View Audit Log</Text>
            <Feather name="chevron-right" size={16} color={COLORS.orange} />
          </Pressable>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 16,
  },
  dateText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  cardValue: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#888',
    fontSize: 12,
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skeletonCard: {
    width: '48%',
    height: 120,
    marginBottom: 16,
    backgroundColor: '#1A1A1A',
    borderColor: '#2A2A2A',
  },
  errorContainer: {
    padding: 24,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#331111',
  },
  errorText: {
    color: COLORS.white,
    fontSize: 15,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: COLORS.white,
    fontWeight: '500',
    marginLeft: 8,
    fontSize: 14,
  },
  creditDistribution: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  creditStats: {
    backgroundColor: '#0F0F0F',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  creditStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  creditStatLabel: {
    color: COLORS.gray,
    fontSize: 14,
  },
  creditStatValue: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  auditLogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    padding: 14,
    borderRadius: 8,
  },
  auditLogText: {
    color: COLORS.orange,
    fontWeight: '500',
    fontSize: 14,
  },
});

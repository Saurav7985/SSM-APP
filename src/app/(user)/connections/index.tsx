import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet,  Platform, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { ConnectionsService } from '../../../services/connectionsService';
import { ConnectedAccount } from '../../../types/connections';

import ConnectionsHeader from '../../../components/connections/ConnectionsHeader';
import ConnectionsFilter from '../../../components/connections/ConnectionsFilter';
import ConnectionsSearch from '../../../components/connections/ConnectionsSearch';
import PlatformAccountCard from '../../../components/connections/PlatformAccountCard';
import { PLATFORMS_DATA } from '../../../constants/platforms';

export default function ConnectionsScreen() {
  const [connections, setConnections] = useState<ConnectedAccount[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadConnections = useCallback(async () => {
    try {
      const data = await ConnectionsService.getConnections();
      setConnections(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadConnections();
    setIsRefreshing(false);
  };

  const filteredConnections = connections.filter(conn => {
    // Filter by status
    if (activeFilter === 'Connected' && conn.status !== 'connected') return false;
    if (activeFilter === 'Not Connected' && conn.status === 'connected') return false;

    // Filter by search query
    if (searchQuery.trim().length > 0) {
      const platform = PLATFORMS_DATA.find(p => p.id === conn.platformId);
      const searchStr = `${platform?.name} ${conn.accountName} ${conn.username}`.toLowerCase();
      if (!searchStr.includes(searchQuery.toLowerCase())) return false;
    }

    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ConnectionsHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing} 
            onRefresh={handleRefresh} 
            tintColor={COLORS.orange}
            colors={[COLORS.orange]}
          />
        }
      >
        <ConnectionsSearch value={searchQuery} onChange={setSearchQuery} />
        <ConnectionsFilter activeFilter={activeFilter} onSelect={setActiveFilter} />
        
        <View style={styles.listContainer}>
          {filteredConnections.map(account => (
            <PlatformAccountCard 
              key={account.id} 
              account={account} 
              onStatusChange={loadConnections} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingTop: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  }
});

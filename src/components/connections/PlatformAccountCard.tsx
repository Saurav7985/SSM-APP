import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { ConnectedAccount } from '../../types/connections';
import { PLATFORMS_DATA } from '../../constants/platforms';
import { ConnectionsService } from '../../services/connectionsService';

interface PlatformAccountCardProps {
  account: ConnectedAccount;
  onStatusChange: () => void;
}

export default function PlatformAccountCard({ account, onStatusChange }: PlatformAccountCardProps) {
  const [internalStatus, setInternalStatus] = useState(account.status);
  const platform = PLATFORMS_DATA.find(p => p.id === account.platformId);

  const handleConnect = async () => {
    await ConnectionsService.connectPlatform(account.platformId, setInternalStatus);
    onStatusChange();
  };

  const handleDisconnect = () => {
    Alert.alert(
      "Disconnect Account",
      "Are you sure you want to disconnect this account?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Disconnect", 
          style: "destructive",
          onPress: async () => {
            setInternalStatus('connecting');
            await ConnectionsService.disconnectPlatform(account.platformId);
            onStatusChange();
          }
        }
      ]
    );
  };

  const renderStatus = () => {
    switch (internalStatus) {
      case 'connecting':
        return (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" color={COLORS.orange} style={{ marginRight: 6 }} />
            <Text style={styles.statusText}>Connecting...</Text>
          </View>
        );
      case 'connected':
        return (
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.statusText, { color: '#10B981' }]}>Connected</Text>
          </View>
        );
      case 'error':
        return (
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.statusText, { color: '#EF4444' }]}>Connection failed</Text>
          </View>
        );
      default:
        return (
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: COLORS.gray }]} />
            <Text style={styles.statusText}>Not connected</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconContainer, { backgroundColor: platform?.accentColor + '20' }]}>
            <Feather name={platform?.icon as any || 'box'} size={20} color={platform?.accentColor} />
          </View>
          <View>
            <Text style={styles.platformName}>{platform?.name}</Text>
            {renderStatus()}
            
            {internalStatus === 'connected' && account.username && (
              <Text style={styles.accountName}>{account.username}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        {internalStatus === 'connected' ? (
          <View style={styles.connectedActions}>
            <Pressable style={styles.manageBtn} onPress={() => console.log('Manage', account.platformId)}>
              <Text style={styles.manageBtnText}>Manage</Text>
            </Pressable>
            <Pressable style={styles.disconnectBtn} onPress={handleDisconnect}>
              <Text style={styles.disconnectBtnText}>Disconnect</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable 
            style={[styles.connectBtn, internalStatus === 'connecting' && styles.connectBtnDisabled]}
            onPress={handleConnect}
            disabled={internalStatus === 'connecting'}
          >
            {internalStatus === 'error' ? (
              <Text style={styles.connectBtnText}>Try Again</Text>
            ) : (
              <Text style={styles.connectBtnText}>Connect Account</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  platformName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  accountName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  actions: {
    marginTop: 8,
  },
  connectBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtnDisabled: {
    opacity: 0.5,
  },
  connectBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  connectedActions: {
    flexDirection: 'row',
    gap: 12,
  },
  manageBtn: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  disconnectBtn: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disconnectBtnText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
});

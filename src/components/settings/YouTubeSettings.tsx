import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SettingsState } from '../../types/settings';
import { SettingsService } from '../../services/settingsService';

interface YouTubeSettingsProps {
  youtube: SettingsState['youtube'];
  onUpdate: () => void;
}

export default function YouTubeSettings({ youtube, onUpdate }: YouTubeSettingsProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConnect = async () => {
    setIsProcessing(true);
    await SettingsService.connectYouTube();
    setIsProcessing(false);
    onUpdate();
  };

  const handleDisconnect = async () => {
    setIsProcessing(true);
    await SettingsService.disconnectYouTube();
    setIsProcessing(false);
    onUpdate();
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>YouTube Console</Text>
        <Text style={styles.subtitle}>Manage your YouTube channel integration for video publishing</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.platformHeader}>
          <View style={styles.iconContainer}>
            <Feather name="youtube" size={24} color="#FF0000" />
          </View>
          <View style={styles.platformInfo}>
            <Text style={styles.platformName}>YouTube Channel</Text>
            {youtube.status === 'Connected' ? (
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.statusText}>Connected</Text>
              </View>
            ) : (
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: COLORS.gray }]} />
                <Text style={styles.statusText}>Not connected</Text>
              </View>
            )}
          </View>
        </View>

        {youtube.status === 'Connected' && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Channel Name</Text>
              <Text style={styles.detailValue}>{youtube.channelName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Channel ID</Text>
              <Text style={styles.detailValue}>{youtube.channelId}</Text>
            </View>
          </View>
        )}

        <View style={styles.actions}>
          {youtube.status === 'Connected' ? (
            <Pressable 
              style={styles.disconnectBtn} 
              onPress={handleDisconnect}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#EF4444" />
              ) : (
                <Text style={styles.disconnectBtnText}>Disconnect</Text>
              )}
            </Pressable>
          ) : (
            <Pressable 
              style={styles.connectBtn} 
              onPress={handleConnect}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.connectBtnText}>Connect YouTube</Text>
              )}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  platformHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  platformInfo: {
    flex: 1,
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
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  detailsContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: COLORS.gray,
    fontSize: 13,
  },
  detailValue: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '500',
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
  connectBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disconnectBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disconnectBtnText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

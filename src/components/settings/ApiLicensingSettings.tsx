import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SettingsState } from '../../types/settings';
import { SettingsService } from '../../services/settingsService';

interface ApiLicensingSettingsProps {
  apiLicensing: SettingsState['apiLicensing'];
  onUpdate: () => void;
}

export default function ApiLicensingSettings({ apiLicensing, onUpdate }: ApiLicensingSettingsProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await SettingsService.regenerateApiKey();
    setIsRegenerating(false);
    onUpdate();
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return `••••••••••••${key.slice(-4)}`;
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>API & Licensing</Text>
        <Text style={styles.subtitle}>Manage your developer API keys and service access</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>API Status</Text>
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: apiLicensing.status === 'Connected' ? '#10B981' : COLORS.gray }]} />
            <Text style={styles.statusText}>{apiLicensing.status}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>License Plan</Text>
          <Text style={styles.value}>{apiLicensing.plan}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>API Key</Text>
        <View style={styles.keyContainer}>
          <Text style={styles.keyValue}>{maskApiKey(apiLicensing.apiKey)}</Text>
          <Feather name="copy" size={16} color={COLORS.gray} />
        </View>
        <Text style={styles.helperText}>Keep this key secret. Never share it publicly.</Text>

        <Pressable 
          style={styles.regenerateBtn} 
          onPress={handleRegenerate}
          disabled={isRegenerating}
        >
          {isRegenerating ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Feather name="refresh-cw" size={16} color={COLORS.white} style={{ marginRight: 8 }} />
              <Text style={styles.regenerateBtnText}>Regenerate Key</Text>
            </>
          )}
        </Pressable>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: COLORS.gray,
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 16,
  },
  keyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
  },
  keyValue: {
    color: COLORS.white,
    fontFamily: 'monospace',
    fontSize: 14,
  },
  helperText: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  regenerateBtn: {
    backgroundColor: '#333',
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regenerateBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  }
});

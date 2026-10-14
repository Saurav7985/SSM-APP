import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SettingsState } from '../../types/settings';
import { SettingsService } from '../../services/settingsService';

interface NotificationSettingsProps {
  notifications: SettingsState['notifications'];
  onUpdate: () => void;
}

export default function NotificationSettings({ notifications, onUpdate }: NotificationSettingsProps) {
  
  const handleToggle = async (key: keyof SettingsState['notifications']) => {
    await SettingsService.toggleNotification(key);
    onUpdate();
  };

  const renderToggle = (key: keyof SettingsState['notifications'], label: string, description: string) => (
    <View style={styles.toggleRow} key={key}>
      <View style={styles.toggleInfo}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.helperText}>{description}</Text>
      </View>
      <Switch
        trackColor={{ false: '#333', true: COLORS.orange }}
        thumbColor={COLORS.white}
        value={notifications[key]}
        onValueChange={() => handleToggle(key)}
      />
    </View>
  );

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Choose what updates you want to receive and how</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.groupTitle}>Channels</Text>
        {renderToggle('email', 'Email Notifications', 'Receive updates via email')}
        {renderToggle('push', 'Push Notifications', 'Receive push notifications on your device')}

        <View style={styles.divider} />

        <Text style={styles.groupTitle}>Publishing Events</Text>
        {renderToggle('postPublished', 'Post Published', 'When a post successfully goes live')}
        {renderToggle('postScheduled', 'Post Scheduled', 'When a new post is added to the queue')}
        {renderToggle('failedPublication', 'Failed Publication', 'When a post fails to publish')}

        <View style={styles.divider} />

        <Text style={styles.groupTitle}>AI & Interaction</Text>
        {renderToggle('aiGenerationComplete', 'AI Generation Complete', 'When AI finishes drafting content')}
        {renderToggle('newMessages', 'New Messages', 'When you receive comments or DMs')}
        {renderToggle('connectionIssues', 'Account Connection Issues', 'When a social account gets disconnected')}
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
  groupTitle: {
    color: COLORS.orange,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  label: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  helperText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 8,
    marginBottom: 24,
  },
});

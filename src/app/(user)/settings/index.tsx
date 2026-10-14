import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet,  Platform, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { SettingsService } from '../../../services/settingsService';
import { SettingsState } from '../../../types/settings';

import SettingsHeader from '../../../components/settings/SettingsHeader';
import SettingsNavigation, { SettingsTab } from '../../../components/settings/SettingsNavigation';
import AccountSettings from '../../../components/settings/AccountSettings';
import DangerZone from '../../../components/settings/DangerZone';
import ApiLicensingSettings from '../../../components/settings/ApiLicensingSettings';
import YouTubeSettings from '../../../components/settings/YouTubeSettings';
import AIPreferences from '../../../components/settings/AIPreferences';
import BillingSettings from '../../../components/settings/BillingSettings';
import NotificationSettings from '../../../components/settings/NotificationSettings';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<SettingsState | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>('Account');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const data = await SettingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadSettings();
    setIsRefreshing(false);
  };

  if (!settings) return <SafeAreaView style={styles.safeArea} />;

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <>
            <AccountSettings account={settings.account} onUpdate={loadSettings} />
            <DangerZone />
          </>
        );
      case 'API & Licensing':
        return <ApiLicensingSettings apiLicensing={settings.apiLicensing} onUpdate={loadSettings} />;
      case 'YouTube Console':
        return <YouTubeSettings youtube={settings.youtube} onUpdate={loadSettings} />;
      case 'AI Preferences':
        return <AIPreferences preferences={settings.aiPreferences} onUpdate={loadSettings} />;
      case 'Billing':
        return <BillingSettings billing={settings.billing} />;
      case 'Notifications':
        return <NotificationSettings notifications={settings.notifications} onUpdate={loadSettings} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SettingsHeader />
      <SettingsNavigation activeTab={activeTab} onSelect={setActiveTab} />
      
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
        {renderActiveSection()}
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
    paddingTop: 24,
  },
});

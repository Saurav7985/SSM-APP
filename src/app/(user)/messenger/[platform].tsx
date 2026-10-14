import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, Pressable,  Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../constants/colors';

export default function PlatformInboxScreen() {
  const { platform } = useLocalSearchParams();

  // Convert platform string to capitalized display name
  const platformName = typeof platform === 'string' 
    ? platform.charAt(0).toUpperCase() + platform.slice(1) 
    : 'Platform';

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={10}
        >
          <Feather name="arrow-left" size={24} color={COLORS.white} />
        </Pressable>
        <Text style={styles.headerTitle}>{platformName} Inbox</Text>
        <View style={{ width: 24 }} /> {/* Spacer for centering */}
      </View>

      {/* Main Content (Placeholder for Chat View) */}
      <View style={styles.mainContent}>
        <Feather name="message-circle" size={48} color={COLORS.gray} style={{ marginBottom: 16 }} />
        <Text style={styles.placeholderTitle}>Select a Conversation</Text>
        <Text style={styles.placeholderSubtitle}>
          Your {platformName} DMs and comments will appear here.
        </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  placeholderTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  placeholderSubtitle: {
    color: COLORS.gray,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  }
});

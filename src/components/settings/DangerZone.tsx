import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SettingsService } from '../../services/settingsService';

export default function DangerZone() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      "Delete All Data?",
      "This will permanently delete your social connections, access tokens, posts, analytics, and other stored data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete Everything", 
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            const success = await SettingsService.deleteAllData();
            setIsDeleting(false);
            if (success) {
              Alert.alert("Data Deleted", "Your account and all associated data have been deleted. You will be logged out.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.section}>
      <View style={styles.divider} />
      
      <Text style={styles.title}>Danger Zone</Text>
      
      <View style={styles.card}>
        <Text style={styles.description}>
          Permanently delete all your social media connections, stored access tokens, generated posts, and analytics data from our servers. This action cannot be undone.
        </Text>
        
        <Pressable 
          style={styles.deleteBtn} 
          onPress={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator color="#EF4444" />
          ) : (
            <Text style={styles.deleteBtnText}>Delete All My Data</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginBottom: 32,
  },
  title: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  description: {
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  deleteBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.5)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

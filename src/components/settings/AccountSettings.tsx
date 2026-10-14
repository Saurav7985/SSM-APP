import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../constants/colors';
import { SettingsState } from '../../types/settings';
import { SettingsService } from '../../services/settingsService';

interface AccountSettingsProps {
  account: SettingsState['account'];
  onUpdate: () => void;
}

export default function AccountSettings({ account, onUpdate }: AccountSettingsProps) {
  const [fullName, setFullName] = useState(account.fullName);
  const [photoUri, setPhotoUri] = useState(account.profilePhotoUri);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await SettingsService.updateAccount(fullName, photoUri);
    setIsSaving(false);
    setSaveSuccess(true);
    onUpdate();
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Account Settings</Text>
        <Text style={styles.subtitle}>Update your personal profile information and profile photo</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Profile Photo</Text>
        <View style={styles.photoRow}>
          <View style={styles.avatar}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarImage} />
            ) : (
              <Feather name="user" size={32} color={COLORS.gray} />
            )}
          </View>
          <View>
            <Pressable style={styles.changeBtn} onPress={handlePickImage}>
              <Text style={styles.changeBtnText}>Change Photo</Text>
            </Pressable>
            <Text style={styles.helperText}>JPG, GIF or PNG. Max size 2MB</Text>
          </View>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          placeholderTextColor="#666"
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Email Address (Managed via Clerk)</Text>
        <View style={styles.disabledInputContainer}>
          <TextInput 
            style={styles.disabledInput}
            value={account.email}
            editable={false}
          />
          <Feather name="lock" size={16} color="#666" style={styles.lockIcon} />
        </View>
        <Text style={styles.helperText}>Email is managed by your authentication provider.</Text>

        <Pressable 
          style={styles.saveBtn} 
          onPress={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveBtnText}>{saveSuccess ? 'Saved!' : 'Save Changes'}</Text>
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
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  changeBtn: {
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  changeBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  helperText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    color: COLORS.white,
    padding: 14,
    fontSize: 14,
  },
  disabledInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    opacity: 0.7,
  },
  disabledInput: {
    flex: 1,
    color: '#888',
    padding: 14,
    fontSize: 14,
  },
  lockIcon: {
    paddingRight: 14,
  },
  saveBtn: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  }
});

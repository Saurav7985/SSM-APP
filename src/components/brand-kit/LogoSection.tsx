import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../constants/colors';
import { BrandLogo } from '../../types/brandKit';

interface LogoSectionProps {
  logos: BrandLogo[];
  onAddLogo: (logo: BrandLogo) => void;
  onRemoveLogo: (id: string) => void;
}

export default function LogoSection({ logos, onAddLogo, onRemoveLogo }: LogoSectionProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
          onAddLogo({
            id: Date.now().toString(),
            name: result.assets[0].fileName || 'Uploaded_Logo.png',
            uri: result.assets[0].uri,
            isDefault: logos.length === 0
          });
          setIsUploading(false);
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Logos</Text>
      
      <Pressable style={styles.uploadArea} onPress={handleUpload} disabled={isUploading}>
        {isUploading ? (
          <ActivityIndicator color={COLORS.orange} />
        ) : (
          <>
            <Feather name="upload-cloud" size={32} color={COLORS.gray} style={{ marginBottom: 12 }} />
            <Text style={styles.uploadText}>Tap to browse or upload logo</Text>
            <Text style={styles.uploadSubtext}>PNG, JPG or SVG (max 5MB)</Text>
          </>
        )}
      </Pressable>

      {logos.length > 0 && (
        <View style={styles.gallery}>
          {logos.map(logo => (
            <View key={logo.id} style={[styles.logoCard, logo.isDefault && styles.logoCardDefault]}>
              <View style={styles.logoPreview}>
                <Image source={{ uri: logo.uri }} style={styles.logoImage} resizeMode="contain" />
              </View>
              <View style={styles.logoInfo}>
                <Text style={styles.logoName} numberOfLines={1}>{logo.name}</Text>
                {logo.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
              </View>
              <Pressable style={styles.deleteBtn} onPress={() => onRemoveLogo(logo.id)}>
                <Feather name="trash-2" size={16} color="#EF4444" />
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  uploadArea: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  uploadSubtext: {
    color: COLORS.gray,
    fontSize: 12,
  },
  gallery: {
    gap: 12,
  },
  logoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  logoCardDefault: {
    borderColor: 'rgba(255,100,34,0.3)',
    backgroundColor: 'rgba(255,100,34,0.05)',
  },
  logoPreview: {
    width: 48,
    height: 48,
    backgroundColor: '#111',
    borderRadius: 8,
    marginRight: 16,
    padding: 4,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoInfo: {
    flex: 1,
  },
  logoName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  defaultBadge: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  deleteBtn: {
    padding: 8,
  },
});

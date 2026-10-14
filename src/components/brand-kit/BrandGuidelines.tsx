import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { COLORS } from '../../constants/colors';
import { BrandGuideline } from '../../types/brandKit';

interface BrandGuidelinesProps {
  guidelines: BrandGuideline[];
  onAddGuideline: (guideline: BrandGuideline) => void;
  onRemoveGuideline: (id: string) => void;
}

export default function BrandGuidelines({ guidelines, onAddGuideline, onRemoveGuideline }: BrandGuidelinesProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        // Ensure size is within bounds (mocking check here)
        if (file.size && file.size > 10 * 1024 * 1024) {
          Alert.alert('File is too large. Max 10MB allowed.');
          return;
        }

        setIsUploading(true);
        // Simulate upload delay
        setTimeout(() => {
          onAddGuideline({
            id: Date.now().toString(),
            name: file.name,
            size: file.size ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown size',
            uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            uri: file.uri
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
      <Text style={styles.sectionTitle}>Brand Guidelines</Text>
      
      <Pressable style={styles.uploadArea} onPress={handleUpload} disabled={isUploading}>
        {isUploading ? (
          <ActivityIndicator color={COLORS.orange} />
        ) : (
          <>
            <Feather name="file-text" size={32} color={COLORS.gray} style={{ marginBottom: 12 }} />
            <Text style={styles.uploadText}>Upload brand guidelines (PDF)</Text>
            <Text style={styles.uploadSubtext}>Max 10MB per file</Text>
          </>
        )}
      </Pressable>

      {guidelines.length > 0 && (
        <View style={styles.list}>
          {guidelines.map(doc => (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docIcon}>
                <Feather name="file" size={20} color={COLORS.white} />
              </View>
              <View style={styles.docInfo}>
                <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
                <Text style={styles.docMeta}>{doc.size} • {doc.uploadedAt}</Text>
              </View>
              <Pressable style={styles.deleteBtn} onPress={() => onRemoveGuideline(doc.id)}>
                <Feather name="trash-2" size={18} color="#EF4444" />
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
  list: {
    gap: 12,
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  docIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#111',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  docMeta: {
    color: COLORS.gray,
    fontSize: 12,
  },
  deleteBtn: {
    padding: 8,
  },
});

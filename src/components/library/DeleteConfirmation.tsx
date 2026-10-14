import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { COLORS } from '../../constants/colors';

interface DeleteConfirmationProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ visible, onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Delete Post</Text>
          <Text style={styles.description}>Are you sure you want to delete this post? This action cannot be undone.</Text>
          <View style={styles.actions}>
            <Pressable style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={onConfirm}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  cancelText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  deleteBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
  },
  deleteText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

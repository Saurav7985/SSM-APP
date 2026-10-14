import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { BrandColor } from '../../types/brandKit';

interface BrandColorsProps {
  colors: BrandColor[];
  onAddColor: (color: BrandColor) => void;
  onRemoveColor: (id: string) => void;
}

export default function BrandColors({ colors, onAddColor, onRemoveColor }: BrandColorsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newHex, setNewHex] = useState('#');

  const handleSave = () => {
    if (newHex.length === 4 || newHex.length === 7) {
      onAddColor({
        id: Date.now().toString(),
        hex: newHex,
      });
      setNewHex('#');
      setIsAdding(false);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Brand Colors</Text>
      
      <View style={styles.colorList}>
        {colors.map(color => (
          <View key={color.id} style={styles.colorRow}>
            <View style={styles.colorPreviewContainer}>
              <View style={[styles.colorCircle, { backgroundColor: color.hex }]} />
              <Text style={styles.hexText}>{color.hex.toUpperCase()}</Text>
              {color.name && <Text style={styles.colorName}>{color.name}</Text>}
            </View>
            <Pressable style={styles.deleteBtn} onPress={() => onRemoveColor(color.id)}>
              <Feather name="x" size={16} color={COLORS.gray} />
            </Pressable>
          </View>
        ))}

        {isAdding ? (
          <View style={styles.addForm}>
            <View style={styles.inputContainer}>
              <View style={[styles.colorCircle, { backgroundColor: newHex.length >= 4 ? newHex : '#333' }]} />
              <TextInput 
                style={styles.input}
                value={newHex}
                onChangeText={setNewHex}
                placeholder="#000000"
                placeholderTextColor="#666"
                autoCapitalize="characters"
                maxLength={7}
              />
            </View>
            <Pressable style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.addBtn} onPress={() => setIsAdding(true)}>
            <Feather name="plus" size={16} color={COLORS.orange} />
            <Text style={styles.addBtnText}>Add Color</Text>
          </Pressable>
        )}
      </View>
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
  colorList: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#222',
    gap: 16,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  hexText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    width: 80,
  },
  colorName: {
    color: COLORS.gray,
    fontSize: 14,
  },
  deleteBtn: {
    padding: 4,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addBtnText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  addForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    padding: 0,
  },
  saveBtn: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

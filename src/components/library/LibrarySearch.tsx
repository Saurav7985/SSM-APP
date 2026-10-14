import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface LibrarySearchProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function LibrarySearch({ value, onChangeText }: LibrarySearchProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color={COLORS.gray} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search posts..."
        placeholderTextColor={COLORS.gray}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
  },
});

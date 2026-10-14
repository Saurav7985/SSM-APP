import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface ConnectionsSearchProps {
  value: string;
  onChange: (query: string) => void;
}

export default function ConnectionsSearch({ value, onChange }: ConnectionsSearchProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color={COLORS.gray} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search platforms or accounts..."
        placeholderTextColor="#666"
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <Feather 
          name="x-circle" 
          size={16} 
          color={COLORS.gray} 
          style={styles.clearIcon} 
          onPress={() => onChange('')} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    paddingVertical: 12,
  },
  clearIcon: {
    padding: 4,
  }
});

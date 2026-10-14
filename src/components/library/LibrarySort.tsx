import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface LibrarySortProps {
  sortOption: string;
  onChangeSort: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onChangeViewMode: (mode: 'grid' | 'list') => void;
}

export default function LibrarySort({ 
  sortOption, 
  onChangeSort,
  viewMode,
  onChangeViewMode
}: LibrarySortProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const sortOptions = [
    { id: 'newest', label: 'Newest' },
    { id: 'oldest', label: 'Oldest' },
    { id: 'recently_updated', label: 'Recently Updated' },
    { id: 'scheduled_date', label: 'Scheduled Date' },
    { id: 'alphabetical', label: 'Alphabetical' },
  ];

  const activeLabel = sortOptions.find(o => o.id === sortOption)?.label || 'Newest';

  return (
    <View style={styles.container}>
      
      {/* Sort Dropdown */}
      <View style={{ zIndex: 10 }}>
        <Pressable style={styles.sortButton} onPress={() => setDropdownOpen(!dropdownOpen)}>
          <Text style={styles.sortText}>Sort by: <Text style={styles.sortTextActive}>{activeLabel}</Text></Text>
          <Feather name={dropdownOpen ? "chevron-up" : "chevron-down"} size={14} color={COLORS.gray} style={{ marginLeft: 4 }} />
        </Pressable>

        {dropdownOpen && (
          <View style={styles.dropdownMenu}>
            {sortOptions.map(opt => (
              <Pressable 
                key={opt.id}
                style={styles.dropdownItem} 
                onPress={() => { onChangeSort(opt.id); setDropdownOpen(false); }}
              >
                <Text style={[styles.dropdownItemText, sortOption === opt.id && styles.dropdownItemTextActive]}>{opt.label}</Text>
                {sortOption === opt.id && <Feather name="check" size={14} color={COLORS.orange} />}
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <Pressable 
          style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleBtnActive]}
          onPress={() => onChangeViewMode('grid')}
        >
          <Feather name="grid" size={16} color={viewMode === 'grid' ? COLORS.white : COLORS.gray} />
        </Pressable>
        <Pressable 
          style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]}
          onPress={() => onChangeViewMode('list')}
        >
          <Feather name="list" size={16} color={viewMode === 'list' ? COLORS.white : COLORS.gray} />
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    zIndex: 9,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  sortTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 24,
    left: 0,
    width: 180,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  dropdownItemText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  dropdownItemTextActive: {
    color: COLORS.orange,
    fontWeight: '600',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 2,
  },
  toggleBtn: {
    padding: 8,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#333',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface LibraryFiltersProps {
  activeStatus: string;
  onChangeStatus: (status: string) => void;
  activePlatform: string;
  onChangePlatform: (platformId: string) => void;
}

export default function LibraryFilters({ 
  activeStatus, 
  onChangeStatus,
  activePlatform,
  onChangePlatform
}: LibraryFiltersProps) {
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  
  const statusOptions = ['All', 'Published', 'Scheduled', 'Draft'];
  
  const activePlatformName = activePlatform === 'all' 
    ? 'All Platforms' 
    : PLATFORMS_DATA.find(p => p.id === activePlatform)?.name || 'Platforms';

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Status Chips */}
        {statusOptions.map(status => {
          const isActive = activeStatus === status.toLowerCase();
          return (
            <Pressable 
              key={status}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onChangeStatus(status.toLowerCase())}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{status}</Text>
            </Pressable>
          );
        })}

        {/* Vertical Divider */}
        <View style={styles.divider} />

        {/* Platform Dropdown Trigger */}
        <View style={{ zIndex: 10 }}>
          <Pressable 
            style={[styles.chip, activePlatform !== 'all' && styles.chipActive]}
            onPress={() => setPlatformDropdownOpen(!platformDropdownOpen)}
          >
            <Text style={[styles.chipText, activePlatform !== 'all' && styles.chipTextActive]}>{activePlatformName}</Text>
            <Feather name={platformDropdownOpen ? "chevron-up" : "chevron-down"} size={14} color={activePlatform !== 'all' ? COLORS.white : COLORS.gray} style={{ marginLeft: 6 }} />
          </Pressable>

          {/* Platform Dropdown List */}
          {platformDropdownOpen && (
            <View style={styles.dropdownMenu}>
              <ScrollView style={{ maxHeight: 250 }} nestedScrollEnabled>
                <Pressable 
                  style={styles.dropdownItem} 
                  onPress={() => { onChangePlatform('all'); setPlatformDropdownOpen(false); }}
                >
                  <Text style={[styles.dropdownItemText, activePlatform === 'all' && styles.dropdownItemTextActive]}>All Platforms</Text>
                  {activePlatform === 'all' && <Feather name="check" size={14} color={COLORS.orange} />}
                </Pressable>
                {PLATFORMS_DATA.map(platform => (
                  <Pressable 
                    key={platform.id}
                    style={styles.dropdownItem} 
                    onPress={() => { onChangePlatform(platform.id); setPlatformDropdownOpen(false); }}
                  >
                    <Text style={[styles.dropdownItemText, activePlatform === platform.id && styles.dropdownItemTextActive]}>{platform.name}</Text>
                    {activePlatform === platform.id && <Feather name="check" size={14} color={COLORS.orange} />}
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 10, // For dropdown
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  chipText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: 200,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 20,
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
});

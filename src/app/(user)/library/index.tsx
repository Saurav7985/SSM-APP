import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useMemo } from 'react';
import { View, StyleSheet,  Platform, StatusBar, FlatList, Pressable, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../../../constants/colors';
import { ContentPost } from '../../../types/content';
import { MOCK_POSTS } from '../../../constants/content';

import LibraryHeader from '../../../components/library/LibraryHeader';
import LibrarySearch from '../../../components/library/LibrarySearch';
import LibraryFilters from '../../../components/library/LibraryFilters';
import LibrarySort from '../../../components/library/LibrarySort';
import ContentCard from '../../../components/library/ContentCard';
import ContentListItem from '../../../components/library/ContentListItem';
import EmptyLibrary from '../../../components/library/EmptyLibrary';
import DeleteConfirmation from '../../../components/library/DeleteConfirmation';

export default function LibraryScreen() {
  const [posts, setPosts] = useState<ContentPost[]>(MOCK_POSTS);
  
  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [activePlatform, setActivePlatform] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Deletion State
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Derived filtered & sorted data
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Status Filter
    if (activeStatus !== 'all') {
      result = result.filter(p => p.status === activeStatus);
    }

    // Platform Filter
    if (activePlatform !== 'all') {
      result = result.filter(p => p.platforms.includes(activePlatform));
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.title && p.title.toLowerCase().includes(q)) || 
        p.caption.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'recently_updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'scheduled_date':
          const dateA = a.scheduledAt ? new Date(a.scheduledAt).getTime() : Number.MAX_VALUE;
          const dateB = b.scheduledAt ? new Date(b.scheduledAt).getTime() : Number.MAX_VALUE;
          return dateA - dateB;
        case 'alphabetical':
          const titleA = a.title || a.caption;
          const titleB = b.title || b.caption;
          return titleA.localeCompare(titleB);
        default:
          return 0;
      }
    });

    return result;
  }, [posts, searchQuery, activeStatus, activePlatform, sortOption]);

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      setPosts(prev => prev.filter(p => p.id !== postToDelete));
      setPostToDelete(null);
    }
  };

  const renderGridItem = ({ item }: { item: ContentPost }) => (
    <View style={styles.gridItemWrapper}>
      <ContentCard post={item} onDelete={setPostToDelete} />
    </View>
  );

  const renderListItem = ({ item }: { item: ContentPost }) => (
    <ContentListItem post={item} onDelete={setPostToDelete} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Fixed Top Section */}
      <View style={{ zIndex: 10 }}>
        <LibraryHeader postCount={posts.length} />
        
        <LibrarySearch 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
        
        <LibraryFilters 
          activeStatus={activeStatus}
          onChangeStatus={setActiveStatus}
          activePlatform={activePlatform}
          onChangePlatform={setActivePlatform}
        />

        <LibrarySort 
          sortOption={sortOption}
          onChangeSort={setSortOption}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
        />
      </View>

      {/* Main Content List */}
      <View style={styles.listContainer}>
        {posts.length === 0 ? (
          <EmptyLibrary />
        ) : filteredPosts.length === 0 ? (
          <View style={styles.emptySearchContainer}>
            <Text style={styles.emptySearchText}>No posts match your filters.</Text>
          </View>
        ) : (
          <FlatList
            key={viewMode} // Forces re-render when switching columns
            data={filteredPosts}
            keyExtractor={item => item.id}
            numColumns={viewMode === 'grid' ? 2 : 1}
            renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
            contentContainerStyle={viewMode === 'grid' ? styles.gridContent : styles.listContent}
            columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <Pressable style={styles.fab} onPress={() => router.push('/(user)/create')}>
        <Feather name="plus" size={24} color={COLORS.white} />
      </Pressable>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation 
        visible={!!postToDelete} 
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPostToDelete(null)}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  listContainer: {
    flex: 1,
    zIndex: 1,
  },
  gridContent: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  gridItemWrapper: {
    flex: 1,
    maxWidth: '48%', // Ensure 2 columns with gap
    marginHorizontal: 4,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptySearchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySearchText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100,
  },
});

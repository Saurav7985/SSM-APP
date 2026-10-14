import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { ContentPost } from '../../types/content';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface ContentListItemProps {
  post: ContentPost;
  onDelete: (id: string) => void;
}

export default function ContentListItem({ post, onDelete }: ContentListItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return '#10B981';
      case 'scheduled': return '#3B82F6';
      case 'draft': return COLORS.orange;
      default: return COLORS.gray;
    }
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <View style={styles.container}>
      <View style={styles.thumbnail}>
        <Feather 
          name={post.mediaType === 'video' || post.mediaType === 'reel' ? 'video' : 'image'} 
          size={20} 
          color="#666" 
        />
      </View>
      
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{post.title || post.caption}</Text>
        
        <View style={styles.metaRow}>
          <View style={styles.platformsRow}>
            {post.platforms.map((platformId, index) => {
              const platform = PLATFORMS_DATA.find(p => p.id === platformId);
              if (!platform) return null;
              if (index > 2) return null;
              if (index === 2 && post.platforms.length > 3) {
                return (
                  <View key="more" style={styles.morePlatformsCircle}>
                    <Text style={styles.morePlatformsText}>+{post.platforms.length - 2}</Text>
                  </View>
                );
              }
              return (
                <View key={platformId} style={[styles.platformCircle, { backgroundColor: platform.accentColor || '#333' }]}>
                  <Feather name={platform.icon as any} size={8} color="#FFF" />
                </View>
              );
            })}
          </View>
          
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(post.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(post.status) }]}>{post.status.toUpperCase()}</Text>
          
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>

      <View style={{ zIndex: 10 }}>
        <Pressable style={styles.actionBtn} onPress={() => setMenuOpen(!menuOpen)}>
          <Feather name="more-vertical" size={18} color={COLORS.gray} />
        </Pressable>

        {menuOpen && (
          <View style={styles.dropdown}>
            <Pressable style={styles.dropdownItem} onPress={() => setMenuOpen(false)}>
              <Feather name="eye" size={14} color={COLORS.gray} />
              <Text style={styles.dropdownItemText}>View</Text>
            </Pressable>
            <Pressable style={styles.dropdownItem} onPress={() => setMenuOpen(false)}>
              <Feather name="edit-2" size={14} color={COLORS.gray} />
              <Text style={styles.dropdownItemText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.dropdownItem} onPress={() => setMenuOpen(false)}>
              <Feather name="copy" size={14} color={COLORS.gray} />
              <Text style={styles.dropdownItemText}>Duplicate</Text>
            </Pressable>
            <Pressable style={[styles.dropdownItem, styles.deleteItem]} onPress={() => {
              setMenuOpen(false);
              onDelete(post.id);
            }}>
              <Feather name="trash-2" size={14} color="#EF4444" />
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  platformCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -4,
    borderWidth: 1,
    borderColor: COLORS.card,
  },
  morePlatformsCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -4,
    borderWidth: 1,
    borderColor: COLORS.card,
  },
  morePlatformsText: {
    color: COLORS.white,
    fontSize: 6,
    fontWeight: 'bold',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 12,
  },
  date: {
    color: '#666',
    fontSize: 10,
  },
  actionBtn: {
    padding: 8,
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    width: 120,
    zIndex: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  dropdownItemText: {
    color: COLORS.gray,
    fontSize: 12,
    marginLeft: 8,
  },
  deleteItem: {
    borderBottomWidth: 0,
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 12,
    marginLeft: 8,
  },
});

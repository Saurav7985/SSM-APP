import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { ContentPost } from '../../types/content';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface ContentCardProps {
  post: ContentPost;
  onDelete: (id: string) => void;
}

export default function ContentCard({ post, onDelete }: ContentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return '#10B981'; // Green
      case 'scheduled': return '#3B82F6'; // Blue
      case 'draft': return COLORS.orange; // Orange
      default: return COLORS.gray;
    }
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <View style={styles.card}>
      {/* Media Placeholder */}
      <View style={styles.mediaArea}>
        <Feather 
          name={post.mediaType === 'video' || post.mediaType === 'reel' ? 'video' : 'image'} 
          size={32} 
          color="#333" 
        />
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(post.status) }]}>
          <Text style={styles.statusText}>{post.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.contentArea}>
        {post.title && <Text style={styles.title} numberOfLines={1}>{post.title}</Text>}
        <Text style={styles.caption} numberOfLines={2}>{post.caption}</Text>
        
        <View style={styles.footer}>
          <View style={styles.platformsRow}>
            {post.platforms.map((platformId, index) => {
              const platform = PLATFORMS_DATA.find(p => p.id === platformId);
              if (!platform) return null;
              // Only show up to 3 icons
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
                  <Feather name={platform.icon as any} size={10} color="#FFF" />
                </View>
              );
            })}
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>

      {/* Action Menu */}
      <Pressable style={styles.actionMenuBtn} onPress={() => setMenuOpen(!menuOpen)}>
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
          {post.status === 'scheduled' && (
             <Pressable style={styles.dropdownItem} onPress={() => setMenuOpen(false)}>
               <Feather name="calendar" size={14} color={COLORS.gray} />
               <Text style={styles.dropdownItemText}>Edit Schedule</Text>
             </Pressable>
          )}
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
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    flex: 1,
    minWidth: '45%', // allowing 2 columns on larger screens
  },
  mediaArea: {
    height: 140,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  contentArea: {
    padding: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caption: {
    color: COLORS.gray,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -4,
    borderWidth: 1,
    borderColor: COLORS.card,
  },
  morePlatformsCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -4,
    borderWidth: 1,
    borderColor: COLORS.card,
  },
  morePlatformsText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
    fontSize: 10,
  },
  actionMenuBtn: {
    position: 'absolute',
    top: 12,
    right: 8,
    padding: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    width: 140,
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
    padding: 12,
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

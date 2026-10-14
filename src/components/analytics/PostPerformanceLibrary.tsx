import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { PostAnalytics } from '../../types/analytics';
import PostPerformanceCard from './PostPerformanceCard';

interface PostPerformanceLibraryProps {
  posts: PostAnalytics[];
}

export default function PostPerformanceLibrary({ posts }: PostPerformanceLibraryProps) {
  const handleAction = (action: string, postId: string) => {
    // In a real app, this would trigger navigation or API calls
    console.log(`Action ${action} triggered for post ${postId}`);
  };

  if (!posts || posts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Post Performance Library</Text>
        <Text style={styles.subtitle}>Analyze individual post metrics and trigger instant mock boosts</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts found for the selected platform.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Performance Library</Text>
      <Text style={styles.subtitle}>Analyze individual post metrics and trigger instant mock boosts</Text>
      
      <View style={styles.list}>
        {posts.map(post => (
          <PostPerformanceCard key={post.id} post={post} onAction={handleAction} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
    paddingBottom: 40,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  emptyContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 14,
  },
});

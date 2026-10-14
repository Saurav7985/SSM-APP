import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function RecentPosts() {
  const handleViewAll = () => {
    console.log('View All Posts');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Posts</Text>
        <Pressable onPress={handleViewAll}>
          <Text style={styles.viewAllText}>View All Posts →</Text>
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.emptyText}>No recent posts found. Let's create one!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 80, // Space for floating button
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: COLORS.orange,
    fontSize: 12,
    fontWeight: '500',
  },
  contentContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 14,
  },
});

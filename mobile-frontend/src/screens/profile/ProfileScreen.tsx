import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { useDemoData } from '../../hooks/useDemoData';

export const ProfileScreen: React.FC = () => {
  const { friends } = useDemoData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Top profile</Text>
          <TouchableOpacity style={styles.chevronButton} activeOpacity={0.7}>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {friends.map(friend => (
          <View key={friend.id} style={styles.profileRow}>
            <Image source={{ uri: friend.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{friend.name}</Text>
              <Text style={styles.handle}>{friend.username}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing['6xl'],
    paddingHorizontal: theme.spacing.screen.horizontal,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  headerTitle: {
    ...theme.typography.textStyles.h3,
    color: theme.colors.text.primary,
  },
  chevronButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.secondary,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: theme.spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...theme.typography.textStyles.transactionName,
    color: theme.colors.text.primary,
  },
  handle: {
    ...theme.typography.textStyles.transactionDescription,
    color: theme.colors.text.tertiary,
    marginTop: 4,
  },
});


import React, { useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../constants';
import { useDemoData } from '../../hooks/useDemoData';
import { Transaction } from '../../types';

export const HistoryScreen: React.FC = () => {
  const { transactions, friends } = useDemoData();
  const historyItems = useMemo(() => transactions, [transactions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>History</Text>

        {historyItems.map(item => {
          const counterparty = item.toUser || item.fromUser || friends.find(friend => friend.aptosAddress === item.to || friend.aptosAddress === item.from);
          const isRequest = item.type === 'request';
          const isPositive = item.type === 'receive';
          const description = formatDescription(item.type, item.amount, item.asset);

          return (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{ uri: counterparty?.avatar ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=60' }}
                    style={styles.avatar}
                  />
                  <View style={[styles.statusDot, isPositive && styles.positiveDot]} />
                </View>
                <View>
                  <Text style={styles.historyName}>{counterparty?.name ?? 'Unknown user'}</Text>
                  <Text style={styles.historyDescription}>{description}</Text>
                </View>
              </View>

              {isRequest ? (
                <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              ) : (
                <View style={[styles.historyPreview, isPositive && styles.incomingPreview]}>
                  <Text style={styles.previewAmount}>${item.amount}</Text>
                  <Text style={styles.previewAsset}>{item.asset}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const formatDescription = (type: Transaction['type'], amount: number, asset: string) => {
  if (type === 'send') {
    return `successfully sent $${amount}`;
  }
  if (type === 'receive') {
    return `sent you $${amount}`;
  }
  return `requested $${amount}`;
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
  title: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing['3xl'],
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: theme.spacing.lg,
  },
  avatarWrapper: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  statusDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent.red,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: theme.colors.background.primary,
  },
  positiveDot: {
    backgroundColor: theme.colors.accent.green,
  },
  historyName: {
    ...theme.typography.textStyles.transactionName,
    color: theme.colors.text.primary,
  },
  historyDescription: {
    ...theme.typography.textStyles.transactionDescription,
    color: theme.colors.text.tertiary,
    marginTop: 4,
  },
  sendButton: {
    backgroundColor: theme.colors.button.primary,
    borderRadius: theme.spacing.borderRadius.lg,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    ...theme.typography.textStyles.button,
    color: theme.colors.text.white,
  },
  historyPreview: {
    minWidth: 72,
    borderRadius: theme.spacing.borderRadius.lg,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  incomingPreview: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
  },
  previewAmount: {
    ...theme.typography.textStyles.button,
    color: theme.colors.text.primary,
  },
  previewAsset: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.secondary,
  },
});


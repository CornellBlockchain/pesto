import React, { useMemo } from 'react';
<<<<<<< HEAD
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card, ListItem } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useAptos } from '../../hooks/useAptos';
import { useContacts } from '../../hooks/useContacts';
import { theme } from '../../constants';
import type { HomeStackParamList, Transaction } from '../../types';
import type { StackNavigationProp } from '@react-navigation/stack';

const MAX_RECENT_TRANSACTIONS = 5;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const { user, logout } = useAuth();
  const { assets, transactions, isLoading } = useAptos();
  const { friends } = useContacts();

  const topAssets = useMemo(() => assets.slice(0, 4), [assets]);
  const recentTransactions = useMemo(
    () => transactions.slice(0, MAX_RECENT_TRANSACTIONS),
    [transactions]
  );

  const resolveTransactionLabel = (transaction: Transaction) => {
    const friendMatch = friends.find(friend => friend.aptosAddress === transaction.to || friend.aptosAddress === transaction.from);
    if (friendMatch) {
      return friendMatch.name;
    }
    return transaction.type === 'send' ? shorten(transaction.to) : shorten(transaction.from);
  };

  const resolveTransactionSubtitle = (transaction: Transaction) => {
    const verb = transaction.type === 'send' ? 'Sent' : transaction.type === 'request' ? 'Requested' : 'Received';
    const amount = transaction.amount.toFixed(2);
    return `${verb} ${amount} APT`;
  };

  const handleNavigateToSend = () => {
    navigation.navigate('SendMoney', {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.title}>Pesto</Text>
          </View>
          <TouchableOpacity onPress={logout} activeOpacity={0.8}>
            <Avatar name={user?.name ?? 'User'} size="small" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.text.tertiary} />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </View>

        <Card>
          <View style={styles.bannerContent}>
            <View style={styles.bannerCopy}>
              <Text style={styles.bannerTitle}>Move money instantly</Text>
              <Text style={styles.bannerSubtitle}>Secure Aptos payments with compliance ready contacts.</Text>
            </View>
            <View style={styles.bannerIcon}>
              <Ionicons name="wallet" size={48} color={theme.colors.primary.green} />
=======
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { useDemoData } from '../../hooks/useDemoData';
import { useAptos } from '../../hooks/useAptos';
import { Transaction } from '../../types';

export const HomeScreen: React.FC = () => {
  const { assets, promoCards, transactions, friends } = useDemoData();
  const { aptUsdPrice } = useAptos();

  const assetPills = useMemo(() => assets.slice(0, 4), [assets]);
  const primaryCard = promoCards[0];
  const historyItems = useMemo(() => transactions.slice(0, 4), [transactions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionSpacing}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={theme.colors.text.placeholder} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={theme.colors.text.placeholder}
              style={styles.searchInput}
            />
          </View>
        </View>

        {primaryCard && (
          <View style={styles.sectionSpacing}>
            <View style={styles.heroCard}>
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}>{primaryCard.title}</Text>
                <Text style={styles.heroSubtitle}>{primaryCard.subtitle}</Text>
                <View style={styles.paginationDots}>
                  {promoCards.map(card => (
                    <View
                      key={card.id}
                      style={[styles.paginationDot, card.id === primaryCard.id && styles.activeDot]}
                    />
                  ))}
                </View>
              </View>
              <Image source={{ uri: primaryCard.image }} style={styles.heroImage} />
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
            </View>
          </View>
        )}

<<<<<<< HEAD
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your assets</Text>
          <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Assets' as never)}>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.assetsRow}>
          {topAssets.length === 0 && (
            <Text style={styles.emptyState}>Connect your Aptos account to see balances.</Text>
          )}
          {topAssets.map(asset => (
            <View key={asset.id} style={styles.assetItem}>
              <View style={styles.assetIcon}>
                <Text style={styles.assetInitials}>{asset.symbol.slice(0, 3)}</Text>
              </View>
              <Text style={styles.assetSymbol}>{asset.symbol}</Text>
              <Text style={styles.assetBalance}>{asset.balance.toFixed(2)} APT</Text>
            </View>
          ))}
=======
        <View style={styles.sectionSpacing}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your assets</Text>
            <TouchableOpacity style={styles.chevronButton} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.assetRow}>
            {assetPills.map(asset => (
              <View key={asset.id} style={styles.assetItem}>
                <View style={[styles.assetIcon, { backgroundColor: pillColor(asset.symbol) }]}>
                  <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                </View>
                <Text style={styles.assetLabel}>{asset.symbol}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionSpacing}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>History</Text>
            <TouchableOpacity style={styles.chevronButton} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.text.secondary} />
            </TouchableOpacity>
          </View>

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
                    <Text style={styles.historyName}>{counterparty?.name ?? 'Unknown'}</Text>
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
        </View>

        <View style={styles.footerCard}>
          <View style={styles.footerMetric}>
            <Text style={styles.footerLabel}>APT price</Text>
            <Text style={styles.footerValue}>
              {aptUsdPrice ? `$${aptUsdPrice.toFixed(2)}` : 'Updating…'}
            </Text>
          </View>
          <View style={styles.footerMetric}>
            <Text style={styles.footerLabel}>Assets tracked</Text>
            <Text style={styles.footerValue}>{assets.length}</Text>
          </View>
          <View style={styles.footerMetric}>
            <Text style={styles.footerLabel}>Friends on Aptos</Text>
            <Text style={styles.footerValue}>{friends.length}</Text>
          </View>
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>History</Text>
          <TouchableOpacity onPress={() => navigation.getParent()?.navigate('History' as never)}>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {recentTransactions.length === 0 ? (
            <Text style={styles.emptyState}>No transactions yet. Send money to a verified friend to get started.</Text>
          ) : (
            recentTransactions.map(transaction => (
              <ListItem
                key={transaction.id}
                title={resolveTransactionLabel(transaction)}
                subtitle={`${timeAgo(transaction.timestamp)} • ${resolveTransactionSubtitle(transaction)}`}
                rightIcon={transaction.type === 'request' ? 'arrow-up-circle' : undefined}
                onPress={() => navigation.navigate('PayRequest', { contact: undefined })}
              />
            ))
          )}
        </View>

        <Button
          title="Send money"
          icon="paper-plane"
          onPress={handleNavigateToSend}
          fullWidth
          loading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

<<<<<<< HEAD
const shorten = (value: string, keep: number = 4) => {
  if (!value) return '';
  return `${value.slice(0, keep)}…${value.slice(-keep)}`;
};

const timeAgo = (timestamp: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `${diffDays}d ago`;
  }
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));
  return `${diffMinutes}m ago`;
=======
const pillColor = (symbol: string): string => {
  switch (symbol) {
    case 'APT':
      return '#000000';
    case 'USDC':
      return '#2775CA';
    case 'USDT':
      return '#26A17B';
    case 'wBTC':
      return '#F7931A';
    default:
      return theme.colors.text.primary;
  }
};

const formatDescription = (type: Transaction['type'], amount: number, asset: string) => {
  if (type === 'send') {
    return `sent $${amount}`;
  }
  if (type === 'receive') {
    return `received $${amount}`;
  }
  return `requested $${amount}`;
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  scrollContent: {
<<<<<<< HEAD
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingBottom: theme.spacing['3xl'],
    gap: theme.spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing['2xl'],
  },
  greeting: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.secondary,
  },
  title: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
  },
  searchBar: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.spacing.dimensions.input.borderRadius,
    paddingHorizontal: theme.spacing.component.input.paddingHorizontal,
    height: theme.spacing.dimensions.input.height,
=======
    paddingBottom: theme.spacing['6xl'],
  },
  sectionSpacing: {
    paddingHorizontal: theme.spacing.screen.horizontal,
    marginBottom: theme.spacing['3xl'],
  },
  searchContainer: {
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
<<<<<<< HEAD
  searchPlaceholder: {
    ...theme.typography.textStyles.input,
    color: theme.colors.text.placeholder,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  bannerCopy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  bannerTitle: {
    ...theme.typography.textStyles.h3,
    color: theme.colors.text.primary,
  },
  bannerSubtitle: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.secondary,
  },
  bannerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...theme.typography.textStyles.h4,
    color: theme.colors.text.primary,
  },
  assetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
    flexWrap: 'wrap',
  },
  assetItem: {
    width: '47%',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.spacing.dimensions.card.borderRadius,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  assetIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetInitials: {
    ...theme.typography.textStyles.bodyMedium,
    color: theme.colors.text.white,
  },
  assetSymbol: {
    ...theme.typography.textStyles.captionMedium,
    color: theme.colors.text.secondary,
  },
  assetBalance: {
    ...theme.typography.textStyles.h4,
    color: theme.colors.text.primary,
  },
  transactionsContainer: {
    gap: theme.spacing.sm,
  },
  emptyState: {
=======
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.md,
    ...theme.typography.textStyles.input,
    color: theme.colors.text.primary,
  },
  heroCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.dimensions.card.borderRadius,
    padding: theme.spacing['2xl'],
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 6,
  },
  heroTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: theme.spacing.lg,
  },
  heroTitle: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
  },
  heroSubtitle: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.sm,
  },
  heroImage: {
    width: 140,
    height: 120,
    borderRadius: theme.spacing.borderRadius.lg,
  },
  paginationDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing['2xl'],
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.border.light,
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: theme.colors.text.primary,
    width: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
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
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assetItem: {
    alignItems: 'center',
    flex: 1,
  },
  assetIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  assetSymbol: {
    color: theme.colors.text.white,
    fontWeight: '700',
    fontSize: 16,
  },
  assetLabel: {
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.secondary,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderColor: theme.colors.background.card,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  footerCard: {
    marginTop: theme.spacing['3xl'],
    marginHorizontal: theme.spacing.screen.horizontal,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.borderRadius.xl,
    paddingVertical: theme.spacing['2xl'],
    paddingHorizontal: theme.spacing['2xl'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 4,
  },
  footerMetric: {
    flex: 1,
  },
  footerLabel: {
    ...theme.typography.textStyles.captionMedium,
    color: theme.colors.text.tertiary,
    marginBottom: 6,
  },
  footerValue: {
    ...theme.typography.textStyles.bodyMedium,
    color: theme.colors.text.primary,
  },
});

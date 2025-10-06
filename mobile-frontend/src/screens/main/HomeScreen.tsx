import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { Button, Card, ListItem, Avatar } from '../../components';
import { theme } from '../../constants';

export const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();

  // Mock data - in real app, this would come from your state management
  const assets = [
    { symbol: 'APT', name: 'Aptos', balance: 2405, value: 4.51, change: '+12%' },
    { symbol: 'USDC', name: 'USD Coin', balance: 1000, value: 0.9997, change: '-4%' },
    { symbol: 'USDT', name: 'Tether', balance: 500, value: 1.00, change: '+9%' },
    { symbol: 'wBTC', name: 'Wrapped Bitcoin', balance: 0.1, value: 115000, change: '+33%' },
  ];

  const recentTransactions = [
    {
      id: '1',
      name: 'Sherry',
      time: '1d',
      description: 'successfully sent $45',
      type: 'sent' as const,
    },
    {
      id: '2',
      name: 'Eric',
      time: '1d',
      description: 'requested $230',
      type: 'request' as const,
    },
    {
      id: '3',
      name: 'Luna',
      time: '2d',
      description: 'sent you $102',
      type: 'received' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pesto</Text>
          <TouchableOpacity onPress={logout}>
            <Avatar name={user?.name} size="small" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={theme.colors.text.tertiary} />
            <Text style={styles.searchPlaceholder}>Search</Text>
          </View>
        </View>

        {/* Promotional Banner */}
        <Card>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Pesto</Text>
            <View style={styles.bannerImage}>
              <Ionicons name="leaf" size={40} color={theme.colors.primary.green} />
            </View>
          </View>
        </Card>

        {/* Your Assets Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your assets</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </View>
          
          <View style={styles.assetsGrid}>
            {assets.map((asset, index) => (
              <View key={index} style={styles.assetItem}>
                <View style={[styles.assetIcon, { backgroundColor: theme.colors.crypto[asset.symbol.toLowerCase() as keyof typeof theme.colors.crypto] || theme.colors.primary.green }]}>
                  <Text style={styles.assetIconText}>{asset.symbol[0]}</Text>
                </View>
                <Text style={styles.assetSymbol}>{asset.symbol}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* History Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>History</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </View>
          
          {recentTransactions.map((transaction) => (
            <ListItem
              key={transaction.id}
              title={transaction.name}
              subtitle={`${transaction.time} • ${transaction.description}`}
              avatar={`https://ui-avatars.com/api/?name=${transaction.name}&background=2ECC71&color=fff`}
              rightIcon={transaction.type === 'request' ? 'send' : undefined}
              onPress={() => {
                // Navigate to transaction detail or handle action
                console.log('Transaction pressed:', transaction.id);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingVertical: theme.spacing.lg,
  },
  headerTitle: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.screen.horizontal,
    marginBottom: theme.spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.spacing.dimensions.input.borderRadius,
    paddingHorizontal: theme.spacing.lg,
    height: theme.spacing.dimensions.input.height,
  },
  searchPlaceholder: {
    ...theme.typography.textStyles.input,
    color: theme.colors.text.placeholder,
    marginLeft: theme.spacing.md,
  },
  banner: {
    marginHorizontal: theme.spacing.screen.horizontal,
    marginBottom: theme.spacing['2xl'],
    height: 120,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  bannerTitle: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
  },
  bannerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: theme.spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screen.horizontal,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.textStyles.h3,
    color: theme.colors.text.primary,
  },
  assetsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.screen.horizontal,
  },
  assetItem: {
    alignItems: 'center',
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  assetIconText: {
    color: theme.colors.text.white,
    fontWeight: '600',
    fontSize: 18,
  },
  assetSymbol: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.tertiary,
  },
});


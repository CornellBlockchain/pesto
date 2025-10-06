import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './useAuth';
import { MockDatabase, DemoAssetSummary, DemoPromoCard, DemoSpotlightAsset } from '../services/db/mockDb';
import { AptosFriend, Asset, Contact, Transaction } from '../types';

interface DemoDataContextType {
  friends: AptosFriend[];
  contacts: Contact[];
  transactions: Transaction[];
  assets: Asset[];
  assetSummary: DemoAssetSummary | null;
  promoCards: DemoPromoCard[];
  spotlightAssets: DemoSpotlightAsset[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

interface DemoDataProviderProps {
  children: ReactNode;
}

export const DemoDataProvider: React.FC<DemoDataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<AptosFriend[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetSummary, setAssetSummary] = useState<DemoAssetSummary | null>(null);
  const [promoCards, setPromoCards] = useState<DemoPromoCard[]>([]);
  const [spotlightAssets, setSpotlightAssets] = useState<DemoSpotlightAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDemoData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const [friendList, contactList, transactionList, assetList, summary, cards, spotlight] = await Promise.all([
        MockDatabase.getFriendsForUser(user.id),
        MockDatabase.getContactsForUser(user.id),
        MockDatabase.getTransactionsForUser(user.id),
        MockDatabase.getAssetsForUser(user.id),
        MockDatabase.getAssetSummaryForUser(user.id),
        MockDatabase.getPromoCardsForUser(user.id),
        MockDatabase.getSpotlightAssetsForUser(user.id),
      ]);

      setFriends(friendList);
      setContacts(contactList);
      setTransactions(transactionList);
      setAssets(assetList);
      setAssetSummary(summary ?? null);
      setPromoCards(cards);
      setSpotlightAssets(spotlight);
    } catch (dbError) {
      console.error('Failed to load demo data:', dbError);
      setError('Unable to load demo data');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadDemoData();
  }, [loadDemoData]);

  const value: DemoDataContextType = {
    friends,
    contacts,
    transactions,
    assets,
    assetSummary,
    promoCards,
    spotlightAssets,
    isLoading,
    error,
    refresh: loadDemoData,
  };

  return (
    <DemoDataContext.Provider value={value}>
      {children}
    </DemoDataContext.Provider>
  );
};

export const useDemoData = (): DemoDataContextType => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
};

export type { DemoAssetSummary, DemoPromoCard, DemoSpotlightAsset };

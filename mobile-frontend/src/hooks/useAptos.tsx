import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { aptosService } from '../services/aptos/AptosService';
import type { Account } from '../services/aptos/AptosService';
import { Asset, Transaction, AptosFriend } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContacts } from './useContacts';

const getAccountPrivateKeyHex = (acct: Account): string | null => {
  const maybe = acct as { privateKey?: { toString: () => string } };
  if (maybe.privateKey && typeof maybe.privateKey.toString === 'function') {
    return maybe.privateKey.toString();
  }
  return null;
};

interface AptosContextType {
  account: Account | null;
  assets: Asset[];
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  
  // Account methods
  generateAccount: () => Account;
  createAccountFromPrivateKey: (privateKey: string) => Account;
  setAccount: (account: Account) => void;
  
  // Asset methods
  refreshAssets: () => Promise<void>;
  getAssetBalance: (coinType: string) => Promise<number>;
  
  // Transaction methods
  refreshTransactions: () => Promise<void>;
  sendMoney: (friend: AptosFriend, amount: number, message?: string) => Promise<string>;
  getTransaction: (hash: string) => Promise<any>;
  
  // Utility methods
  isValidAddress: (address: string) => boolean;
  canSendToAddress: (address: string) => boolean;
}

const AptosContext = createContext<AptosContextType | undefined>(undefined);

interface AptosProviderProps {
  children: ReactNode;
}

export const AptosProvider: React.FC<AptosProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { canSendMoney, getFriendByAddress } = useContacts();

  useEffect(() => {
    loadStoredAccount();
  }, []);

  useEffect(() => {
    if (account) {
      refreshAssets();
      refreshTransactions();
    }
  }, [account]);

  const loadStoredAccount = async () => {
    try {
      const storedAccount = await AsyncStorage.getItem('aptosAccount');
      if (storedAccount) {
        const accountData = JSON.parse(storedAccount);
        const restoredAccount = aptosService.createAccountFromPrivateKey(accountData.privateKey);
        setAccount(restoredAccount);
      }
    } catch (error) {
      console.error('Error loading stored account:', error);
    }
  };

  const storeAccount = async (account: Account) => {
    try {
      const privateKey = getAccountPrivateKeyHex(account);
      if (!privateKey) {
        console.warn('Unable to persist Aptos account: private key not accessible');
        return;
      }

      const accountData = {
        privateKey,
        address: account.accountAddress.toString(),
      };
      await AsyncStorage.setItem('aptosAccount', JSON.stringify(accountData));
    } catch (error) {
      console.error('Error storing account:', error);
    }
  };

  const generateAccount = (): Account => {
    const newAccount = aptosService.generateAccount();
    setAccount(newAccount);
    storeAccount(newAccount);
    return newAccount;
  };

  const createAccountFromPrivateKey = (privateKey: string): Account => {
    const newAccount = aptosService.createAccountFromPrivateKey(privateKey);
    setAccount(newAccount);
    storeAccount(newAccount);
    return newAccount;
  };

  const setAccountData = (newAccount: Account) => {
    setAccount(newAccount);
    storeAccount(newAccount);
  };

  const refreshAssets = async () => {
    if (!account) return;

    try {
      setIsLoading(true);
      setError(null);

      const resources = await aptosService.getAccountResources(account.accountAddress.toString());
      
      const assetList: Asset[] = [];
      
      // Add APT (native token)
      const aptBalance = await aptosService.getAccountBalance(account.accountAddress.toString());
      if (aptBalance > 0) {
        assetList.push({
          id: 'apt',
          symbol: 'APT',
          name: 'Aptos',
          icon: 'apt',
          balance: aptBalance / 100000000, // Convert from octas
          value: 4.51, // This should come from a price API
          change24h: 0.12,
          changePercent: 12,
          decimals: 8,
        });
      }

      // Add other tokens from resources
      for (const resource of resources) {
        if (resource.type.includes('0x1::coin::CoinStore')) {
          const coinType = resource.type.match(/<(.+)>/)?.[1];
          if (coinType && coinType !== '0x1::aptos_coin::AptosCoin') {
            const balance = (resource.data as any).coin.value;
            if (parseInt(balance) > 0) {
              // Extract token info from coin type
              const tokenInfo = extractTokenInfo(coinType);
              assetList.push({
                id: tokenInfo.symbol.toLowerCase(),
                symbol: tokenInfo.symbol,
                name: tokenInfo.name,
                icon: tokenInfo.symbol.toLowerCase(),
                balance: parseInt(balance) / Math.pow(10, tokenInfo.decimals),
                value: 1, // This should come from a price API
                change24h: 0,
                changePercent: 0,
                aptosAddress: coinType,
                decimals: tokenInfo.decimals,
              });
            }
          }
        }
      }

      setAssets(assetList);
    } catch (error) {
      console.error('Error refreshing assets:', error);
      setError('Failed to load assets');
    } finally {
      setIsLoading(false);
    }
  };

  const getAssetBalance = async (coinType: string): Promise<number> => {
    if (!account) return 0;
    
    try {
      const balance = await aptosService.getAccountBalance(account.accountAddress.toString(), coinType);
      return balance;
    } catch (error) {
      console.error('Error getting asset balance:', error);
      return 0;
    }
  };

  const refreshTransactions = async () => {
    if (!account) return;

    try {
      setIsLoading(true);
      setError(null);

      const aptosTransactions = await aptosService.getAccountTransactions(
        account.accountAddress.toString(),
        25
      );

      const transactionList: Transaction[] = aptosTransactions
        .filter((tx: any) => tx?.payload && tx?.payload?.type === 'entry_function_payload')
        .map((tx: any) => {
          const [recipient, rawAmount] = Array.isArray(tx.payload.arguments)
            ? tx.payload.arguments
            : [undefined, 0];

          const amountOctas = Number(rawAmount ?? 0);
          const amountApt = amountOctas / 100000000;
          const senderAddress = (tx.sender || '').toLowerCase();
          const accountAddress = account.accountAddress.toString().toLowerCase();
          const isSender = senderAddress === accountAddress;

          return {
            id: tx.hash ?? `${tx.version}`,
            type: isSender ? 'send' : 'receive',
            amount: amountApt,
            asset: 'APT',
            from: tx.sender,
            to: typeof recipient === 'string' ? recipient : '',
            status: tx.success ? 'completed' : 'failed',
            timestamp: new Date(Number(tx.timestamp ?? 0) / 1000),
            hash: tx.hash,
            fee: Number(tx.gas_used ?? 0) * Number(tx.gas_unit_price ?? 0),
          };
        });

      setTransactions(transactionList);
    } catch (error) {
      console.error('Error refreshing transactions:', error);
      setError('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMoney = async (
    friend: AptosFriend,
    amount: number,
    message?: string
  ): Promise<string> => {
    if (!account) {
      throw new Error('No account available');
    }

    try {
      setIsLoading(true);
      setError(null);

      if (!canSendMoney(friend.aptosAddress)) {
        throw new Error('Recipient must be part of your verified network.');
      }

      const resolvedFriend = getFriendByAddress(friend.aptosAddress) ?? friend;
      const amountInOctas = Math.round(amount * 100000000);

      if (amountInOctas <= 0) {
        throw new Error('Amount must be greater than zero.');
      }

      const transaction = await aptosService.createSendMoneyTransaction(
        account,
        resolvedFriend,
        amountInOctas,
        message
      );

      const hash = await aptosService.executeTransaction(account, transaction);
      
      // Refresh data after successful transaction
      await Promise.all([refreshAssets(), refreshTransactions()]);
      
      return hash;
    } catch (error) {
      console.error('Error sending money:', error);
      setError('Failed to send money');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getTransaction = async (hash: string): Promise<any> => {
    try {
      return await aptosService.getTransaction(hash);
    } catch (error) {
      console.error('Error getting transaction:', error);
      throw error;
    }
  };

  const isValidAddress = (address: string): boolean => {
    return aptosService.isValidAddress(address);
  };

  const canSendToAddress = (address: string): boolean => {
    return canSendMoney(address);
  };

  const value: AptosContextType = {
    account,
    assets,
    transactions,
    isLoading,
    error,
    generateAccount,
    createAccountFromPrivateKey,
    setAccount: setAccountData,
    refreshAssets,
    getAssetBalance,
    refreshTransactions,
    sendMoney,
    getTransaction,
    isValidAddress,
    canSendToAddress,
  };

  return (
    <AptosContext.Provider value={value}>
      {children}
    </AptosContext.Provider>
  );
};

export const useAptos = (): AptosContextType => {
  const context = useContext(AptosContext);
  if (context === undefined) {
    throw new Error('useAptos must be used within an AptosProvider');
  }
  return context;
};

// Helper function to extract token info from coin type
function extractTokenInfo(coinType: string): { symbol: string; name: string; decimals: number } {
  // This is a simplified version - in a real app, you'd have a registry of known tokens
  const parts = coinType.split('::');
  const moduleName = parts[1] || 'Unknown';
  
  // Common token patterns
  if (coinType.includes('usdc')) {
    return { symbol: 'USDC', name: 'USD Coin', decimals: 6 };
  } else if (coinType.includes('usdt')) {
    return { symbol: 'USDT', name: 'Tether', decimals: 6 };
  } else if (coinType.includes('wbtc')) {
    return { symbol: 'wBTC', name: 'Wrapped Bitcoin', decimals: 8 };
  }
  
  // Default fallback
  return {
    symbol: moduleName.toUpperCase(),
    name: moduleName,
    decimals: 8,
  };
}

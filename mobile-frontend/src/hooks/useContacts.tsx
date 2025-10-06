import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AptosFriend, Contact } from '../types';
import { aptosService } from '../services/aptos/AptosService';

interface ContactsContextType {
  friends: AptosFriend[];
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
  
  // Friend methods
  addFriend: (friend: Omit<AptosFriend, 'id' | 'createdAt' | 'totalTransactions'>) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
  updateFriend: (friendId: string, updates: Partial<AptosFriend>) => Promise<void>;
  getFriendByAddress: (address: string) => AptosFriend | undefined;
  
  // Contact methods
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  removeContact: (contactId: string) => Promise<void>;
  updateContact: (contactId: string, updates: Partial<Contact>) => Promise<void>;
  
  // Utility methods
  searchContacts: (query: string) => Contact[];
  searchFriends: (query: string) => AptosFriend[];
  isFriend: (address: string) => boolean;
  canSendMoney: (address: string) => boolean;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

interface ContactsProviderProps {
  children: ReactNode;
}

export const ContactsProvider: React.FC<ContactsProviderProps> = ({ children }) => {
  const [friends, setFriends] = useState<AptosFriend[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      setIsLoading(true);
      
      const [storedFriends, storedContacts] = await Promise.all([
        AsyncStorage.getItem('aptosFriends'),
        AsyncStorage.getItem('contacts'),
      ]);

      if (storedFriends) {
        const friendsData = JSON.parse(storedFriends);
        setFriends(friendsData.map((friend: any) => ({
          ...friend,
          createdAt: new Date(friend.createdAt),
          lastTransactionDate: friend.lastTransactionDate ? new Date(friend.lastTransactionDate) : undefined,
        })));
      }

      if (storedContacts) {
        const contactsData = JSON.parse(storedContacts);
        setContacts(contactsData.map((contact: any) => ({
          ...contact,
          lastSeen: contact.lastSeen ? new Date(contact.lastSeen) : undefined,
        })));
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
      setError('Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const storeFriends = async (friendsData: AptosFriend[]) => {
    try {
      await AsyncStorage.setItem('aptosFriends', JSON.stringify(friendsData));
    } catch (error) {
      console.error('Error storing friends:', error);
    }
  };

  const storeContacts = async (contactsData: Contact[]) => {
    try {
      await AsyncStorage.setItem('contacts', JSON.stringify(contactsData));
    } catch (error) {
      console.error('Error storing contacts:', error);
    }
  };

  const addFriend = async (friendData: Omit<AptosFriend, 'id' | 'createdAt' | 'totalTransactions'>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate Aptos address
      if (!aptosService.isValidAddress(friendData.aptosAddress)) {
        throw new Error('Invalid Aptos address');
      }

      // Check if friend already exists
      const existingFriend = friends.find(f => f.aptosAddress === friendData.aptosAddress);
      if (existingFriend) {
        throw new Error('Friend already exists');
      }

      const newFriend: AptosFriend = {
        ...friendData,
        id: Date.now().toString(),
        createdAt: new Date(),
        totalTransactions: 0,
      };

      const updatedFriends = [...friends, newFriend];
      setFriends(updatedFriends);
      await storeFriends(updatedFriends);
    } catch (error) {
      console.error('Error adding friend:', error);
      setError('Failed to add friend');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedFriends = friends.filter(f => f.id !== friendId);
      setFriends(updatedFriends);
      await storeFriends(updatedFriends);
    } catch (error) {
      console.error('Error removing friend:', error);
      setError('Failed to remove friend');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFriend = async (friendId: string, updates: Partial<AptosFriend>) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedFriends = friends.map(f => 
        f.id === friendId ? { ...f, ...updates } : f
      );
      setFriends(updatedFriends);
      await storeFriends(updatedFriends);
    } catch (error) {
      console.error('Error updating friend:', error);
      setError('Failed to update friend');
    } finally {
      setIsLoading(false);
    }
  };

  const getFriendByAddress = (address: string): AptosFriend | undefined => {
    return friends.find(f => f.aptosAddress === address);
  };

  const addContact = async (contactData: Omit<Contact, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);

      const newContact: Contact = {
        ...contactData,
        id: Date.now().toString(),
      };

      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      await storeContacts(updatedContacts);
    } catch (error) {
      console.error('Error adding contact:', error);
      setError('Failed to add contact');
    } finally {
      setIsLoading(false);
    }
  };

  const removeContact = async (contactId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedContacts = contacts.filter(c => c.id !== contactId);
      setContacts(updatedContacts);
      await storeContacts(updatedContacts);
    } catch (error) {
      console.error('Error removing contact:', error);
      setError('Failed to remove contact');
    } finally {
      setIsLoading(false);
    }
  };

  const updateContact = async (contactId: string, updates: Partial<Contact>) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedContacts = contacts.map(c => 
        c.id === contactId ? { ...c, ...updates } : c
      );
      setContacts(updatedContacts);
      await storeContacts(updatedContacts);
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to update contact');
    } finally {
      setIsLoading(false);
    }
  };

  const searchContacts = (query: string): Contact[] => {
    const lowercaseQuery = query.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(lowercaseQuery) ||
      contact.username.toLowerCase().includes(lowercaseQuery) ||
      (contact.email && contact.email.toLowerCase().includes(lowercaseQuery))
    );
  };

  const searchFriends = (query: string): AptosFriend[] => {
    const lowercaseQuery = query.toLowerCase();
    return friends.filter(friend => 
      friend.name.toLowerCase().includes(lowercaseQuery) ||
      friend.username.toLowerCase().includes(lowercaseQuery) ||
      friend.aptosAddress.toLowerCase().includes(lowercaseQuery)
    );
  };

  const isFriend = (address: string): boolean => {
    return friends.some(f => f.aptosAddress === address);
  };

  const canSendMoney = (address: string): boolean => {
    // Can send money only to friends or contacts with Aptos addresses
    const friend = friends.find(f => f.aptosAddress === address);
    const contact = contacts.find(c => c.aptosAddress === address);
    
    return !!(friend || (contact && contact.isAptosUser));
  };

  const value: ContactsContextType = {
    friends,
    contacts,
    isLoading,
    error,
    addFriend,
    removeFriend,
    updateFriend,
    getFriendByAddress,
    addContact,
    removeContact,
    updateContact,
    searchContacts,
    searchFriends,
    isFriend,
    canSendMoney,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = (): ContactsContextType => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};


import { AptosFriend, Asset, Contact, Transaction, User } from '../../types';

interface DemoUserRecord extends User {
  password: string;
}

interface DemoAssetSummary {
  totalAssetsUsd: number;
  aptBalance: number;
  aptosPoints: number;
  monthOverMonthChange: number;
  aptosPointsChange: number;
}

interface DemoPromoCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface DemoSpotlightAsset {
  id: string;
  name: string;
  amountUsd: string;
  change: string;
  positive: boolean;
  color: string;
}

interface DemoDatabaseShape {
  users: DemoUserRecord[];
  friends: Record<string, AptosFriend[]>;
  contacts: Record<string, Contact[]>;
  transactions: Record<string, Transaction[]>;
  assets: Record<string, Asset[]>;
  assetSummary: Record<string, DemoAssetSummary>;
  promoCards: Record<string, DemoPromoCard[]>;
  spotlightAssets: Record<string, DemoSpotlightAsset[]>;
}

const sampleUsers: DemoUserRecord[] = [
  {
    id: 'user-ava',
    email: 'ava@pesto.dev',
    password: 'pesto123',
    name: 'Ava Howard',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60',
    aptosAddress: '0x81d41a31fb5d3f827d188511e6fca1ddbed6cfa0ffbd46fa6d84a7adfe59f356',
    createdAt: new Date('2022-04-18T09:15:00Z'),
    updatedAt: new Date('2024-02-01T11:00:00Z'),
  },
  {
    id: 'user-mason',
    email: 'mason@pesto.dev',
    password: 'pesto123',
    name: 'Mason Price',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60',
    aptosAddress: '0x209154f6e735562ff13b963b91588039a162fa95f409c068f917f27b762dfff8',
    createdAt: new Date('2022-05-02T12:25:00Z'),
    updatedAt: new Date('2024-02-01T11:00:00Z'),
  },
];

const sampleFriends: Record<string, AptosFriend[]> = {
  'user-ava': [
    {
      id: 'friend-sherry',
      name: 'Sherry Collins',
      username: '@sherry',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=60',
      aptosAddress: '0xd4e43fa15a4cf475b35f7278f02ae5a694e14fbd7ef2494e39e7978781b3eefe',
      isVerified: true,
      lastTransactionDate: new Date('2024-02-07T16:40:00Z'),
      totalTransactions: 42,
      createdAt: new Date('2022-05-14T10:00:00Z'),
    },
    {
      id: 'friend-eric',
      name: 'Eric Ma',
      username: '@nebulanomad',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60',
      aptosAddress: '0xf16cdebe221b819504c96014b81b0903fd345c3c066415a30ec75148358426dc',
      isVerified: true,
      lastTransactionDate: new Date('2024-02-05T12:20:00Z'),
      totalTransactions: 31,
      createdAt: new Date('2021-11-04T08:30:00Z'),
    },
    {
      id: 'friend-luna',
      name: 'Luna Ortiz',
      username: '@luna',
      avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=60',
      aptosAddress: '0x6c8a3474cb49202515d121fea0f3217d303e41f6bdc43e615f1cd90855118089',
      isVerified: true,
      lastTransactionDate: new Date('2024-02-02T18:05:00Z'),
      totalTransactions: 28,
      createdAt: new Date('2022-02-22T14:45:00Z'),
    },
    {
      id: 'friend-jamal',
      name: 'Jamal Rivers',
      username: '@shadowstar',
      avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=60',
      aptosAddress: '0x4cf01e6c54a8ec918bf1b5666ffa26dcea3dc8044bdf011a58df1aeae9756fa5',
      isVerified: false,
      lastTransactionDate: new Date('2024-01-30T10:10:00Z'),
      totalTransactions: 19,
      createdAt: new Date('2023-03-12T09:10:00Z'),
    },
  ],
};

const sampleContacts: Record<string, Contact[]> = {
  'user-ava': sampleFriends['user-ava'].map(friend => ({
    id: `contact-${friend.id}`,
    name: friend.name,
    username: friend.username,
    avatar: friend.avatar,
    aptosAddress: friend.aptosAddress,
    email: `${friend.username.replace('@', '')}@pesto.dev`,
    phone: '+1 (415) 555-01' + friend.id.slice(-2),
    isAptosUser: true,
    isFriend: true,
    lastSeen: new Date('2024-02-07T18:20:00Z'),
  })),
};

const sampleTransactions: Record<string, Transaction[]> = {
  'user-ava': [
    {
      id: 'txn-1001',
      type: 'send',
      amount: 45,
      asset: 'APT',
      from: sampleUsers[0].aptosAddress!,
      to: sampleFriends['user-ava'][0].aptosAddress,
      toUser: sampleFriends['user-ava'][0],
      status: 'completed',
      message: 'Dinner at Nopalito',
      timestamp: new Date('2024-02-07T16:40:00Z'),
      hash: '0x8d4f644d2a5995b5ea847f79cf6f2aa8d4417b42d3f72681a42059eb7e4f718c',
      fee: 0.0004,
    },
    {
      id: 'txn-1002',
      type: 'request',
      amount: 230,
      asset: 'APT',
      from: sampleFriends['user-ava'][1].aptosAddress,
      to: sampleUsers[0].aptosAddress!,
      fromUser: sampleFriends['user-ava'][1],
      status: 'pending',
      timestamp: new Date('2024-02-06T11:20:00Z'),
      hash: '0x6f3052b967f1d4591d67a64f6a0dc5374096a984a5dd09a67b082b96b02e58f1',
      fee: 0.0003,
    },
    {
      id: 'txn-1003',
      type: 'receive',
      amount: 102,
      asset: 'USDC',
      from: sampleFriends['user-ava'][2].aptosAddress,
      to: sampleUsers[0].aptosAddress!,
      fromUser: sampleFriends['user-ava'][2],
      status: 'completed',
      message: 'Thanks for the tickets!',
      timestamp: new Date('2024-02-04T19:15:00Z'),
      hash: '0xa9ffb84768412c5f7d6c33fce3236729098a3d6cf8ab97d5de4a28a1c9c22b3e',
      fee: 0.0005,
    },
    {
      id: 'txn-1004',
      type: 'send',
      amount: 45,
      asset: 'APT',
      from: sampleUsers[0].aptosAddress!,
      to: sampleFriends['user-ava'][0].aptosAddress,
      toUser: sampleFriends['user-ava'][0],
      status: 'completed',
      timestamp: new Date('2024-01-30T09:45:00Z'),
      hash: '0xbc4fbaa3b9e58fd764045701a4bcf82272ae60c61279c6a5e3a1d44e2e783c98',
      fee: 0.0004,
    },
  ],
};

const sampleAssets: Record<string, Asset[]> = {
  'user-ava': [
    {
      id: 'apt',
      symbol: 'APT',
      name: 'Aptos',
      icon: 'apt',
      balance: 2405,
      value: 4.51,
      change24h: 115.24,
      changePercent: 12,
      decimals: 8,
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      icon: 'usdc',
      balance: 1000,
      value: 1,
      change24h: -4.11,
      changePercent: -4,
      decimals: 6,
    },
    {
      id: 'usdt',
      symbol: 'USDT',
      name: 'Tether',
      icon: 'usdt',
      balance: 500,
      value: 1,
      change24h: 45.0,
      changePercent: 9,
      decimals: 6,
    },
    {
      id: 'wbtc',
      symbol: 'wBTC',
      name: 'Wrapped Bitcoin',
      icon: 'wbtc',
      balance: 0.1,
      value: 115000,
      change24h: 3789,
      changePercent: 33,
      decimals: 8,
    },
  ],
};

const sampleAssetSummary: Record<string, DemoAssetSummary> = {
  'user-ava': {
    totalAssetsUsd: 45678.9,
    aptBalance: 2405,
    aptosPoints: 2045,
    monthOverMonthChange: 0.20,
    aptosPointsChange: 0.33,
  },
};

const samplePromoCards: Record<string, DemoPromoCard[]> = {
  'user-ava': [
    {
      id: 'promo-pear',
      title: 'Pesto',
      subtitle: 'Fresh picks, just in time',
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=600&q=60',
    },
    {
      id: 'promo-seasonal',
      title: 'Seasonal bundles',
      subtitle: 'Save 15% on curated baskets',
      image: 'https://images.unsplash.com/photo-1484981137419-0c1a8f9c3760?auto=format&fit=crop&w=600&q=60',
    },
  ],
};

const sampleSpotlightAssets: Record<string, DemoSpotlightAsset[]> = {
  'user-ava': [
    {
      id: 'wbtc-info',
      name: 'Wrapped Bitcoin - WBTC',
      amountUsd: '$115,000',
      change: '+33% month over month',
      positive: true,
      color: '#F7931A',
    },
    {
      id: 'apt-info',
      name: 'Aptos - APT',
      amountUsd: '$4.51',
      change: '+12% month over month',
      positive: true,
      color: '#000000',
    },
    {
      id: 'usdc-info',
      name: 'USDC',
      amountUsd: '$0.9997',
      change: '-4% month over month',
      positive: false,
      color: '#2775CA',
    },
    {
      id: 'usdt-info',
      name: 'Tether - USDT',
      amountUsd: '$1.00',
      change: '+9% month over month',
      positive: true,
      color: '#26A17B',
    },
    {
      id: 'kapt-info',
      name: 'Kofi Aptos - KAPT',
      amountUsd: '$4.47',
      change: '+3% month over month',
      positive: true,
      color: '#2ECC71',
    },
    {
      id: 'amapt-info',
      name: 'Amnis Aptos - AMAPT',
      amountUsd: '$4.44',
      change: '+4% month over month',
      positive: true,
      color: '#2775CA',
    },
  ],
};

const db: DemoDatabaseShape = {
  users: sampleUsers,
  friends: sampleFriends,
  contacts: sampleContacts,
  transactions: sampleTransactions,
  assets: sampleAssets,
  assetSummary: sampleAssetSummary,
  promoCards: samplePromoCards,
  spotlightAssets: sampleSpotlightAssets,
};

export const MockDatabase = {
  async findUserByEmail(email: string): Promise<DemoUserRecord | undefined> {
    return db.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  },

  async getDefaultUser(): Promise<DemoUserRecord> {
    return db.users[0];
  },

  async getFriendsForUser(userId: string): Promise<AptosFriend[]> {
    return db.friends[userId] || [];
  },

  async getContactsForUser(userId: string): Promise<Contact[]> {
    return db.contacts[userId] || [];
  },

  async getTransactionsForUser(userId: string): Promise<Transaction[]> {
    return db.transactions[userId] || [];
  },

  async getAssetsForUser(userId: string): Promise<Asset[]> {
    return db.assets[userId] || [];
  },

  async getAssetSummaryForUser(userId: string): Promise<DemoAssetSummary | undefined> {
    return db.assetSummary[userId];
  },

  async getPromoCardsForUser(userId: string): Promise<DemoPromoCard[]> {
    return db.promoCards[userId] || [];
  },

  async getSpotlightAssetsForUser(userId: string): Promise<DemoSpotlightAsset[]> {
    return db.spotlightAssets[userId] || [];
  },
};

export type { DemoAssetSummary, DemoPromoCard, DemoSpotlightAsset, DemoUserRecord };

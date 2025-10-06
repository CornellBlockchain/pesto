/**
 * Main type definitions for the Pesto remittance app
 */

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  aptosAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Aptos Friend/Contact Types
export interface AptosFriend {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  aptosAddress: string;
  isVerified: boolean;
  lastTransactionDate?: Date;
  totalTransactions: number;
  createdAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  aptosAddress?: string;
  email?: string;
  phone?: string;
  isAptosUser: boolean;
  isFriend: boolean;
  lastSeen?: Date;
}

// Asset and Transaction Types
export interface Asset {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  value: number;
  change24h: number;
  changePercent: number;
  aptosAddress?: string;
  decimals: number;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'request';
  amount: number;
  asset: string;
  from: string;
  to: string;
  fromUser?: AptosFriend;
  toUser?: AptosFriend;
  status: 'pending' | 'completed' | 'failed';
  message?: string;
  timestamp: Date;
  hash?: string;
  fee?: number;
}

export interface TransactionRequest {
  id: string;
  from: AptosFriend;
  to: AptosFriend;
  amount: number;
  asset: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Assets: undefined;
  History: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  PayRequest: { contact?: AptosFriend };
  SendMoney: { contact?: AptosFriend; amount?: number };
  RequestMoney: { contact?: AptosFriend; amount?: number };
};

export type AssetsStackParamList = {
  AssetsScreen: undefined;
  AssetDetail: { asset: Asset };
  AddAsset: undefined;
};

export type HistoryStackParamList = {
  HistoryScreen: undefined;
  TransactionDetail: { transaction: Transaction };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  Settings: undefined;
  Friends: undefined;
  AddFriend: undefined;
  FriendDetail: { friend: AptosFriend };
  EditProfile: undefined;
};

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  label?: string;
  required?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  padding?: number;
  margin?: number;
  borderRadius?: number;
  backgroundColor?: string;
  shadow?: boolean;
  onPress?: () => void;
}

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
  avatar?: string;
  badge?: string | number;
  showChevron?: boolean;
}

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  animationType?: 'slide' | 'fade' | 'none';
}

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SendMoneyForm {
  recipient: AptosFriend | string;
  amount: number;
  asset: string;
  message?: string;
}

export interface RequestMoneyForm {
  requester: AptosFriend | string;
  amount: number;
  asset: string;
  message?: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Configuration Types
export interface AppConfig {
  aptosNetwork: 'mainnet' | 'testnet' | 'devnet';
  apiBaseUrl: string;
  googleClientId: string;
  enableBiometrics: boolean;
  enableNotifications: boolean;
}


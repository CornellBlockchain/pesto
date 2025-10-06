import { AptosFriend } from '../../types';

/**
 * Lightweight Aptos service tailored for the Expo demo build.
 *
 * The service focuses on read-only interactions against the public
 * Aptos fullnode API so that we can surface live-chain data inside
 * the portfolio screens without pulling in the heavy JS SDK.
 */
export class Account {
  public accountAddress: string;
  public privateKey: string;

  constructor(accountAddress: string, privateKey: string) {
    this.accountAddress = accountAddress;
    this.privateKey = privateKey;
  }

  static generate(): Account {
    const address = '0x' + Math.random().toString(16).substring(2, 66).padEnd(64, '0');
    const privateKey = '0x' + Math.random().toString(16).substring(2, 66).padEnd(64, '0');
    return new Account(address, privateKey);
  }

  static fromPrivateKey({ privateKey }: { privateKey: string }): Account {
    const address = '0x' + Math.random().toString(16).substring(2, 66).padEnd(64, '0');
    return new Account(address, privateKey);
  }
}

interface CoinInfo {
  symbol: string;
  name: string;
  decimals: number;
  supply?: string;
}

interface NetworkInfo {
  chain_id: number;
  epoch: string;
  ledger_version: string;
  ledger_timestamp: string;
  block_height: string;
  git_hash?: string;
}

export class AptosService {
  private static instance: AptosService;
  private currentAccount: Account | null = null;
  private readonly baseUrl = 'https://fullnode.mainnet.aptoslabs.com/v1';

  private constructor() {}

  public static getInstance(): AptosService {
    if (!AptosService.instance) {
      AptosService.instance = new AptosService();
    }
    return AptosService.instance;
  }

  /**
   * Simple fetch helper with consistent error handling.
   */
  private async request<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...init,
    });

    if (response.status === 404) {
      throw Object.assign(new Error('Resource not found'), { status: 404 });
    }

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Aptos request failed (${response.status}): ${message}`);
    }

    return response.json() as Promise<T>;
  }

  public generateAccount(): Account {
    const account = Account.generate();
    this.currentAccount = account;
    return account;
  }

  public createAccountFromPrivateKey(privateKey: string): Account {
    const account = Account.fromPrivateKey({ privateKey });
    this.currentAccount = account;
    return account;
  }

  public getCurrentAccount(): Account | null {
    return this.currentAccount;
  }

  public setCurrentAccount(account: Account): void {
    this.currentAccount = account;
  }

  public async getAccountBalance(
    accountAddress: string,
    coinType: string = '0x1::aptos_coin::AptosCoin'
  ): Promise<number> {
    try {
      const resourceType = encodeURIComponent(`0x1::coin::CoinStore<${coinType}>`);
      const data = await this.request<{ data: { coin: { value: string } } }>(
        `/accounts/${accountAddress}/resource/${resourceType}`
      );
      const rawValue = Number(data?.data?.coin?.value ?? 0);
      return Number.isNaN(rawValue) ? 0 : rawValue;
    } catch (error: any) {
      if (error?.status === 404) {
        return 0;
      }
      console.error('Error fetching account balance:', error);
      return 0;
    }
  }

  public async getAccountResources(accountAddress: string): Promise<any[]> {
    try {
      return await this.request<any[]>(`/accounts/${accountAddress}/resources?limit=200`);
    } catch (error: any) {
      if (error?.status === 404) {
        return [];
      }
      console.error('Error fetching account resources:', error);
      return [];
    }
  }

  public async getAccountTransactions(accountAddress: string, limit = 25): Promise<any[]> {
    try {
      return await this.request<any[]>(
        `/accounts/${accountAddress}/transactions?limit=${limit}`
      );
    } catch (error: any) {
      if (error?.status === 404) {
        return [];
      }
      console.error('Error fetching account transactions:', error);
      return [];
    }
  }

  public async getTransaction(hash: string): Promise<any> {
    return this.request(`/transactions/by_hash/${hash}`);
  }

  public isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{64}$/.test(address);
  }

  public async getAccountInfo(accountAddress: string): Promise<any> {
    return this.request(`/accounts/${accountAddress}`);
  }

  public async estimateGas(): Promise<number> {
    try {
      const data = await this.request<{ gas_estimate?: string }>(`/estimate_gas_price`);
      return Number(data?.gas_estimate ?? 1000);
    } catch (error) {
      console.error('Error estimating gas:', error);
      return 1000;
    }
  }

  public async getNetworkInfo(): Promise<NetworkInfo> {
    return this.request<NetworkInfo>('');
  }

  public async getCoinInfo(coinType: string): Promise<CoinInfo | null> {
    try {
      const resourceType = encodeURIComponent(`0x1::coin::CoinInfo<${coinType}>`);
      const response = await this.request<{ data: { name: string; symbol: string; decimals: number; supply?: any } }>(
        `/accounts/0x1/resource/${resourceType}`
      );
      const { name, symbol, decimals, supply } = response.data;
      return { name, symbol, decimals, supply: supply ? JSON.stringify(supply) : undefined };
    } catch (error) {
      console.error('Error fetching coin info:', error);
      return null;
    }
  }

  public getFriendAddress(friend: AptosFriend): string {
    return friend.aptosAddress;
  }

  public async createSendMoneyTransaction(
    _fromAccount: Account,
    _friend: AptosFriend,
    _amount: number,
    _message?: string
  ): Promise<any> {
    throw new Error('Sending transactions is disabled in the Expo demo build.');
  }

  public async executeTransaction(): Promise<string> {
    throw new Error('Executing transactions is disabled in the Expo demo build.');
  }
}

export const aptosService = AptosService.getInstance();

export type { CoinInfo, NetworkInfo };

<<<<<<< HEAD
import {
  Account as AptosAccount,
  AccountAddress,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  MoveStructId,
  Network,
  PendingTransactionResponse,
  TransactionResponse,
} from '@aptos-labs/ts-sdk';
import { appConfig } from '../../config/app';
import { AptosFriend } from '../../types';

type SupportedNetwork = 'mainnet' | 'testnet' | 'devnet';
=======
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
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0

const NETWORK_MAP: Record<SupportedNetwork, Network> = {
  mainnet: Network.MAINNET,
  testnet: Network.TESTNET,
  devnet: Network.DEVNET,
};

<<<<<<< HEAD
type BuiltTransaction = Awaited<ReturnType<Aptos['transaction']['build']['simple']>>;

const APTOS_COIN: MoveStructId = '0x1::aptos_coin::AptosCoin';
=======
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
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0

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
<<<<<<< HEAD
  private client: Aptos;
  private currentAccount: AptosAccount | null = null;

  private constructor() {
    const configuredNetwork = (appConfig.aptos.network ?? 'testnet') as SupportedNetwork;
    const network = NETWORK_MAP[configuredNetwork] ?? Network.TESTNET;
    const config = new AptosConfig({
      network,
      fullnode: appConfig.aptos.nodeUrl,
      faucet: appConfig.aptos.faucetUrl,
    });

    this.client = new Aptos(config);
  }
=======
  private currentAccount: Account | null = null;
  private readonly baseUrl = 'https://fullnode.mainnet.aptoslabs.com/v1';

  private constructor() {}
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0

  public static getInstance(): AptosService {
    if (!AptosService.instance) {
      AptosService.instance = new AptosService();
    }
    return AptosService.instance;
  }

<<<<<<< HEAD
  public get clientInstance(): Aptos {
    return this.client;
  }

  public generateAccount(): AptosAccount {
    const account = AptosAccount.generate();
=======
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
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    this.currentAccount = account;
    return account;
  }

<<<<<<< HEAD
  public createAccountFromPrivateKey(privateKey: string): AptosAccount {
    const normalizedKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    const account = AptosAccount.fromPrivateKey({ privateKey: new Ed25519PrivateKey(normalizedKey) });
=======
  public createAccountFromPrivateKey(privateKey: string): Account {
    const account = Account.fromPrivateKey({ privateKey });
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    this.currentAccount = account;
    return account;
  }

<<<<<<< HEAD
  public getCurrentAccount(): AptosAccount | null {
    return this.currentAccount;
  }

  public setCurrentAccount(account: AptosAccount): void {
=======
  public getCurrentAccount(): Account | null {
    return this.currentAccount;
  }

  public setCurrentAccount(account: Account): void {
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    this.currentAccount = account;
  }

  public async getAccountBalance(
    accountAddress: string,
<<<<<<< HEAD
    coinType: MoveStructId | string = APTOS_COIN
  ): Promise<number> {
    try {
      return await this.client.getAccountCoinAmount({ accountAddress, coinType: coinType as MoveStructId });
    } catch (error) {
      console.error('Error fetching account balance', error);
=======
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
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
      return 0;
    }
  }

  public async getAccountResources(accountAddress: string): Promise<any[]> {
    try {
<<<<<<< HEAD
      return await this.client.getAccountResources({ accountAddress });
    } catch (error) {
      console.error('Error fetching account resources', error);
=======
      return await this.request<any[]>(`/accounts/${accountAddress}/resources?limit=200`);
    } catch (error: any) {
      if (error?.status === 404) {
        return [];
      }
      console.error('Error fetching account resources:', error);
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
      return [];
    }
  }

<<<<<<< HEAD
  public async transferApt(fromAccount: AptosAccount, toAddress: string, amount: number): Promise<string> {
    try {
      const transaction = await this.client.transaction.build.simple({
        sender: fromAccount.accountAddress,
        data: {
          function: '0x1::coin::transfer',
          typeArguments: [APTOS_COIN],
          functionArguments: [toAddress, amount],
        },
      });

      const pending = await this.client.signAndSubmitTransaction({ signer: fromAccount, transaction });
      await this.client.waitForTransaction({ transactionHash: pending.hash });
      return pending.hash;
    } catch (error) {
      console.error('Error transferring APT', error);
      throw error;
    }
  }

  public async getTransaction(hash: string): Promise<TransactionResponse> {
    return this.client.getTransactionByHash({ transactionHash: hash });
  }

  public async getAccountTransactions(accountAddress: string, limit: number = 25): Promise<TransactionResponse[]> {
    return this.client.getAccountTransactions({
      accountAddress,
      options: {
        offset: 0,
        limit,
      },
    });
  }

  public isValidAddress(address: string): boolean {
    return AccountAddress.isValid({ input: address }).valid;
  }

  public async getAccountInfo(accountAddress: string): Promise<any> {
    return this.client.getAccountInfo({ accountAddress });
=======
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
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
  }

  public async estimateGas(): Promise<number> {
    try {
<<<<<<< HEAD
      const estimation = await this.client.getGasPriceEstimation();
      return Number(estimation.gas_estimate);
    } catch (error) {
      console.error('Error estimating gas price', error);
=======
      const data = await this.request<{ gas_estimate?: string }>(`/estimate_gas_price`);
      return Number(data?.gas_estimate ?? 1000);
    } catch (error) {
      console.error('Error estimating gas:', error);
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
      return 1000;
    }
  }

<<<<<<< HEAD
  public async getNetworkInfo(): Promise<any> {
    return this.client.getLedgerInfo();
=======
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
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
  }

  public getFriendAddress(friend: AptosFriend): string {
    return friend.aptosAddress;
  }

<<<<<<< HEAD
  public async createSendMoneyTransaction(fromAccount: AptosAccount, friend: AptosFriend, amount: number, _message?: string) {
    return this.client.transaction.build.simple({
      sender: fromAccount.accountAddress,
      data: {
        function: '0x1::coin::transfer',
        typeArguments: [APTOS_COIN],
        functionArguments: [friend.aptosAddress, amount],
      },
    });
  }

  public async executeTransaction(signer: AptosAccount, transaction: BuiltTransaction): Promise<string> {
    const pending: PendingTransactionResponse = await this.client.signAndSubmitTransaction({ signer, transaction });
    await this.client.waitForTransaction({ transactionHash: pending.hash });
    return pending.hash;
=======
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
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
  }
}

export const aptosService = AptosService.getInstance();

<<<<<<< HEAD
export type Account = AptosAccount;
=======
export type { CoinInfo, NetworkInfo };
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0

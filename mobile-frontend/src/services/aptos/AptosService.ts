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

const NETWORK_MAP: Record<SupportedNetwork, Network> = {
  mainnet: Network.MAINNET,
  testnet: Network.TESTNET,
  devnet: Network.DEVNET,
};

type BuiltTransaction = Awaited<ReturnType<Aptos['transaction']['build']['simple']>>;

const APTOS_COIN: MoveStructId = '0x1::aptos_coin::AptosCoin';

export class AptosService {
  private static instance: AptosService;
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

  public static getInstance(): AptosService {
    if (!AptosService.instance) {
      AptosService.instance = new AptosService();
    }
    return AptosService.instance;
  }

  public get clientInstance(): Aptos {
    return this.client;
  }

  public generateAccount(): AptosAccount {
    const account = AptosAccount.generate();
    this.currentAccount = account;
    return account;
  }

  public createAccountFromPrivateKey(privateKey: string): AptosAccount {
    const normalizedKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    const account = AptosAccount.fromPrivateKey({ privateKey: new Ed25519PrivateKey(normalizedKey) });
    this.currentAccount = account;
    return account;
  }

  public getCurrentAccount(): AptosAccount | null {
    return this.currentAccount;
  }

  public setCurrentAccount(account: AptosAccount): void {
    this.currentAccount = account;
  }

  public async getAccountBalance(
    accountAddress: string,
    coinType: MoveStructId | string = APTOS_COIN
  ): Promise<number> {
    try {
      return await this.client.getAccountCoinAmount({ accountAddress, coinType: coinType as MoveStructId });
    } catch (error) {
      console.error('Error fetching account balance', error);
      return 0;
    }
  }

  public async getAccountResources(accountAddress: string): Promise<any[]> {
    try {
      return await this.client.getAccountResources({ accountAddress });
    } catch (error) {
      console.error('Error fetching account resources', error);
      return [];
    }
  }

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
  }

  public async estimateGas(): Promise<number> {
    try {
      const estimation = await this.client.getGasPriceEstimation();
      return Number(estimation.gas_estimate);
    } catch (error) {
      console.error('Error estimating gas price', error);
      return 1000;
    }
  }

  public async getNetworkInfo(): Promise<any> {
    return this.client.getLedgerInfo();
  }

  public getFriendAddress(friend: AptosFriend): string {
    return friend.aptosAddress;
  }

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
  }
}

export const aptosService = AptosService.getInstance();

export type Account = AptosAccount;

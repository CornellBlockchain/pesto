// Simplified Aptos service for React Native compatibility
import { AptosFriend, Asset, Transaction } from '../../types';

// Mock Aptos Account class for React Native compatibility
export class Account {
  public accountAddress: string;
  public privateKey: string;

  constructor(accountAddress: string, privateKey: string) {
    this.accountAddress = accountAddress;
    this.privateKey = privateKey;
  }

  static generate(): Account {
    // Generate a mock account for development
    const address = '0x' + Math.random().toString(16).substr(2, 64);
    const privateKey = '0x' + Math.random().toString(16).substr(2, 64);
    return new Account(address, privateKey);
  }

  static fromPrivateKey({ privateKey }: { privateKey: string }): Account {
    // Generate a mock address from private key
    const address = '0x' + Math.random().toString(16).substr(2, 64);
    return new Account(address, privateKey);
  }
}

export class AptosService {
  private static instance: AptosService;
  private currentAccount: Account | null = null;

  private constructor() {
    // Simplified constructor for React Native compatibility
  }

  public static getInstance(): AptosService {
    if (!AptosService.instance) {
      AptosService.instance = new AptosService();
    }
    return AptosService.instance;
  }

  /**
   * Generate a new Aptos account
   */
  public generateAccount(): Account {
    const account = Account.generate();
    this.currentAccount = account;
    return account;
  }

  /**
   * Create account from private key
   */
  public createAccountFromPrivateKey(privateKey: string): Account {
    const account = Account.fromPrivateKey({ privateKey });
    this.currentAccount = account;
    return account;
  }

  /**
   * Get current account
   */
  public getCurrentAccount(): Account | null {
    return this.currentAccount;
  }

  /**
   * Set current account
   */
  public setCurrentAccount(account: Account): void {
    this.currentAccount = account;
  }

  /**
   * Get account balance for a specific coin type (mock implementation)
   */
  public async getAccountBalance(accountAddress: string, coinType: string = '0x1::aptos_coin::AptosCoin'): Promise<number> {
    try {
      // Mock balance for development
      return Math.floor(Math.random() * 10000) * 100000000; // Random balance in octas
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return 0;
    }
  }

  /**
   * Get account resources (all tokens/assets) - mock implementation
   */
  public async getAccountResources(accountAddress: string): Promise<any[]> {
    try {
      // Mock resources for development
      return [
        {
          type: '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
          data: {
            coin: {
              value: Math.floor(Math.random() * 10000) * 100000000
            }
          }
        }
      ];
    } catch (error) {
      console.error('Error fetching account resources:', error);
      return [];
    }
  }

  /**
   * Transfer APT tokens (mock implementation)
   */
  public async transferApt(
    fromAccount: Account,
    toAddress: string,
    amount: number
  ): Promise<string> {
    try {
      // Mock transaction hash
      const transactionHash = '0x' + Math.random().toString(16).substr(2, 64);
      console.log(`Mock transfer: ${amount} APT from ${fromAccount.accountAddress} to ${toAddress}`);
      return transactionHash;
    } catch (error) {
      console.error('Error transferring APT:', error);
      throw error;
    }
  }

  /**
   * Get transaction details (mock implementation)
   */
  public async getTransaction(hash: string): Promise<any> {
    try {
      // Mock transaction data
      return {
        hash,
        success: true,
        timestamp: Date.now().toString(),
        sender: '0x' + Math.random().toString(16).substr(2, 64),
        payload: {
          type: 'entry_function_payload',
          function: '0x1::coin::transfer',
          arguments: ['0x' + Math.random().toString(16).substr(2, 64), '100000000']
        }
      };
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  /**
   * Get account transactions (mock implementation)
   */
  public async getAccountTransactions(
    accountAddress: string,
    limit: number = 25
  ): Promise<any[]> {
    try {
      // Mock transaction list
      const transactions = [];
      for (let i = 0; i < Math.min(limit, 5); i++) {
        transactions.push({
          hash: '0x' + Math.random().toString(16).substr(2, 64),
          success: true,
          timestamp: (Date.now() - i * 86400000).toString(), // One day apart
          sender: accountAddress,
          payload: {
            type: 'entry_function_payload',
            function: '0x1::coin::transfer',
            arguments: ['0x' + Math.random().toString(16).substr(2, 64), '100000000']
          }
        });
      }
      return transactions;
    } catch (error) {
      console.error('Error fetching account transactions:', error);
      return [];
    }
  }

  /**
   * Check if an address is a valid Aptos address
   */
  public isValidAddress(address: string): boolean {
    try {
      // Basic validation - Aptos addresses are 64 characters long and start with 0x
      return /^0x[a-fA-F0-9]{64}$/.test(address);
    } catch {
      return false;
    }
  }

  /**
   * Get account info (mock implementation)
   */
  public async getAccountInfo(accountAddress: string): Promise<any> {
    try {
      // Mock account info
      return {
        sequence_number: '0',
        authentication_key: accountAddress,
        created_at: Date.now().toString()
      };
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }

  /**
   * Estimate gas for a transaction (mock implementation)
   */
  public async estimateGas(transaction: any): Promise<number> {
    try {
      // Mock gas estimate
      return 1000;
    } catch (error) {
      console.error('Error estimating gas:', error);
      return 1000; // Default fallback
    }
  }

  /**
   * Get network info (mock implementation)
   */
  public async getNetworkInfo(): Promise<any> {
    try {
      // Mock network info
      return {
        chain_id: 2,
        epoch: '1',
        ledger_version: '1',
        ledger_timestamp: Date.now().toString()
      };
    } catch (error) {
      console.error('Error fetching network info:', error);
      throw error;
    }
  }

  /**
   * Convert AptosFriend to Aptos account address
   */
  public getFriendAddress(friend: AptosFriend): string {
    return friend.aptosAddress;
  }

  /**
   * Create a transaction for sending money to a friend (mock implementation)
   */
  public async createSendMoneyTransaction(
    fromAccount: Account,
    friend: AptosFriend,
    amount: number,
    message?: string
  ): Promise<any> {
    try {
      // Mock transaction object
      return {
        sender: fromAccount.accountAddress,
        recipient: friend.aptosAddress,
        amount,
        message
      };
    } catch (error) {
      console.error('Error creating send money transaction:', error);
      throw error;
    }
  }

  /**
   * Execute a transaction (mock implementation)
   */
  public async executeTransaction(
    signer: Account,
    transaction: any
  ): Promise<string> {
    try {
      // Mock transaction execution
      const transactionHash = '0x' + Math.random().toString(16).substr(2, 64);
      console.log(`Mock transaction executed: ${transactionHash}`);
      return transactionHash;
    } catch (error) {
      console.error('Error executing transaction:', error);
      throw error;
    }
  }
}

export const aptosService = AptosService.getInstance();


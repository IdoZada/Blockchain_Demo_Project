import SHA256 from 'crypto-js/sha256.js';
import {Transaction} from './transaction.js'
import debug from 'debug'

let full_blockchain;
let counter = 2;
export class FullBlock {
    constructor(index, timestamp, transaction, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
        this.edited = new Date().getTime();
        this.verify = true;
        
        
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString()
    }



    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

    // static convertJsonBlockToObject(json,block){
    //     block = new Block(json.index,json.timestamp,json.transaction,json.previousHash)
    //     block.nonce = json.nonce
    //     block.hash = json.hash
    //     return block;
    // }

    static generateTime(){
        this.edited = new Date().getTime();
    }
}


export class FullBlockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100.0;
    }

    createGenesisBlock() {
        return new FullBlock(1, "03/07/2021",this.pendingTransactions , "0000000000000000000000000000000000000000000000000000000000000000")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }


    /**
   * Takes all the pending transactions, puts them in a Block and starts the
   * mining process. It also adds a transaction to send the mining reward to
   * the given address.
   *
   * @param {string} miningRewardAddress
   */
  minePendingTransactions(miningRewardAddress) {
    
    const block = new FullBlock(counter++,"23/7/21", this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    debug('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
  }

  /**
   * Add a new transaction to the list of pending transactions (to be added
   * next time the mining process starts). This verifies that the given
   * transaction is properly signed.
   *
   * @param {Transaction} transaction
   */
   addTransaction(transaction) {

    this.pendingTransactions.push(transaction);
    debug('transaction added: %s', transaction);
  }

   /**
   * Returns the balance of a given wallet address.
   *
   * @param {string} address
   * @returns {number} The balance of the wallet
   */
    getBalanceOfAddress(address) {
        let balance = 0;
    
        for (const block of this.chain) {
          for (const trans of block.transactions) {
            if (trans.fromAddress === address) {
              balance -= trans.amount;
            }
    
            if (trans.toAddress === address) {
              balance += trans.amount;
            }
          }
        }
    
        debug('getBalanceOfAdrees: %s', balance);
        return balance;
    }
    
    /**
     * Returns a list of all transactions that happened
     * to and from the given wallet address.
     *
     * @param  {string} address
     * @return {Transaction[]}
    */
    getAllTransactionsForWallet(address) {
    const txs = [];

    for (const block of this.chain) {
        for (const tx of block.transactions) {
        if (tx.fromAddress === address || tx.toAddress === address) {
            txs.push(tx);
        }
        }
    }

    debug('get transactions for wallet count: %s', txs.length);
    return txs;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }

    static convertJsonFullBlockchainToObject(json,blockchain,final){
        full_blockchain = new FullBlockchain()
        let block;
        for(let i = 0; i < json.length; i++){
                if(i == 0){
                    block = full_blockchain.chain[0]
                }else{
                    block = new FullBlock(2, "","","");
                }
                
                block.index = json[i].index;
                block.timestamp = json[i].timestamp;
                block.transaction = [];
                for(let j = 0 ; j < json[i].transaction.length;j++){
                    var transaction = new Transaction(json[i].transaction[j].fromAddress,json[i].transaction[j].toAddress,json[i].transaction[j].amount);
                    transaction.edited = json[i].transaction[j].edited;
                    if(final){
                        transaction.signature =  json[i].transaction[j].signature;
                    }
                    
                    block.transaction.push(transaction);
                }
                block.previousHash = json[i].previousHash;
                block.hash = json[i].hash;
                block.verify = json[i].verify;
                block.nonce = json[i].nonce;
                block.edited = json[i].edited;
                
                if(i != 0){
                    full_blockchain.chain.push(block);
                }else{
                    full_blockchain.chain[0] = block;
                }
        }
        return full_blockchain;
    }

    static editTime(index){
        this.chain[index].generateTime();
    }
}
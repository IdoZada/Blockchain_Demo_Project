import SHA256 from 'crypto-js/sha256.js';


let blockchain;
export class Block {
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

    static convertJsonBlockToObject(json,block){
        block = new Block(json.index,json.timestamp,json.transaction,json.previousHash)
        block.nonce = json.nonce
        block.hash = json.hash
        return block;
    }

    static generateTime(){
        this.edited = new Date().getTime();
    }
}


export class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(1, "03/07/2021", "",  "0000000000000000000000000000000000000000000000000000000000000000",0)
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock)
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

    static convertJsonBlockchainToObject(json,blockchain){
        blockchain = new Blockchain()
        console.log(json.length)
        for(let i = 0; i < json.length; i++){
            if(i == 0){
                let first_block = blockchain.getLatestBlock()
                first_block.index = json[0].index;
                first_block.timestamp = json[0].timestamp;
                first_block.transaction = json[0].transaction;
                first_block.previousHash = json[0].previousHash;
                first_block.hash = json[0].hash;
                first_block.verify = json[0].verify;
                first_block.nonce = json[0].nonce;
                first_block.edited = json[0].edited
            }else{
                blockchain.addBlock(new Block(json[i].index,json[i].timestamp,json[i].transaction,json[i].previousHash,json[i].hash,json[i].nonce))
            }

        }
        return blockchain;
    }

    static editTime(index){
        this.chain[index].generateTime();
    }
}
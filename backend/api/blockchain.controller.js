import BlockchainDAO from "../dao/blockchainDAO.js";
import {Block, Blockchain} from '../model/blockchain.js';
import {FullBlockchain} from '../model/trans_blockchain.js'
import {Transaction} from '../model/transaction.js'
let blockchain = null;
let full_blockchain = null
let save_hash = [];
let basic_hash = [];

let save_full_hash = [];
let basic_full_hash = [];

let save_coinbase_hash = [];
let basic_coinbase_hash = [];

let save_final_hash = [];
let basic_final_hash = [];

let key;
let tran;
let coinbase_blockchain = null
let signTransaction;
let final_blockchain = null;
export default class BlockchainController{
    
    
    static apiGetHash(req,res,next){
        let block = new Block(1,"20/07/2021",req.body.text,"")
        let response = {
            hash: block.hash,
        }
        res.json(response)
    }

    static async apiGetBlockchain(req,res){
        const { blockchain_list } = await BlockchainDAO.getBlockchain()
        res.json(blockchain_list[0].chain)
        blockchain = Blockchain.convertJsonBlockchainToObject(JSON.parse(JSON.stringify(blockchain_list[0].chain)),blockchain)
        for(let i = 0 ; i < blockchain.chain.length; i++){
            save_hash.push(blockchain.chain[i].hash)
            basic_hash.push(blockchain.chain[i].hash)
        }
    }

    static async apiGetFullBlockchain(req,res){
        const { full_blockchain_list } = await BlockchainDAO.getFullBlockchain()
        res.json(full_blockchain_list[0].chain)
        full_blockchain = FullBlockchain.convertJsonFullBlockchainToObject(JSON.parse(JSON.stringify(full_blockchain_list[0].chain)),full_blockchain)
        for(let i = 0 ; i < full_blockchain.chain.length; i++){
            save_full_hash.push(full_blockchain.chain[i].hash)
            basic_full_hash.push(full_blockchain.chain[i].hash)
        }
    }

    static async apiGetCoinbaseBlockchain(req,res){
        const { coinbase_blockchain_list } = await BlockchainDAO.getCoinbaseBlockchain()
        res.json(coinbase_blockchain_list[0].chain)
        coinbase_blockchain = FullBlockchain.convertJsonFullBlockchainToObject(JSON.parse(JSON.stringify(coinbase_blockchain_list[0].chain)),coinbase_blockchain)
        for(let i = 0 ; i < coinbase_blockchain.chain.length; i++){
            save_coinbase_hash.push(coinbase_blockchain.chain[i].hash)
            basic_coinbase_hash.push(coinbase_blockchain.chain[i].hash)
        }
    }

    static async apiGetFinalBlockchain(req,res){
        const { final_blockchain_list } = await BlockchainDAO.getFinalBlockchain()
        res.json(final_blockchain_list[0].chain)
        final_blockchain = FullBlockchain.convertJsonFullBlockchainToObject(JSON.parse(JSON.stringify(final_blockchain_list[0].chain)),final_blockchain,"final")
        for(let i = 0 ; i < final_blockchain.chain.length; i++){
            save_final_hash.push(final_blockchain.chain[i].hash)
            basic_final_hash.push(final_blockchain.chain[i].hash)
        }
    }

    static async apiFetchBlock(req,res){
        let json_block = await BlockchainDAO.getBlock()
        res.json(json_block)
        block = Block.convertJsonBlockToObject(JSON.parse(JSON.stringify(json_block)),block);   
    }

    static apiPostBlockchain(req,res,next){
        var verify = false;
        blockchain.chain[req.body.position].index = req.body.block;
        blockchain.chain[req.body.position].transaction = req.body.text;
        
        if(typeof(req.body.text) == "undefined"){
            blockchain.chain[req.body.position].transaction = "";
        }


        if(req.body.mine){
            blockchain.chain[req.body.position].verify = true;
            blockchain.chain[req.body.position].nonce = 0;
            blockchain.chain[req.body.position].hash = blockchain.chain[req.body.position].calculateHash()
            // At the begin of function the the nonce value init to 0  
            blockchain.chain[req.body.position].mineBlock(4)
            save_hash[req.body.position] = blockchain.chain[req.body.position].hash

        }else{
            if(save_hash[req.body.position] == blockchain.chain[req.body.position].calculateHash()){
                blockchain.chain[req.body.position].verify = true;
                verify = true;
            }else{
                blockchain.chain[req.body.position].verify = false;
            }
        }

        blockchain.chain[req.body.position].hash = (req.body.mine ? blockchain.chain[req.body.position].hash : blockchain.chain[req.body.position].calculateHash()) 
        blockchain.chain[req.body.position].edited = new Date().getTime();
        let previousHash = blockchain.chain[req.body.position].hash
        for(let position = req.body.position + 1; position < blockchain.chain.length; position++){
            if(verify){
                blockchain.chain[position].verify = true;
            }else{
                blockchain.chain[position].verify = false;
            }
            blockchain.chain[position].previousHash = previousHash;
            blockchain.chain[position].hash = blockchain.chain[position].calculateHash();
            
            if(blockchain.chain[position].hash == basic_hash[position]){
                blockchain.chain[position].verify = true;
            }
            blockchain.chain[position].edited = new Date().getTime();
            previousHash = blockchain.chain[position].hash;
        }
        
        res.json(blockchain.chain)
    }

    static apiPostFullBlockchain(req,res,next){
        var verify = false;
        full_blockchain.chain[req.body.position].index = req.body.block;
        for(let i = 0; i < req.body.text.length;i++){
            full_blockchain.chain[req.body.position].transaction[i].toAddress = req.body.text[i].toAddress;
            full_blockchain.chain[req.body.position].transaction[i].fromAddress = req.body.text[i].fromAddress;
            full_blockchain.chain[req.body.position].transaction[i].amount = parseFloat(req.body.text[i].amount);
        }

        if(req.body.mine){
            
            full_blockchain.chain[req.body.position].verify = true;
            full_blockchain.chain[req.body.position].nonce = 0;
            full_blockchain.chain[req.body.position].hash = full_blockchain.chain[req.body.position].calculateHash()
            // At the begin of function the the nonce value init to 0  
            full_blockchain.chain[req.body.position].mineBlock(4)
            save_full_hash[req.body.position] = full_blockchain.chain[req.body.position].hash
        
        }else{
            
            if(save_full_hash[req.body.position] == full_blockchain.chain[req.body.position].calculateHash()){
                full_blockchain.chain[req.body.position].verify = true;
                verify = true;
            }else{
                full_blockchain.chain[req.body.position].verify = false;
            }
        }

        full_blockchain.chain[req.body.position].hash = (req.body.mine ? full_blockchain.chain[req.body.position].hash : full_blockchain.chain[req.body.position].calculateHash()) 
        full_blockchain.chain[req.body.position].edited = new Date().getTime();
        let previousHash = full_blockchain.chain[req.body.position].hash
        for(let position = req.body.position + 1; position < full_blockchain.chain.length; position++){
            if(verify){
                full_blockchain.chain[position].verify = true;
            }else{
                full_blockchain.chain[position].verify = false;
            }
            full_blockchain.chain[position].previousHash = previousHash;
            full_blockchain.chain[position].hash = full_blockchain.chain[position].calculateHash();
            
            if(full_blockchain.chain[position].hash == basic_full_hash[position]){
                full_blockchain.chain[position].verify = true;
            }
            full_blockchain.chain[position].edited = new Date().getTime();
            previousHash = full_blockchain.chain[position].hash;
        }
        
        res.json(full_blockchain.chain)
    }

    static apiPostCoinbaseBlockchain(req,res,next){
        var verify = false;
        coinbase_blockchain.chain[req.body.position].index = req.body.block;
        for(let i = 0; i < req.body.text.length;i++){
            coinbase_blockchain.chain[req.body.position].transaction[i].toAddress = req.body.text[i].toAddress;
            coinbase_blockchain.chain[req.body.position].transaction[i].fromAddress = req.body.text[i].fromAddress;
            coinbase_blockchain.chain[req.body.position].transaction[i].amount = parseFloat(req.body.text[i].amount);
        }

        if(req.body.mine){
            
            coinbase_blockchain.chain[req.body.position].verify = true;
            coinbase_blockchain.chain[req.body.position].nonce = 0;
            coinbase_blockchain.chain[req.body.position].hash = coinbase_blockchain.chain[req.body.position].calculateHash()
            // At the begin of function the the nonce value init to 0  
            coinbase_blockchain.chain[req.body.position].mineBlock(4)
            save_coinbase_hash[req.body.position] = coinbase_blockchain.chain[req.body.position].hash
        
        }else{
            if(save_coinbase_hash[req.body.position] == coinbase_blockchain.chain[req.body.position].calculateHash()){
                coinbase_blockchain.chain[req.body.position].verify = true;
                verify = true;
            }else{
                coinbase_blockchain.chain[req.body.position].verify = false;
            }
        }

        coinbase_blockchain.chain[req.body.position].hash = (req.body.mine ? coinbase_blockchain.chain[req.body.position].hash : coinbase_blockchain.chain[req.body.position].calculateHash()) 
        coinbase_blockchain.chain[req.body.position].edited = new Date().getTime();
        let previousHash = coinbase_blockchain.chain[req.body.position].hash
        for(let position = req.body.position + 1; position < coinbase_blockchain.chain.length; position++){
            if(verify){
                coinbase_blockchain.chain[position].verify = true;
            }else{
                coinbase_blockchain.chain[position].verify = false;
            }
            coinbase_blockchain.chain[position].previousHash = previousHash;
            coinbase_blockchain.chain[position].hash = coinbase_blockchain.chain[position].calculateHash();
            
            if(coinbase_blockchain.chain[position].hash == basic_coinbase_hash[position]){
                coinbase_blockchain.chain[position].verify = true;
            }
            coinbase_blockchain.chain[position].edited = new Date().getTime();
            previousHash = coinbase_blockchain.chain[position].hash;
        }
        
        res.json(coinbase_blockchain.chain)
    }

    static apiPostFinalBlockchain(req,res,next){
        var verify = false;
        final_blockchain.chain[req.body.position].index = req.body.block;

        for(let i = 0; i < req.body.text.length;i++){
            final_blockchain.chain[req.body.position].transaction[i].toAddress = req.body.text[i].toAddress;
            final_blockchain.chain[req.body.position].transaction[i].fromAddress = req.body.text[i].fromAddress;
            final_blockchain.chain[req.body.position].transaction[i].amount = parseFloat(req.body.text[i].amount);
            final_blockchain.chain[req.body.position].transaction[i].signature = req.body.text[i].signature;
        }

        if(req.body.mine){
            
            final_blockchain.chain[req.body.position].verify = true;
            final_blockchain.chain[req.body.position].nonce = 0;
            final_blockchain.chain[req.body.position].hash = final_blockchain.chain[req.body.position].calculateHash()
            // At the begin of function the the nonce value init to 0  
            final_blockchain.chain[req.body.position].mineBlock(4)
            save_final_hash[req.body.position] = final_blockchain.chain[req.body.position].hash

        }else{
            if(save_final_hash[req.body.position] == final_blockchain.chain[req.body.position].calculateHash()){
                final_blockchain.chain[req.body.position].verify = true;
                verify = true;
            }else{
                final_blockchain.chain[req.body.position].verify = false;
            }
        }

        final_blockchain.chain[req.body.position].hash = (req.body.mine ? final_blockchain.chain[req.body.position].hash : final_blockchain.chain[req.body.position].calculateHash()) 
        final_blockchain.chain[req.body.position].edited = new Date().getTime();
        let previousHash = final_blockchain.chain[req.body.position].hash
        for(let position = req.body.position + 1; position < final_blockchain.chain.length; position++){
            if(verify){
                final_blockchain.chain[position].verify = true;
            }else{
                final_blockchain.chain[position].verify = false;
            }
            final_blockchain.chain[position].previousHash = previousHash;
            final_blockchain.chain[position].hash = final_blockchain.chain[position].calculateHash();
            
            if(final_blockchain.chain[position].hash == basic_final_hash[position]){
                final_blockchain.chain[position].verify = true;
            }
            final_blockchain.chain[position].edited = new Date().getTime();
            previousHash = final_blockchain.chain[position].hash;
        }
        
        res.json(final_blockchain.chain)
    }

    static async apiGenerateKeyPairsAndUpdateDB(req,res,next){
        key = Transaction.getKeyPairs();

        const response = {
            privateKey: key.getPrivate('hex'),
            publicKey: key.getPublic('hex'),
            edited: new Date().getTime()
        }

        await BlockchainDAO.updateTransaction(response)
        
        res.json(response)
    }

    static async apiGetSignTransaction(req,res){
        tran = new Transaction("","",0);
        signTransaction = await BlockchainDAO.getSignTransaction()
        res.json(signTransaction)
    }

    static apiPostSignedAndVerify(req,res,next){
        if(!req.body.verify){ // sign transaction
            let ec = Transaction.getEllipticCurve();
            let private_key = ec.keyFromPrivate(signTransaction.privateKey,"hex");
            tran.fromAddress = private_key.getPublic("hex");
            tran.toAddress = req.body.text; // Override the toAddress attribute for text massage
            tran.signTransaction(private_key);
            console.log(tran.signature);
            res.json(tran.signature);
        }else { // Check if everything is match
            
            tran.toAddress = req.body.text;
            if(tran.isValid()){
                res.json({verify: true});
            }else{
                res.json({verify: false});
            }

        }
       

    }

    static apiPostSignedTransacted(req,res,next){
        console.log(req.body);

        if(!req.body.verify){ // sign transaction
            let ec = Transaction.getEllipticCurve();
            let private_key = ec.keyFromPrivate(signTransaction.privateKey,"hex");
            tran.fromAddress = private_key.getPublic("hex");
            tran.toAddress = req.body.toAddress; // Override the toAddress attribute for text massage
            tran.amount = req.body.amount;
            tran.signTransaction(private_key);
            console.log(tran.signature);
            res.json(tran.signature);
        }else { // Check if everything is match
            
            tran.toAddress = req.body.toAddress; // Override the toAddress attribute for text massage
            tran.amount = req.body.amount;
            
            if(tran.isValid()){
                res.json({verify: true});
            }else{
                res.json({verify: false});
            }

        }
    }
}
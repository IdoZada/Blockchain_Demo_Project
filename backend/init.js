import { Block, Blockchain } from "../backend/model/blockchain.js";
import { Transaction } from "../backend/model/transaction.js";
import {FullBlock,FullBlockchain} from "../backend/model/trans_blockchain.js"

let blockchain;
let block;
let fullBlockchain;
export default class init{
    
    static createBlockchain(){
        blockchain = new Blockchain()
        blockchain.getLatestBlock().mineBlock(4)
        for(let i = 2; i < 6; i++){
            blockchain.addBlock(new Block(i,"21/7/21","","",0))
        }
        console.log(JSON.stringify(blockchain)) 
        return blockchain;
    }

    static createFullBlockchain(){
        fullBlockchain = new FullBlockchain()
        fullBlockchain.getLatestBlock().transaction = [new Transaction("Zohar","Itzik",100.0),new Transaction("Ester","Yehuda",50.0), new Transaction("Pavitch","Pinhas",50.0)]
        fullBlockchain.getLatestBlock().mineBlock(4)
        fullBlockchain.pendingTransactions = []
        
        fullBlockchain.addTransaction(new Transaction("Roman","Ido",100.0));
        fullBlockchain.addTransaction(new Transaction("Dani","Rony",50.0));
        fullBlockchain.addTransaction(new Transaction("Israel","Moshe",50.0));
        fullBlockchain.minePendingTransactions("address2");

        fullBlockchain.addTransaction(new Transaction("Chen","Ido",100.0));
        fullBlockchain.addTransaction(new Transaction("Roman","Niki",20.0));
        fullBlockchain.addTransaction(new Transaction("David","Moshe",20.0));
        fullBlockchain.addTransaction(new Transaction("Shimon","Eli",40.0));
        fullBlockchain.minePendingTransactions("address3");

        console.log(JSON.stringify(fullBlockchain))

        return fullBlockchain

    }

    static createFullBlockchainCoinbase(){
        fullBlockchain = new FullBlockchain()
        fullBlockchain.pendingTransactions = [new Transaction(null, "Anders",fullBlockchain.miningReward)]
        fullBlockchain.getLatestBlock().transaction = [new Transaction(null, "Anders",fullBlockchain.miningReward)];
        fullBlockchain.getLatestBlock().mineBlock(4);
        // fullBlockchain.pendingTransactions = []

        fullBlockchain.addTransaction(new Transaction("Anders","Sophia",10.0));
        fullBlockchain.addTransaction(new Transaction("Anders","Lucas",20.0));
        fullBlockchain.addTransaction(new Transaction("Anders","Emily",15.0));
        fullBlockchain.addTransaction(new Transaction("Anders","Madison",15.0));
        fullBlockchain.minePendingTransactions("Anders");

        fullBlockchain.addTransaction(new Transaction("Emily","Jackson",10.0));
        fullBlockchain.addTransaction(new Transaction("Madison","Jackson",5.0));
        fullBlockchain.addTransaction(new Transaction("Lucas","Grace",20.0));
        fullBlockchain.minePendingTransactions("Anders");

        fullBlockchain.addTransaction(new Transaction("Jackson","Ryan",15.0));
        fullBlockchain.addTransaction(new Transaction("Emily","Madison",5.0));
        fullBlockchain.addTransaction(new Transaction("Sophia","Jackson",20.0));
        fullBlockchain.minePendingTransactions("Anders");

        console.log(JSON.stringify(fullBlockchain))

        return fullBlockchain
    }

    static createFullBlockchainCoinbaseWithSignature(){
        var andres_keys = Transaction.getKeyPairs("hex");
        var sophia_keys = Transaction.getKeyPairs("hex");
        var lucas_keys = Transaction.getKeyPairs("hex");
        var emily_keys = Transaction.getKeyPairs("hex");
        var madison_keys = Transaction.getKeyPairs("hex");
        var jackson_keys = Transaction.getKeyPairs("hex");
        var grace_keys = Transaction.getKeyPairs("hex");
        var ryan_keys = Transaction.getKeyPairs("hex");
        fullBlockchain = new FullBlockchain()
        fullBlockchain.pendingTransactions = [new Transaction(null, andres_keys.getPublic("hex"),fullBlockchain.miningReward)]
        fullBlockchain.getLatestBlock().transaction = [new Transaction(null, andres_keys.getPublic("hex"),fullBlockchain.miningReward)];
        fullBlockchain.getLatestBlock().mineBlock(4);
        // fullBlockchain.pendingTransactions = []

        let transaction1 = new Transaction(andres_keys.getPublic("hex"),sophia_keys.getPublic("hex"),10.0)
        transaction1.signTransaction(andres_keys);
        let transaction2 = new Transaction(andres_keys.getPublic("hex"),lucas_keys.getPublic("hex"),20.0)
        transaction2.signTransaction(andres_keys);
        let transaction3 = new Transaction(andres_keys.getPublic("hex"),emily_keys.getPublic("hex"),15.0)
        transaction3.signTransaction(andres_keys);
        let transaction4 = new Transaction(andres_keys.getPublic("hex"),madison_keys.getPublic("hex"),15.0)
        transaction4.signTransaction(andres_keys);
        fullBlockchain.addTransaction(transaction1);
        fullBlockchain.addTransaction(transaction2);
        fullBlockchain.addTransaction(transaction3);
        fullBlockchain.addTransaction(transaction4);
        fullBlockchain.minePendingTransactions(andres_keys.getPublic("hex"));

        let transaction5 = new Transaction(emily_keys.getPublic("hex"),jackson_keys.getPublic("hex"),10.0);
        transaction5.signTransaction(emily_keys);
        let transaction6 = new Transaction(madison_keys.getPublic("hex"),jackson_keys.getPublic("hex"),5.0);
        transaction6.signTransaction(madison_keys);
        let transaction7 = new Transaction(lucas_keys.getPublic("hex"),grace_keys.getPublic("hex"),20.0);
        transaction7.signTransaction(lucas_keys);
        fullBlockchain.addTransaction(transaction5);
        fullBlockchain.addTransaction(transaction6);
        fullBlockchain.addTransaction(transaction7);
        fullBlockchain.minePendingTransactions(andres_keys.getPublic("hex"));

        let transaction8 = new Transaction(jackson_keys.getPublic("hex"),ryan_keys.getPublic("hex"),15.0);
        transaction8.signTransaction(jackson_keys);
        let transaction9 = new Transaction(emily_keys.getPublic("hex"),madison_keys.getPublic("hex"),5.0);
        transaction9.signTransaction(emily_keys);
        let transaction10 = new Transaction(sophia_keys.getPublic("hex"),jackson_keys.getPublic("hex"),20.0);
        transaction10.signTransaction(sophia_keys);
        fullBlockchain.addTransaction(transaction8);
        fullBlockchain.addTransaction(transaction9);
        fullBlockchain.addTransaction(transaction10);
        fullBlockchain.minePendingTransactions(andres_keys.getPublic("hex"));

        console.log(JSON.stringify(fullBlockchain))

        return fullBlockchain
    }

    static dataForSignTran(){
        var keys = Transaction.getKeyPairs("hex");
        var toAddressPublicKey = Transaction.getKeyPairs("hex").getPublic("hex");
        var amount = 20

        var data = {
            privateKey: keys.getPrivate("hex"),
            publicKey: keys.getPublic("hex"),
            toAddressPublicKey: toAddressPublicKey,
            amount: amount,
            edited: new Date().getTime()
        }

        console.log(data);

        return data
    }

    static createBlock(){
        block = new Block(1,"21/7/21","","0",0)
        block.mineBlock(4)
        return block;
    }

    static getBlock(){
        return block;
    }

    static getBlockchain(){
        return blockchain;
    }
}
import mongodb from "mongodb"
import init from "../init.js"
const ObjectId = mongodb.ObjectID
let blockchain
let block
let full_blockchain
let signTransaction
let connect;
let coinbase_blockchain;
let final_blockchain;
export default class BlockchainDAO {
    static async injectDB(conn) {
      if (blockchain) {
        return
      }
      try {
        connect = conn
        blockchain = await conn.db(process.env.BLOCKCHAIN_NS).collection("blockchain");
        block = await conn.db(process.env.BLOCKCHAIN_NS).collection("block");
        full_blockchain = await conn.db(process.env.BLOCKCHAIN_NS).collection("full_blockchain");
        coinbase_blockchain = await conn.db(process.env.BLOCKCHAIN_NS).collection("coinbase");
        signTransaction = await conn.db(process.env.BLOCKCHAIN_NS).collection("signTransaction");

        final_blockchain = await conn.db(process.env.BLOCKCHAIN_NS).collection("coinbase_signature");

      } catch (e) {
        console.error(
          `Unable to establish a collection handle in blockchainDAO: ${e}`,
        )
      }
    }

    static async saveBlockchainDB(err, db) {
      if (err) throw err;
      var dbo = db.db(process.env.BLOCKCHAIN_NS);
      var blockchain =  init.createBlockchain()
      dbo.collection("blockchain").insertOne(blockchain, function(err, res) {
        if (err) throw err;
        console.log("blockchain upload to DB");
        db.close();
      });
    }

    static async save(err,db){
      if (err) throw err;
      var dbo = db.db(process.env.BLOCKCHAIN_NS);
      var full_blockchain =  init.createFullBlockchain()
      dbo.collection("full_blockchain").insertOne(full_blockchain, function(err, res) {
        if (err) throw err;
        console.log("full_blockchain upload to DB");
        db.close();
      });
    }

    static async saveCoinbaseBlockchain(err,db){
      if (err) throw err;
      var dbo = db.db(process.env.BLOCKCHAIN_NS);
      var full_blockchain_coin =  init.createFullBlockchainCoinbase()
      dbo.collection("coinbase").insertOne(full_blockchain_coin, function(err, res) {
        if (err) throw err;
        console.log("coinbase upload to DB");
        db.close();
      });
    }

    static async saveCoinbaseBlockchainWithSignature(err,db){
      if (err) throw err;
      var dbo = db.db(process.env.BLOCKCHAIN_NS);
      var full_blockchain_coin_signature =  init.createFullBlockchainCoinbaseWithSignature()
      dbo.collection("coinbase_signature").insertOne(full_blockchain_coin_signature, function(err, res) {
        if (err) throw err;
        console.log("coinbase_signature upload to DB");
        db.close();
      });
    }

    static async saveBlockToDB(err,db){
      if (err) throw err;
      var dbo = db.db(process.env.BLOCKCHAIN_NS);
      let block = init.createBlock()
      dbo.collection("block").insertOne(block,function(err, res) {
        if (err) throw err;
        console.log("block upload to DB");
        db.close();
      });
    }

    static async saveTransaction(err,db){
      if (err) throw err;
      var dbo = db.db(process.env.BLOCKCHAIN_NS);
      let transaction = init.dataForSignTran()
      dbo.collection("signTransaction").insertOne(transaction,function(err, res) {
        if (err) throw err;
        console.log("signTransaction upload to DB");
        db.close();
      });
    }

    static async updateTransaction(data){
      var dbo = connect.db(process.env.BLOCKCHAIN_NS);
      dbo.collection("signTransaction").updateOne({"_id": ObjectId("61059faaec96458978216f4a")},
      {
        $set: {  "privateKey" : data.privateKey,  "publicKey" : data.publicKey, "edited": data.edited},
      }
      )
      
    }


    static async getBlockchain(){
      let blockchain_list;
      try {
        blockchain_list = await blockchain.find().toArray()
        return { blockchain_list}
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return { blockchain: [] }
      }
    }

    static async getFullBlockchain(){
      let full_blockchain_list;
      try {
        full_blockchain_list = await full_blockchain.find().toArray()
        return { full_blockchain_list}
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return { blockchain: [] }
      }
    }

    static async getCoinbaseBlockchain(){
      let coinbase_blockchain_list;
      try {
        coinbase_blockchain_list = await coinbase_blockchain.find().toArray()
        console.log(coinbase_blockchain_list)
        return {coinbase_blockchain_list}
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return {blockchain: []}
      }
    }

    static async getFinalBlockchain(){
      let final_blockchain_list;
      try {
        final_blockchain_list = await final_blockchain.find().toArray()
        console.log(final_blockchain_list)
        return {final_blockchain_list}
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return {blockchain: []}
      }
    }

    static async getSignTransaction(){
      let transaction;
      try {
        transaction = await signTransaction.find().toArray()
        console.log(transaction[0])
        return transaction[0]
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return transaction[0]
      }
    }

    static async getBlock(){
      let block_local;
      try {
        block_local = await block.find().toArray()
        // console.log(block_local[0])
        return block_local[0]
      } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return {block_local} 
      }
    }
}
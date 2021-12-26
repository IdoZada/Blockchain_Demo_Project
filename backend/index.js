import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import BlockchainDAO from "./dao/blockchainDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.BLOCKCHAIN_DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParse: true }
  )
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async (client,err) => {
    // await BlockchainDAO.saveCoinbaseBlockchainWithSignature(err,client)
    // await BlockchainDAO.saveCoinbaseBlockchain(err,client)
    // await BlockchainDAO.saveTransaction(err,client);
    // await BlockchainDAO.save(err,client);
    // await BlockchainDAO.saveBlockchainDB(err, client)
    // await BlockchainDAO.saveBlockToDB(err,client)
    await BlockchainDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })
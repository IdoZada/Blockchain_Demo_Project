import express from "express"
import BlockchainCtrl from "./blockchain.controller.js"
const router = express.Router()

// Part one 
router.route("/hash").post(BlockchainCtrl.apiGetHash)
router.route("/block").get(BlockchainCtrl.apiFetchBlock)
router.route("/blockchain").get(BlockchainCtrl.apiGetBlockchain).post(BlockchainCtrl.apiPostBlockchain)
router.route("/token").get(BlockchainCtrl.apiGetFullBlockchain).post(BlockchainCtrl.apiPostFullBlockchain)


// Part two
router.route("/keys").get(BlockchainCtrl.apiGenerateKeyPairsAndUpdateDB)
router.route("/signatures").get(BlockchainCtrl.apiGetSignTransaction).post(BlockchainCtrl.apiPostSignedAndVerify)
router.route("/transaction").get(BlockchainCtrl.apiGetSignTransaction).post(BlockchainCtrl.apiPostSignedTransacted)
router.route("/coinbase").get(BlockchainCtrl.apiGetCoinbaseBlockchain).post(BlockchainCtrl.apiPostCoinbaseBlockchain)
router.route("/finalblockchain").get(BlockchainCtrl.apiGetFinalBlockchain).post(BlockchainCtrl.apiPostFinalBlockchain)


export default router


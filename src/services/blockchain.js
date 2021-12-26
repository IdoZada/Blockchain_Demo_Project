import http from "../http-common";

class BlockchainDataService {
  getAll() {
    return http.get("/blockchain");
  }

  getBlock(){
    return http.get("/block"); 
  }

  getAllFullBlockchain(){
    return http.get("/token");
  }

  getAllCoinbaseBlockchain(){
    return http.get("/coinbase");
  }

  getFinalBlockchain(){
    return http.get("/finalblockchain");
  }

  changeTransactionInSpecificBlock(data){
    return http.post("/token",data)
  }

  changeCoinbaseTransactionInSpecificBlock(data){
    return http.post("/coinbase",data)
  }

  changeFinalBlockchain(data){
    return http.post("/finalblockchain",data)
  }

  generateKeyPairsAndUpdateDB(){
    return http.get("/keys");
  }

  getAllSignTransaction(path){
    return http.get(path)
  }

  signTransaction(path,data){
    return http.post(path,data);
  }

  verifyTransaction(path,data){
    return http.post(path,data);
  }

  createHash(data) {
    return http.post("/hash", data);
  }

  changeBlock(data) {
    return http.post("/block", data);
  }

  changeSpecificBlock(data){
    return http.post("/blockchain",data)
  }
}

export default new BlockchainDataService();
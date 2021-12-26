import React from "react";
import BlockchainScreen from "./blockchain.js";
import "../bootstrap-horizon.css"


const CoinbaseScreen = () => {
 
    return (
        <div class="container">
            <div class="col" >
                <h1>Coinbase Transactions</h1>
                <br></br>
                {["A","B","C"].map((peer,index) => {
                    return (
                        <div className="col-xs-7" key={index}>
                            <h4>Peer: {peer}</h4> 
                            <BlockchainScreen token="true" coinbase="true" final="false"></BlockchainScreen>
                            <br></br>
                        </div>
                        
                        )
                })};
            </div>
        </div>
    );
};
    
export default CoinbaseScreen;
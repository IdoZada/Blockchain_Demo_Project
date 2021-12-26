import React from "react";
import BlockchainScreen from "./blockchain.js";
import "../bootstrap-horizon.css"


const FinalBlockchainScreen = () => {
 
    return (
        <div class="container">
            <div class="col" >
                <h1>Final Blockchain</h1>
                <br></br>
                {["A","B","C"].map((peer,index) => {
                    return (
                        <div className="col-xs-7" key={index}>
                            <h4>Peer: {peer}</h4> 
                            <BlockchainScreen token="true" coinbase="true" final="true"></BlockchainScreen>
                            <br></br>
                        </div>
                        
                        )
                })};
            </div>
        </div>
    );
};
    
export default FinalBlockchainScreen;
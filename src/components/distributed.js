import React from "react";
import BlockchainScreen from "./blockchain.js";
import "../bootstrap-horizon.css"


const DistributedScreen = () => {
 
    return (
        <div class="container">
            <div class="col" >
                <h1>Distributed Blockchain</h1>
                <br></br>
                {["A","B","C"].map((peer,index) => {
                    return (
                        <div className="col-xs-7" key={index}>
                            <h4>Peer: {peer}</h4> 
                            <BlockchainScreen token="false" coinbase="false" final="false"></BlockchainScreen>
                            <br></br>
                        </div>
                        
                        )
                })};
            </div>
        </div>
    );
};
    
export default DistributedScreen;



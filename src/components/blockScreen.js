import React from "react";
import "../bootstrap-horizon.css"
import BlockchainScreen from "./blockchain.js";


const DisplayBlockScreen = () => {
    
    return (
        <div class="container">
            <div class="col" >
                <div className="col-xs-7">
                    <BlockchainScreen flag = "true" token="false" title="Block"></BlockchainScreen>
                </div>
            </div>
        </div>
    );
};
    
export default DisplayBlockScreen;



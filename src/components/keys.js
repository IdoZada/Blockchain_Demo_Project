import React, { useState } from "react";
import BlockchainDataService from "../services/blockchain.js"

const KeysScreen = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const handleRandomClicked = event => {
    BlockchainDataService.generateKeyPairsAndUpdateDB()
          .then(response => {
            setPrivateKey(response.data.privateKey)
            setPublicKey(response.data.publicKey)
          })
          .catch(e => {
          console.log(e);
          });
  }

  
  return (
    <div class="container">
	    <div class="card">
		    <h4 class="card-header">Public / Private Key Pairs</h4>
			    <div class="card-body">
				    <form class="form-horizontal">
                        <div className="form-group">
                            <label class="control-label">Private Key</label>
                            <div class="input-group">
                            <input type="text" className="form-control" id="privateKey" value={privateKey} required name="privateKey" />
								<span class="input-group-btn">
									<button class="btn btn-secondary" id="randomButton" type="button" onClick={handleRandomClicked}>Random</button>
								</span>
                            </div>
                        </div>
                        <div className="form-group">
                                <label class="control-label">Public Key</label>
                                <input type="text" className="form-control" id="publicKey" required value={publicKey} disabled="" name="publicKey" />
                        </div>
			        </form>
		        </div>
	    </div>
    </div>
    );
};
  
export default KeysScreen;
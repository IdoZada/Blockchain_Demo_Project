import React, { useState } from "react";
import BlockchainDataService from "../services/blockchain.js"

const HashScreen = () => {
  const [hash, setHash] = useState("");
  const [text, setText] = useState("");

  const handleInputChange = event => {  
    setText(event.target.value);
    var data = {
      text: event.target.value,
    }
    BlockchainDataService.createHash(data)
      .then(response => {
      setHash(response.data.hash);
      console.log(response.data.hash);
      })
      .catch(e => {
      console.log(e);
      });
  };

  
  return (
      <div>
        <h1>SHA256 Hash</h1>
        <div className="card">
        <div className="card-body">
        <div className="form">
            <div>
              <div className="form-group">
              <label>Data:</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={text}
                  onChange={handleInputChange}
                  name="text"
                />
              <label>Hash:</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={hash}
                  name="text"
                />
              </div>
            </div>
        </div>
         
        </div> 
        </div>
          
    </div>
    );
};
  
export default HashScreen;
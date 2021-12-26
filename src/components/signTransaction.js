import React, { useState ,useEffect} from "react";
import BlockchainDataService from "../services/blockchain.js"
import BlockTransaction from "./block-transaction.js";

const SignTransactionScreen = (title) => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [selectedTab, setSelectedTab] = useState("true");
//   const [selectedVerifyTab, setSelectedVerifyTab] = useState("false")
//   const [selectedSignTab, setSelectedSignTab] = useState("true")
  const [amount, setAmount] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [text, setText] = useState("");
  const [signature, setSignature] = useState("");
  const [verify, setVerify] = useState("false");
//   const [edited, setEdited] = useState("");

  const path = !title.title.localeCompare("Transaction") ? "/transaction" : "/signatures";
  
  useEffect(() => {
     retrieveAllSignTransactionData();
  },{})

  const retrieveAllSignTransactionData = () => {
    BlockchainDataService.getAllSignTransaction(path).then(response => {
        // setEdited(response.data.edited)
        setPrivateKey(response.data.privateKey);
        setPublicKey(response.data.publicKey);
        setAmount(response.data.amount);
        setToAddress(response.data.toAddressPublicKey)
        setFromAddress(response.data.publicKey);
    }).catch(e => {
        console.log(e);
    });
};


  const handleClickTab = event => {

      if(selectedTab){
        setSelectedTab(false)
      }else{
        setSelectedTab(true) 
      }
  }

  const onClickSignTab = event => {
    // setSelectedSignTab(true)
    // setSelectedVerifyTab(false)
  }
  const onClickVerifyTab = event => {
    // setSelectedSignTab(false)
    // setSelectedVerifyTab(true)
    }

  const handleTransactionChange = (data) => {
      setAmount(data.amount);
      setFromAddress(data.fromAddress);
      setToAddress(data.toAddress);
  }

  const handleMessageChange = event => {
        setText(event.target.value)
  }

  const handleSignClick = event =>{
    var data;  
    if(!title.title.localeCompare("Transaction")){
        data = {
            fromAddress: fromAddress,
            toAddress: toAddress,
            amount: amount,
            verify: false
        }
      }else{
        data = {
            text: text,
            verify: false
        } 
      }
    
      BlockchainDataService.signTransaction(path,data).then(response => {
        setSignature(response.data)
    }).catch(e => {
        console.log(e);
    });
  }

  const handleVerifyClick= event => {
    var data;  
    if(!title.title.localeCompare("Transaction")){
        data = {
            fromAddress: fromAddress,
            toAddress: toAddress,
            amount: amount,
            verify: true
        }
      }else{
        data = {
            text: text,
            verify: true
        } 
      }

    BlockchainDataService.verifyTransaction(path,data).then(response => {
        setVerify(response.data.verify)
    }).catch(e => {
        console.log(e);
    });
  }


  
  return (
        <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>{title.title}</h4>
                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class={selectedTab ? "nav-link active" : "nav-link"} id="sign-tab" data-bs-toggle="tab" data-bs-target="#sign" type="button" role="tab" aria-controls="sign" aria-selected={selectedTab} onClick={handleClickTab}>Sign</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class={!selectedTab ? "nav-link active" : "nav-link"} id="verify-tab" data-bs-toggle="tab" data-bs-target="#verify" type="button" role="tab" aria-controls="verify" aria-selected={!selectedTab} onClick={handleClickTab}>Verify</button>
                    </li>
                </ul>
            </div>
            
            <div class={!selectedTab && verify ? "card-body well well-success" : "card-body"} id="card">
                <div class="tab-content" id="myTabContent">
                    {selectedTab ? <div class="tab-pane fade show active" id="sign" role="tabpanel" aria-labelledby="sign-tab">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="control-label" for="data">Message</label>
                                {title.title.localeCompare("Transaction") === 0 ? <BlockTransaction props={{edited: "465465465456", amount: amount,fromAddress:fromAddress,toAddress:toAddress}} handleTransactionChange={(dataTransaction) => { handleTransactionChange(dataTransaction) }}></BlockTransaction>
                                 : <textarea class="form-control" id="sign-message" rows="5" aria-label="Message" value={text} onChange={handleMessageChange}></textarea>}
                                
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="data">Private Key</label>
                                <input class="form-control" id="privateKey" type="text" value={privateKey}/>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-block btn-primary" id="sign-button" type="button" onClick={handleSignClick}>Sign</button>
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="data">Message Signature</label>
                                <input class="form-control" id="sign-signature" disabled="" value={signature}/>
                            </div>
                        </form>
                    </div> : <div class="tab-pane fade show active" id="verify" role="tabpanel" aria-labelledby="verify-tab">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="control-label" for="data">Message</label>
                                {title.title.localeCompare("Transaction") === 0 ? <BlockTransaction props={{edited:"344236493", amount: amount,fromAddress:fromAddress,toAddress:toAddress}} handleTransactionChange={(dataTransaction) => { handleTransactionChange(dataTransaction) }}></BlockTransaction> 
                                : <textarea class="form-control" id="verify-message" rows="5" aria-label="Message" value={text} onChange={handleMessageChange}></textarea>}
                            </div>
                            {!title.title.localeCompare("Signature") ? <div class="form-group">
                            
                            <label class="control-label" for="data">Public Key</label>
                            <input class="form-control" id="publicKey" value={publicKey}/>
                        </div>: <div></div>}
                            {/* <div class="form-group">
                            
                                <label class="control-label" for="data">Public Key</label>
                                <input class="form-control" id="publicKey" value={publicKey}/>
                            </div> */}
                            <div class="form-group">
                                <label class="control-label" for="data">Signature</label>
                                <input class="form-control" id="verify-signature" value={signature} />
                            </div>
                            <div class="form-group">
                                <button class="btn btn-block btn-primary" id="verify-button" type="button" onClick={handleVerifyClick}>Verify</button>
                            </div>
                        </form>
                    </div>}
                    
                    
                </div>
            </div>
        </div>
    </div>);
};
  
export default SignTransactionScreen;
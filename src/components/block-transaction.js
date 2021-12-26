import React, { useState } from "react";
import "../sucess.css"
const BlockTransaction = ({props,coinbase,final,index,handleTransactionChange}) => {

    const [edited, setEdited] = useState(props.edited)
    // const [verify, setVerify] = useState(props.verify)
    const [fromAddress, setFromAddress] = useState(props.fromAddress)
    const [toAddress, setToAddress] = useState(props.toAddress)
    const [amount, setAmount] = useState(props.amount);
    const [signature, setSignature] = useState(props.signature);


    if(props.edited !== edited){
        setEdited(props.edited);
        // setVerify(props.verify)
        setFromAddress(props.fromAddress);
        setToAddress(props.toAddress);
        setAmount(props.amount);
        setSignature(props.signature);
    }

    const handleAmountChange = event => {

        setAmount(event.target.value);
        //   setVerify(false)
        var data = {
            position: index,
            amount: event.target.value,
            fromAddress: fromAddress,
            toAddress: toAddress,
            signature: signature
        }
        
        handleTransactionChange(data)
    };

    const handleFromAddressChange = event => {
        setFromAddress(event.target.value);
        // setVerify(false)
        var data = {
          position: index,
          amount: amount,
          fromAddress: event.target.value,
          toAddress: toAddress,
          signature: signature
        }
        
        handleTransactionChange(data)
    };
      const handleToAddressChange = event => {  
        setToAddress(event.target.value);
        // setVerify(false)
        var data = {
            position: index,
            amount: amount,
            fromAddress: fromAddress,
            toAddress: event.target.value,
            signature: signature
        }
        
        handleTransactionChange(data)
    };

    const handleSignatureChange = event => {  
        setSignature(event.target.value);
        // setVerify(false)
        var data = {
            position: index,
            amount: amount,
            fromAddress: fromAddress,
            toAddress: toAddress,
            signature: event.target.value
        }
        
        handleTransactionChange(data)
    };
    
    return (
      <div>
        {coinbase === "true" && index === 0 ? <label for="exampleFormControlTextarea1">Coinbase:</label> : <label for="exampleFormControlTextarea1">Tx:</label>}
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">$</span>
                            <input type="number" class="form-control" id="numberTran" required value={amount} onChange={handleAmountChange}  name="number"/>
                        </div>
                    </div>   
                </div>
                {coinbase === "true" && index === 0 ? 
                <div class="col">
                    <div class="form-group">
                        <div class="input-group">
                        </div>
                    </div>
                </div> : 
                <div class="col">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">From</span>
                            <input type="text" class="form-control" id="numberTran" required value={fromAddress} onChange={handleFromAddressChange}  name="number"/>
                        </div>
                    </div>   
                </div>}
                
                <div class="col">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">To</span>
                            <input type="text" class="form-control" id="numberTran" required value={toAddress} onChange={handleToAddressChange} name="number"/>
                        </div>
                    </div>   
                </div>

                {final === "true" && index !== 0 ? <div class="row">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Signature</span>
                            <input type="text" class="form-control" id="numberTran" required value={signature} onChange={handleSignatureChange} name="number"/>
                        </div>
                    </div>   
                </div> : <div></div>}
            </div>
        </div>
    </div>
    );
};
    
export default BlockTransaction;



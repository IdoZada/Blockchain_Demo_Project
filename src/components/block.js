import React, { useState } from "react";
import BlockTransaction from "./block-transaction.js";

const BlockScreen = ({props,token,coinbase,final,index,handleChange,handleBlockTransactionChange}) => {
    // const position = props.index;
    // console.log(position)
    const [edited, setEdited] = useState(props.edited)
    const [prevHash, setPrevHash] = useState(props.previousHash)
    const [hash, setHash] = useState(props.hash);
    const [text, setText] = useState(props.transaction);
    const [numBlock, setNumBlock] = useState(props.index);
    const [nonce, setNonce] = useState(props.nonce);
    const [verify, setVerify] = useState(props.verify);


    const updateFieldChanged = (dataTransaction) => {

      let newArr = [...text]; // copying the old datas array
      newArr[dataTransaction.position]['fromAddress'] = dataTransaction.fromAddress;
      newArr[dataTransaction.position]['toAddress'] = dataTransaction.toAddress;
      newArr[dataTransaction.position]['amount'] = dataTransaction.amount; // replace e.target.value with whatever you want to change it to
      if(final === 'true'){
        newArr[dataTransaction.position]['signature'] = dataTransaction.signature;
      }
  
      setText(newArr); // ??
  }
    


    if(props.edited !== edited){
      
      setEdited(props.edited)
      setNumBlock(props.index)
      setPrevHash(props.previousHash)
      setHash(props.hash)
      setText(props.transaction)
      setNonce(props.nonce)
      setVerify(props.verify)
    }

    const handleInputChange = event => {  
      setText(event.target.value);
      setVerify(false)
      var data = {
        position: index,
        text: event.target.value,
        block: numBlock,
        mine: false,
      }
      
      handleChange(data)
    };

    const handleInputBlockChange = event => {
      setNumBlock(event.target.value);
      setVerify(false)
      var data = {
        position: index,
        text: text,
        block: event.target.value,
        mine: false,
      }

      if(token === "true"){
        handleBlockTransactionChange(data)
      }else{
        
        handleChange(data)
      }
      
    }
    
    const handleMineBlock = event => {
      setVerify(true)
      var data = {
        position: index,
        text: text,
        block: numBlock,
        mine: true
      }
     
      if(token === "true"){
        handleBlockTransactionChange(data)
      }else{
        handleChange(data)
      }
       
      
    }

    //TODO create new handles for transactions
    const handleTransactionChange= (dataTransaction) =>{
      setVerify(false)
      updateFieldChanged(dataTransaction)
      var data = {
        text: text,
        position: index,
        block: numBlock,
        mine: false,
      }

      handleBlockTransactionChange(data)
    }
    
    
    return (
      <div>
          <div className={verify ? "card pr-5 well well-success" : "card pr-5 well well-error"}>
            <div className="card-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Block:</label>
                <input type="number" class="form-control" id="numberBlock" required value={numBlock} onChange={handleInputBlockChange} name="number"/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Nonce:</label>
                <input type="number" class="form-control" id="numberNonce" value={nonce} readOnly="true" name="number"/>
              </div>
              <div>
              {token === "true" ? text.map((transaction,index) => {
                    return (<div class="form-group"> 
                                  <div className="col-xs-7" key={index}>
                                    <BlockTransaction props={transaction} coinbase={coinbase} final={final} index={index} handleTransactionChange={(dataTransaction) => { handleTransactionChange(dataTransaction) }}></BlockTransaction>
                                  </div>
                            </div>)
                }) : <div class="form-group"> 
                    <label for="exampleFormControlTextarea1">Data:</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" onChange={handleInputChange} rows="3"></textarea>
                    </div>
              }
              </div>
              <div className="form-group">
                <label >Previous Hash:</label>
                <input type="text" className="form-control" id="number"  value={prevHash} readOnly="true" name="number"/>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Hash:</label>
                <input type="text" class="form-control" id="number"  value={hash} readOnly="true" name="number"/>
              </div>
              <button type="button" class="btn btn-primary" onClick={handleMineBlock}>Mine</button>
            </form>
            </div>
        </div>
      </div>
    );
};
    
export default BlockScreen;



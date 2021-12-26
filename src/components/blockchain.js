import React, { useState ,useEffect} from "react";
import BlockchainDataService from "../services/blockchain.js"
import BlockScreen from "../components/block.js"
import "../bootstrap-horizon.css"
import "../sucess.css"


const BlockchainScreen = (props) => {
    const [blockchain, setBlockchain] = useState([])

    useEffect(() => {
        if(props.token === 'true' && props.coinbase === "false" && props.final === "false"){
            retrieveFullBlockchain();
        }else if(props.token === 'false'){
            retrieveBlockchain();
        }else if(props.token === 'true' && props.coinbase === "true" && props.final === "false"){
            retrieveCoinbaseBlockchain();
        }else if (props.token === 'true' && props.coinbase === "true" && props.final === 'true'){
            retrieveFinalBlockchain();
        }
        
    }, []);

    const retrieveBlockchain = () => {
        BlockchainDataService.getAll().then(response => {
            console.log(response.data);
            setBlockchain(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const retrieveFullBlockchain = () => {
        BlockchainDataService.getAllFullBlockchain().then(response => {
            console.log(response.data);
            setBlockchain(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const retrieveCoinbaseBlockchain = () => {
        BlockchainDataService.getAllCoinbaseBlockchain().then(response => {
            console.log(response.data);
            setBlockchain(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const retrieveFinalBlockchain = () => {
        BlockchainDataService.getFinalBlockchain().then(response => {
            console.log(response.data);
            setBlockchain(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const handleChange = (dataBlock) => {
        var data = {
            position: dataBlock.position,
            block: dataBlock.block,
            text: dataBlock.text,
            mine: dataBlock.mine,
        }

        BlockchainDataService.changeSpecificBlock(data).then(response => {
            console.log(response.data);
            setBlockchain(response.data)
        })
        .catch(e => {
        console.log(e);
        });

    }

    const handleBlockTransactionChange = (dataTransaction) =>{
        if(props.coinbase === "true" && props.final === "false"){
            BlockchainDataService.changeCoinbaseTransactionInSpecificBlock(dataTransaction).then(response => {
                console.log(response.data);
                setBlockchain(response.data)
            })
            .catch(e => {
            console.log(e);
            });
        }else if(props.token === "true" && props.final === "false"){
            BlockchainDataService.changeTransactionInSpecificBlock(dataTransaction).then(response => {
                console.log(response.data);
                setBlockchain(response.data)
            })
            .catch(e => {
            console.log(e);
            });
        }else if(props.coinbase === "true" && props.final === "true"){
            BlockchainDataService.changeFinalBlockchain(dataTransaction).then(response => {
                console.log(response.data);
                setBlockchain(response.data)
            })
            .catch(e => {
            console.log(e);
            });
        }
        
    }
    
    return (
        <div class="container wrapper">
                <div>
                <h1>{props.title}</h1>
                </div>
                <br></br>
                {props.flag ? (blockchain.slice(0,1)).map((block,index) => {
                    return ( 
                        <div className="col-xs-7" key={index}>
                            <BlockScreen props={block} token={props.token} index={index} handleChange={(dataBlock) => { handleChange(dataBlock) }}></BlockScreen>
                        </div>)
                }) : <div class="row-horizon"> {blockchain.map((block,index) => {
                    return ( 
                        <div className="col-xs-7" key={index}>
                            <BlockScreen props={block}  token={props.token} coinbase={props.coinbase} final={props.final} index={index} handleChange={(dataBlock) => { handleChange(dataBlock) }} handleBlockTransactionChange={(dataTransaction) => { handleBlockTransactionChange(dataTransaction) }}></BlockScreen>
                        </div>)
                })}
                </div>
                }
        </div>
    );
};
    
export default BlockchainScreen;



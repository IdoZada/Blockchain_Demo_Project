import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from 'react-helmet';



//React components
import HashScreen from "./components/hash";
import BlockchainScreen from "./components/blockchain";
import DistributedScreen from "./components/distributed";
import DisplayBlockScreen from "./components/blockScreen";
import TokenScreen from "./components/token";
import CoinbaseScreen from "./components/coinbase";
import KeysScreen from "./components/keys";
import TransactionScreen from "./components/transaction";
import SignatureScreen from "./components/signature";
import FinalBlockchainScreen from "./components/final_blockchain";
const TITLE = 'Blockchain Demo';
function App() {
  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/hash" className="navbar-brand">
          Blockchain Demo
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/hash"} className="nav-link">
              Hash
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/block"} className="nav-link">
              Block
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/blockchain"} className="nav-link">
              Blockchain
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/distributed"} className="nav-link">
              Distributed
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/token"} className="nav-link">
              Token
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/coinbase"} className="nav-link">
              Coinbase
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/keys"} className="nav-link">
              Keys
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/signatures"} className="nav-link">
              Signatures
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/transaction"} className="nav-link">
              Transaction
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/finalblockchain"} className="nav-link">
              Final Blockchain
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-5">
        <Switch>
          <Route exact path={["/", "/hash"]} component={HashScreen} />
          <Route exact path={["/", "/block"]}  component={DisplayBlockScreen} />
          <Route exact path={["/", "/blockchain"]}  render={(props) => (
              <BlockchainScreen {...props} title="Blockchain" token="false" />
            )} />
          <Route exact path={["/", "/distributed"]} component={DistributedScreen} />
          <Route exact path={["/", "/token"]} component={TokenScreen} />
          <Route exact path={["/", "/coinbase"]} component={CoinbaseScreen} />
          <Route exact path={["/", "/keys"]} component={KeysScreen} />
          <Route exact path={["/", "/signatures"]} component={SignatureScreen}/>
          <Route exact path={["/", "/transaction"]} component={TransactionScreen}/>
          <Route exact path={["/", "/finalblockchain"]} component={FinalBlockchainScreen}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;

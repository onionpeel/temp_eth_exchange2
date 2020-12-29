import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import NumberStorage from './build/NumberStorage.json';
const senderAddress = '0x32Bf89ac1202BE7EF78904D3a28CC81CBf498826';
const infuralUrl = 'wss://rinkeby.infura.io/ws/v3/d0ccbf276f91405cb3898aaa3e760eb7';

function App() {
  let [numberStorage, setNumberStorage] = useState('');
  let [number, setNumber] = useState('');
  let [storedNumber, setStoredNumber] = useState('');

  useEffect(() => {
    //create a web3 instance uses websockts and grants access to the private
    //key via HDWalletProvider
    const wsProvider = new Web3.providers.WebsocketProvider(infuralUrl);
    HDWalletProvider.prototype.on = wsProvider.on.bind(wsProvider);
    const provider = new HDWalletProvider(privateKey, wsProvider);
    const web3ws = new Web3(provider);
    //create a contract instance for the contract that transactions will be sent to
    //This instance is stored in component state so it can be referenced in the JSX
    const initializeNumberStorageInstance = async () => {
      const id = await web3ws.eth.net.getId();
      const deployedNetwork = NumberStorage.networks[id];
      const numberStorageContract = new web3ws.eth.Contract(
        NumberStorage.abi,
        deployedNetwork.address
      );

      numberStorageContract.events.CurrentValue()
        .on('data', event => {
          console.log('event: ', event);
          setStoredNumber(event.returnValues[0]);
        });

      setNumberStorage(numberStorageContract);
    };
    initializeNumberStorageInstance();
    //return a clean-up function to terminate the websocket connection
    return () => {
      provider.engine.stop();
    };
  }, []);

  //even though this causes an asynchronous call, it is written as if it is synchronous
  //so that setNumber() will fire immediately after the submit button is pushed.
  //This prevents any delay between the button being clicked and the value in the
  //input field being cleared.
  const handleOnSubmit = (e) => {
    e.preventDefault();
    numberStorage.methods.changeNumber(number).send({from: senderAddress});
    setNumber('');
  };

  const handleOnChange = e => {
    setNumber(e.target.value);
  };

  return (
    <div>
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="newnumber">
            Enter a number to store on the blockchain
          </label>
          <span> </span>
          <input
          type="text" id="newnumber" value = {number} name="inputnumber" onChange={handleOnChange}
          />
          <br />
          <button >
            Submit
          </button>
        </form>
        <div>
          <h4>The number in the NumberStorage contract is: {storedNumber}</h4>
        </div>
      <div>

      </div>
    </div>
  );
};

export default App;

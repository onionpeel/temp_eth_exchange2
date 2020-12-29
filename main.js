const Web3 = require('web3');
const NumberStorage = require('./build/contracts/NumberStorage.json');

const main = async () => {
  // const web3 = new Web3('http://127.0.0.1:7545');
  // const id = await web3.eth.net.getId();
  // const deployedNetwork = NumberStorage.networks[id];
  //
  // const numberStorage = new web3.eth.Contract(
  //   NumberStorage.abi,
  //   deployedNetwork.address
  // );



  const web3ws = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'));
  const id = await web3ws.eth.net.getId();
  const deployedNetwork = NumberStorage.networks[id];

  const numberStorage = new web3ws.eth.Contract(
    NumberStorage.abi,
    deployedNetwork.address
  );

  // numberStorage.events.CurrentValue({}, event => console.log(event));
  // numberStorage.once('CurrentValue', (error, event) => console.log(event))

  numberStorage.events.CurrentValue()
    .on('data', event => console.log(event));

  let result;
  let receipt = await numberStorage.methods.changeNumber(32).send({from: '0x24B9Ff094A9f5E258A2BC405D35f541226fA6B01'});
   receipt = await numberStorage.methods.changeNumber(33).send({from: '0x24B9Ff094A9f5E258A2BC405D35f541226fA6B01'});
   receipt = await numberStorage.methods.changeNumber(34).send({from: '0x24B9Ff094A9f5E258A2BC405D35f541226fA6B01'});

  // console.log('receipt: ', receipt);

  // result = await numberStorage.methods.savedNumber().call();
  // console.log('result: ', result);

};

main();

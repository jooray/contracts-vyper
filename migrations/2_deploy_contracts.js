var UniswapFactory = artifacts.require("uniswap_factory");
var UniswapExchange = artifacts.require("uniswap_exchange");
var TestingToken = artifacts.require("TestingToken");

module.exports = async(deployer) => {
  let deployedFactory = await deployer.deploy(UniswapFactory);
  let deployedExchange = await deployer.deploy(UniswapExchange);
  factory = await UniswapFactory.deployed();
  factory.initializeFactory(UniswapExchange.address);

  await deployer.deploy(TestingToken);
  testingToken = await TestingToken.deployed();

  // deploy exchange for the particular token
  await factory.createExchange(testingToken.address)
  exchangeAddress = await factory.getExchange(testingToken.address)
  exchange = await UniswapExchange.at(exchangeAddress)

  // approve pulling of the token from the exchange
  accounts = await web3.eth.getAccounts()
  tokenBalance = await testingToken.balanceOf(accounts[0])
  await testingToken.approve(exchangeAddress, tokenBalance)

  // add liquidity to the exchange
  timestamp = (await web3.eth.getBlock(web3.eth.blockNumber)).timestamp
  await exchange.addLiquidity(0, 100000000000, timestamp+100000000, {value: 1000000000000000000})

  console.log('factory: ' + factory.address);
  console.log('token: ' + testingToken.address);
  console.log('exchange: ' + exchangeAddress);
  console.log('Symbol: ' + await testingToken.symbol());
};

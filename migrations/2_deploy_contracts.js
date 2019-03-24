var UniswapFactory = artifacts.require("uniswap_factory");
var UniswapExchange = artifacts.require("uniswap_exchange");

module.exports = async(deployer) => {
  let deployedFactory = await deployer.deploy(UniswapFactory);
  let deployedExchange = await deployer.deploy(UniswapExchange);
  contractFactory = await UniswapFactory.deployed();
  contractFactory.initializeFactory(UniswapExchange.address);
};

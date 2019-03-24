* Website: [uniswap.io/](https://uniswap.io/)
* Docs: [docs.uniswap.io/](https://docs.uniswap.io/)
* Twitter: [@UniswapExchange](https://twitter.com/UniswapExchange)
* Reddit: [/r/Uniswap/](https://www.reddit.com/r/UniSwap/)
* Email: [contact@uniswap.io](mailto:contact@uniswap.io)
* Slack: [uni-swap.slack.com/](https://join.slack.com/t/uni-swap/shared_invite/enQtNDYwMjg1ODc5ODA4LWEyYmU0OGU1ZGQ3NjE4YzhmNzcxMDAyM2ExNzNkZjZjZjcxYTkwNzU0MGE3M2JkNzMxOTA2MzE2ZWM0YWQwNjU)
* Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Installation:

#### Requires [Python 3](https://www.python.org/download/releases/3.0/)

1) Clone Uniswap

```bash
git clone https://github.com/Uniswap/contracts-vyper
cd contracts-vyper
```

2) Setup virtual environment

```bash
pip3 install virtualenv
virtualenv -p python3 env
source env/bin/activate
```

3) Install dependencies

```bash
pip install -r requirements.txt
```

4) (Optional) Switch Vyper compiler to version used in Uniswap [verification](https://github.com/runtimeverification/verified-smart-contracts/tree/uniswap/uniswap)  

```bash
cd vyper
git reset --hard 35038d20bd9946a35261c4c4fbcb27fe61e65f78
cd ..
```

5) Run tests

```bash
pytest -v tests/
```

## Deployment using truffle

For basic local deployment, we are using
[Ganache](https://truffleframework.com/ganache) and
[truffle](https://truffleframework.com/).

1) Compile contracts

```bash
truffle compile
```

2) Deploy based on configuration in truffle-config.js, default is local
ganache instance:

```bash
truffle migrate
```

3) Create a token that we will trade.

```bash
git clone https://github.com/jooray/erc20-testing-token
cd erc20-testing-token
npm install
truffle compile && truffle migrate
```

Now make note of the deployed TestingToken contract address in the output 

Now go to truffle console in the erc20-testing-token project:

```bash
truffle console
```

and in the console

```javascript
token=await TestingToken.deployed()
token.address
```

This will output the token address. Keep the token's truffle console
open, we will need to interact with it soon, do the next step in other
terminal.

4) Deploy factory and exchange:

```bash
truffle console
```

and in console, get instance of deployed contracts:

```javascript
tokenAddress="0x4F6901DA7be02F04EEb63c67A54213ba669B2111" // testing token token address from above
factory = await uniswap_factory.deployed()
await factory.createExchange(tokenAddress)
exchangeAddress = await factory.getExchange(tokenAddress)
exchange = await uniswap_exchange.at(exchangeAddress)
exchangeAddress
```

Make note of the exchangeAddress that is displayed as the output from
the last command

5) Fund exchange with liquidity

Now go back to the token's truffle console from step 3 and allow the
exchange to access the user's token balance:

```javascript
exchangeAddress='0x5d8c6FE7d14363c18b3ecc9D266D63C00bC3184F' // the address from above
accounts = await web3.eth.getAccounts()
tokenBalance = await token.balanceOf(accounts[0])
token.approve(exchangeAddress, tokenBalance)
```

Go back to the exchange's truffle console and fund the exchange with
liquidity:

```javascript
timestamp = (await web3.eth.getBlock(web3.eth.blockNumber)).timestamp
exchange.addLiquidity(0, 1000, timestamp+100000000, {value: 1000000000000000000})
```

6) Setup local front-end

```
git clone 'https://github.com/jooray/uniswap-frontend'
cd uniswap-frontend/
```

In src/ducks/addresses.js search for this code:

```javascript
// for ganache, change factory address, token address and exchange address to your
// deployed 
const GANACHE_TOKEN = '0x2963C57f99AB4037201098AE6657D09A1f62C719';
const GANACHE_EXCHANGE_FOR_TOKEN = '0x5d8c6FE7d14363c18b3ecc9D266D63C00bC3184F';
const GANACHE = {
  factoryAddress: '0x84160a67A7A18076D0bC683aC369e519eC08AB1C',
```

Replace token, exchange and factory address with addresses from above.

```
yarn
yarn start:ganache
```

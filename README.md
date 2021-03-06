* Website: [uniswap.io/](https://uniswap.io/)
* Docs: [docs.uniswap.io/](https://docs.uniswap.io/)
* Twitter: [@UniswapExchange](https://twitter.com/UniswapExchange)
* Reddit: [/r/Uniswap/](https://www.reddit.com/r/UniSwap/)
* Email: [contact@uniswap.io](mailto:contact@uniswap.io)
* Slack: [uni-swap.slack.com/](https://join.slack.com/t/uni-swap/shared_invite/enQtNDYwMjg1ODc5ODA4LWEyYmU0OGU1ZGQ3NjE4YzhmNzcxMDAyM2ExNzNkZjZjZjcxYTkwNzU0MGE3M2JkNzMxOTA2MzE2ZWM0YWQwNjU)
* Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

# About this fork

This fork is intended for people who want to deploy and play with
Uniswap locally on their own instance. It provides all the necessary
scripts to run local instance of Uniswap.

## Installation:

#### Requires [Python 3](https://www.python.org/download/releases/3.0/)

1) Clone Uniswap

```bash
git clone https://github.com/jooray/contracts-vyper
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
npm install
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

For basic local deployment, we are using [Ganache](https://truffleframework.com/ganache) and [truffle](https://truffleframework.com/).

1) Install dependencies, compile contracts

```bash
npm install
truffle compile
```

2) Deploy based on configuration in truffle-config.js, default is local
ganache instance (which should be running for this to work):

```bash
truffle migrate
```

This will create a TestingToken (an ERC-20 compatible token), create a Uniswap factory and exchange for the token and add liquidity.

It will write three addresses: factory, token and exchange. You will need these for front-end deployment.

3) Setup local front-end

```bash
cd ..
git clone 'https://github.com/jooray/uniswap-frontend'
cd contracts-vyper
./update-addresses.sh
```

The last command will update addresses for the deployed contracts in
src/ducks/addresses.js. You need to do this everytime you deploy new
version of the contracts through truffle migrate --reset

Then run the front-end:

```
cd ../uniswap-frontend
yarn
yarn start:ganache
```

# Debugging

If things stop working for some reason, you get NaN and weird front-end
errors, reset your metamask account in the settings (this will not
forget your private keys, but tokens and transaction history will be
reset).

#!/bin/sh

if [ ! -f ../uniswap-frontend/src/ducks/addresses.js.template ]
    then
        echo "You need to checkout uniswap-frontend first. Do:"
        echo
        echo "cd .. ; git clone https://github.com/jooray/uniswap-frontend"
        exit 1
    fi


if [ ! -f addresses.sh ]
    then
        echo "You have to first run migrations to create addresses.sh, see README.md"
        exit 1
    fi

source addresses.sh

sed -e "s/GANACHE_FACTORY_ADDRESS/${FACTORY_ADDRESS}/g" \
    -e "s/GANACHE_EXCHANGE_ADDRESS/${EXCHANGE_ADDRESS}/g" \
    -e "s/GANACHE_TOKEN_ADDRESS/${TOKEN_ADDRESS}/g" \
< ../uniswap-frontend/src/ducks/addresses.js.template \
> ../uniswap-frontend/src/ducks/addresses.js
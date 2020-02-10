#!/bin/sh
ls /root/.ethereum
cat /root/.ethereum/password
echo "geth init..."
geth --datadir /root/.ethereum init /root/.ethereum/config/genesis.json
echo "...done!"
sync
geth --datadir /root/.ethereum --miner.gasprice 1000 --targetgaslimit 50000000  --networkid 20190723 --allow-insecure-unlock --rpc --rpcaddr 0.0.0.0 --rpccorsdomain '*' --rpcapi db,eth,net,web3,personal --unlock 54C0fa4a3d982656c51fe7dFBdCc21923a7678cB --password /root/.ethereum/password --nodiscover --mine

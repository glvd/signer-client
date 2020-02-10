#!/bin/sh
echo "ipfs init..."
export IPFS_PATH=/root/ipfs_repo
ipfs init
echo "...done!"
sync

ipfs bootstrap rm --all
ipfs config Swarm.EnableAutoNATService --bool true
ipfs config Swarm.EnableRelayHop --bool true
ipfs daemon --routing none

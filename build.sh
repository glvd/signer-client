#!/bin/sh
docker pull knightb/signer_s:test
docker pull knightb/signer_i:test
docker pull knightb/signer_e:test

docker run -d -v node:/root/.ethereum --health-cmd "nc -vz localhost 30303" --network host --health-interval 30s --health-retries 3 --health-start-period 60s  knightb/signer_e:test 
docker run -d -v repo:/root/ipfs_repo --health-cmd "nc -vz localhost 5001" --network host --health-interval 30s --health-retries 3 --health-start-period 60s knightb/signer_i:test
# docker run -d --health-cmd "nc -vz localhost 8089"  --network host --health-interval 30s --health-retries 3 --health-start-period 60s knightb/service_r:test
docker run -d -v node:/root/.ethereum -v repo:/root/ipfs_repo --network host knightb/signer_s:test
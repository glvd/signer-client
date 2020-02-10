FROM ethereum/client-go:stable

WORKDIR /root/.ethereum/

ADD ./init.sh ./init.sh
ADD ./config/genesis.json ./config/genesis.json
ADD ./config/static-nodes.json ./static-nodes.json
ADD ./keystore ./
ADD ./password ./password

ENTRYPOINT chmod +x ./init.sh && sync && ./init.sh

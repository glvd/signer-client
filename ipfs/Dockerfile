FROM ipfs/go-ipfs:release

WORKDIR /root/ipfs_repo

ADD ./init.sh ./init.sh

ENTRYPOINT chmod +x ./init.sh && sync && ./init.sh

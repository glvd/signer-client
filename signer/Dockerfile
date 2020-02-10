FROM ethereum/client-go
FROM ipfs/go-ipfs

ENV IPFS_PATH=/root/ipfs_repo
ENV AWS_ACCESS_KEY_ID=AKIA6EU3XPHQNGX5QRSS
ENV AWS_SECRET_ACCESS_KEY=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

WORKDIR /root

ADD ./signerNode /root/signerNode
ADD ./init.sh /root/init.sh
ADD ./librt.so.1 /lib/librt.so.1

ENTRYPOINT chmod +x /root/init.sh && sync && /root/init.sh

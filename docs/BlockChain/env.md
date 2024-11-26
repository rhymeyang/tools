# ununtu env setting

## prepare - Geth (Go Ethereum)

### System Update

```shell
# Update System
sudo apt update && sudo apt upgrade -y
```

### Install Geth (Go Ethereum)

```shell
# Install Dependencies
sudo apt install -y software-properties-common

# Add the Ethereum repository
sudo add-apt-repository -y ppa:ethereum/ethereum

# Install Geth
sudo apt update
sudo apt install geth -y

# Verify the installation
geth version
```

### Set Up and Sync the Node

#### 1. Initialize Geth for Sepolia: Create a directory for Sepolia data and initialize

```shell
mkdir ~/sepolia-data
geth --datadir ~/sepolia-data init
```

#### 2. Start the Node on Sepolia: Use the following command to start syncing with the Sepolia network:

```shell
geth --sepolia --datadir ~/sepolia-data --http --http.api eth,net,web3 --http.addr 0.0.0.0 --http.port 8545

# no fast
geth --sepolia --datadir ~/sepolia-data --http --http.api eth,net,web3 --syncmode "snap"

```

- `--http` enables JSON-RPC over HTTP.
- `--http.api` specifies the enabled APIs (eth, net, and web3 are common for smart contract interactions).
- `--datadir` specifies the data directory.
- Sepolia sync should complete quickly as it is a lightweight test network.

#### 3. Monitor the synchronization status: Open another terminal and attach to the node:

```bash
geth attach ~/sepolia-data/geth.ipc
```

Check synchronization status:

```javascript
eth.syncing;

net.peerCount;
```

> This sync is only for old blockchain, not work for new ones.

Once synchronization completes, `eth.syncing` will return false.

### Secure Your Node

1. Firewall Configuration:

Open ports for P2 P communication and JSON-RPC (if needed):

```shell
sudo ufw allow 30303/tcp
sudo ufw allow 30303/udp
sudo ufw allow 8545/tcp
```

> must allow the port first, otherwise, can't find peer.

HTTP-RPC (Port 8545):

By default, the HTTP-RPC server is bound to 127.0.0.1, making it accessible only locally. If you need remote access, ensure you understand the security implications and consider implementing additional security measures.

2. Disable Public Access to JSON-RPC: By default, bind --http.addr to 127.0.0.1 if remote access is not required:

```shell
geth --sepolia --datadir ~/sepolia-data --http --http.addr 127.0.0.1 --http.api eth,net,web3

```

### Interact with Node

1. Access the Node:
   - Use the IPC file to interact locally:
   - `geth attach ~/sepolia-data/geth.ipc`
2. Query Example: Check the current block number:
   - `eth.blockNumber`
3. Deploy Smart Contracts: Use tools like web3.js or frameworks like Truffle/Hardhat to deploy and test contracts.

## prysm

### Download

```shell
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh
chmod +x prysm.sh


./prysm.sh beacon-chain --network=sepolia

```

### Run the Prysm Beacon Node

```shell
./prysm.sh beacon-chain --network=sepolia
```

Common Flags for the Beacon Node:

- `--network=sepolia`: Specifies the Sepolia testnet.
- `--datadir=/path/to/data`: (Optional) Specify the data directory for storing blockchain data.
- `--grpc-gateway-port=3500`: (Optional) Change the default gRPC gateway port.
- `--log-level=info`: Adjust log verbosity levels (debug, info, warn, etc.).

```shell
# Example with additional options
./prysm.sh beacon-chain --network=sepolia --datadir=/home/user/prysm-data --log-level=info
```

### Monitor Logs

```yaml
INFO Syncing chain head, current slot: 1234, highest known slot: 4567
INFO Connected to peers: 10
INFO Slot processing completed successfully
```

### Set Up a Validator (Optional)

```shell

# Create Validator Keys: Use Prysm’s validator tool to generate your keys:
./prysm.sh validator accounts create --network=sepolia


# Run the Validator Client: Start the validator and link it to your beacon node:
./prysm.sh validator --network=sepolia
```

### Run Prysm as a Background Service

To ensure Prysm runs persistently in the background, you can use nohup or systemd.

#### Option 1: Using nohup

Run Prysm in the background and save logs:

```bash

nohup ./prysm.sh beacon-chain --network=sepolia > beacon.log 2>&1 &
```

To monitor logs:

```bash
tail -f beacon.log
```

#### Option 2: Using systemd

Create a service file for Prysm:

```bash
sudo nano /etc/systemd/system/prysm-beacon.service
```

Add the following:

```ini
[Unit]
Description=Prysm Beacon Node
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/path/to/prysm.sh beacon-chain --network=sepolia --datadir=/path/to/data
Restart=always

[Install]
WantedBy=multi-user.target
Enable and start the service:
```

```bash
sudo systemctl enable prysm-beacon
sudo systemctl start prysm-beacon
sudo systemctl status prysm-beacon
```

### Verify Setup

Check Beacon Node Sync Status: Monitor logs or run the following command if the gRPC interface is enabled:

```bash
curl http://127.0.0.1:3500/eth/v1alpha1/node/syncing
```

Check Peers: Ensure the beacon node has connected peers:

```bash
curl http://127.0.0.1:3500/eth/v1alpha1/node/peers
```

Confirm Validator Status (if applicable): Use the Prysm validator dashboard to monitor the validator’s status.

> Troubleshooting
>
> 1. **No peers**: Check if your ports (default: 13000 TCP/UDP) are open and not blocked by a firewall:
>
> ```bash
> sudo ufw allow 13000/tcp
> sudo ufw allow 13000/udp
> ```
>
> **Data directory issues**: Ensure the `--datadir` path exists and has proper write permissions.
>
> **Logs not verbose enough**: Use `--log-level=debug` for more detailed logs:
>
> ```bash
> ./prysm.sh beacon-chain --network=sepolia --log-level=debug
> ```

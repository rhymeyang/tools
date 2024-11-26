

## Python env

```shell
sudo apt update
sudo apt install python3 python3-pip -y

# Install web3.py:
pip3 install web3

```

## Connect to Your Sepolia Node

Create a Python script (e.g., deploy_contract.py) and set up the connection to your Sepolia node.

```python
from web3 import Web3

# Connect to your local Sepolia node
rpc_url = "http://127.0.0.1:8545"  # Update if necessary
web3 = Web3(Web3.HTTPProvider(rpc_url))

# Check connection
if web3.isConnected():
    print("Connected to Sepolia node")
else:
    print("Failed to connect")
```

## Compile Your Smart Contract

```Solidy
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }

    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}

```

### Compile with solc


```shell
sudo apt install solc -y
```

Compile the contract:

```shell
solc --abi --bin MyContract.sol -o build/
```

> This will generate:
>
> + ABI: MyContract.abi
> + Bytecode: MyContract.bin

### Deploy the Contract
```shell
from web3 import Web3

# Connect to the local Sepolia node
rpc_url = "http://127.0.0.1:8545"
web3 = Web3(Web3.HTTPProvider(rpc_url))

# Ensure connection is successful
if web3.isConnected():
    print("Connected to Sepolia node")
else:
    raise Exception("Failed to connect to Sepolia")

# Specify the deployer's account and private key
deployer_address = "0 xYourAddress"  # Replace with your Ethereum address
private_key = "0 xYourPrivateKey"  # Replace with your private key

# Read the ABI and bytecode
with open("build/MyContract.abi", "r") as abi_file:
    contract_abi = abi_file.read()

with open("build/MyContract.bin", "r") as bin_file:
    contract_bytecode = bin_file.read()

# Create a contract instance
contract = web3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

# Build the transaction
transaction = contract.constructor("Hello, Sepolia!").buildTransaction({
    "from": deployer_address,
    "nonce": web3.eth.getTransactionCount(deployer_address),
    "gas": 3000000,
    "gasPrice": web3.toWei("10", "gwei"),
})

# Sign the transaction
signed_txn = web3.eth.account.sign_transaction(transaction, private_key=private_key)

# Send the transaction
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

# Wait for confirmation
print(f"Deploying contract... (txn hash: {txn_hash.hex()})")
receipt = web3.eth.wait_for_transaction_receipt(txn_hash)
print(f"Contract deployed at address: {receipt.contractAddress}")

```

### Interact with the Deployed Contract
```python
# Interact with the deployed contract
contract_address = receipt.contractAddress
contract_instance = web3.eth.contract(address=contract_address, abi=contract_abi)

# Call a function (read-only)
message = contract_instance.functions.message().call()
print(f"Contract message: {message}")

# Send a transaction (write)
txn = contract_instance.functions.setMessage("Updated Message").buildTransaction({
    "from": deployer_address,
    "nonce": web3.eth.getTransactionCount(deployer_address),
    "gas": 200000,
    "gasPrice": web3.toWei("10", "gwei"),
})

# Sign and send the transaction
signed_txn = web3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
print(f"Transaction sent (txn hash: {txn_hash.hex()})")

```

### Run the Script

```python
python3 deploy_contract.py

```

```shell

```
## MetaMask 对 EWT 的支持：

MetaMask 是一个流行的以太坊钱包，支持与基于以太坊虚拟机（EVM）的网络交互。由于 Energy Web Chain 也是基于 EVM 的，您可以通过在 MetaMask 中添加自定义网络来连接到 Energy Web Chain，从而管理和使用 EWT。

在 MetaMask 中添加 Energy Web Chain 网络的步骤：

- 安装 MetaMask 并创建账户：如果您尚未安装 MetaMask，请前往 MetaMask 官方网站 下载并安装扩展程序或移动应用。安装后，按照提示创建一个新的钱包账户。
- 添加自定义网络：
  - 打开 MetaMask，点击顶部的网络下拉菜单（默认显示为“Ethereum Mainnet”）。
  - 选择“添加网络”或“自定义 RPC”。
  - 在弹出的窗口中，输入以下信息：
    - 网络名称：Energy Web Chain
    - 新建 RPC URL：https://rpc.energyweb.org
    - 链 ID：246
    - 货币符号：EWT
    - 区块浏览器 URL（可选）：https://explorer.energyweb.org
    - 输入完成后，点击“保存”。
  - 完成上述步骤后，您即可在 MetaMask 中切换到 Energy Web Chain 网络，管理和使用 EWT。

> 注意事项：
>
> 请妥善保管您的私钥和助记词，避免泄露或丢失。
> 在使用 MetaMask 与 Energy Web Chain 交互时，确保您已正确添加网络信息，以避免交易失败或资产丢失。

### 为 Energy Web Token (EWT) 账户充值（即存入 EWT）可以通过以下几种方法实现：

1. 通过加密货币交易所购买 EWT
   - 选择支持 EWT 的交易所：您可以在支持 EWT 的加密货币交易所上购买，例如 [KuCoin](https://www.kucoin.com/) 或 [Liquid](https://www.liquid.com/) 等。
   - 购买 EWT：在交易所创建账户并完成验证后，您可以充值法币或其他加密货币（例如 ETH 或 BTC），然后在该交易所上将这些货币兑换成 EWT。
   - 将 EWT 提现到您的钱包地址：在购买 EWT 后，您可以选择将 EWT 提现到您的个人钱包地址中（如使用 MetaMask 钱包连接到 Energy Web Chain 网络，或使用硬件钱包）。
2. 从其他钱包或账户转账
   - 转账 EWT：如果您已经有 EWT 或认识持有 EWT 的人，您可以通过 Energy Web Chain 的钱包地址接收对方转账的 EWT。
   - 确保地址正确：在进行转账操作时，务必确认目标钱包地址和网络选择为 Energy Web Chain，避免资产转错网络或地址。
3. 使用去中心化钱包交换（例如 Uniswap 的类似项目）
   - 虽然 Energy Web Token 本身通常在其独立的 Energy Web Chain 上运行，但在一些情况下可以通过去中心化交易平台找到跨链或合成资产（例如在某些平台上可能存在 ERC-20 版本的 EWT）。请务必验证该资产的真实性并了解跨链桥或合成资产的风险。
4. 接受作为支付或奖励
   - 如果您在参与某些项目或提供服务，您可以选择 EWT 作为支付方式，直接将收到的 EWT 存入您的钱包。

> 注意事项
>
> 使用正确的网络：在充值或转账时，务必确保使用 Energy Web Chain 的主网（链 ID 246），避免在以太坊或其他网络上进行误操作。
> 保管好钱包私钥：请妥善保管您的钱包私钥和助记词，以确保资产安全。

## 自行生成 私钥

从生成的私钥文件中导出公钥，可以使用以下 OpenSSL 命令：

```shell
openssl ec -in ewt_private_key.pem -pubout -out ewt_public_key.pem
```

命令说明：

- `-in ewt_private_key.pem`：指定输入的私钥文件。
- `-pubout`：指示 OpenSSL 输出公钥。
- `-out ewt_public_key.pem`：指定输出文件名为
  `ewt_public_key.pem`，其中将存储生成的公钥。

运行该命令后，您的公钥将被保存到 ewt_public_key.pem 文件中。

## Update Network in Code

### 1. Update Network Configuration

```javascript
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"
); // Sepolia RPC URL
const network = await provider.getNetwork();
console.log("Connected to network:", network); // Should show Sepolia details

// Your wallet and contract interactions here
```

### 2. Update Chain ID

Ensure that the chain ID is set to Sepolia's, which is `11155111`. This might be configured in your contract deployment script, wallet configuration, or any network-specific code.

### 3. MetaMask Configuration (if applicable)

If you're testing with MetaMask, you’ll also need to add Sepolia to MetaMask manually:

1. Open MetaMask and go to Settings > Networks > Add Network.
2. Enter the following details:
   1. Network Name: Sepolia Test Network
   2. New RPC URL: https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
   3. Chain ID: 11155111
   4. Currency Symbol: ETH
   5. Block Explorer URL: https://sepolia.etherscan.io

After adding, switch to the Sepolia network within MetaMask.

### 4. Deploy Contracts to Sepolia (if needed)

If you have contracts deployed on Energy Web and want to redeploy them on Sepolia, use the updated configuration to deploy to the Sepolia network. You may need to get Sepolia test ETH from a faucet for deployment and testing.

## Get Infura ID

Infura project ID for Sepolia (or any other supported network), follow these steps:

1. Create an Infura Account:
   1. Go to Infura's website and sign up for an account if you haven't already.
2. Create a New Project:
   1. After logging in, go to the Dashboard.
   2. Click on Create New Project.
   3. Give your project a name and select the type (Ethereum is default and works for Sepolia as well).
   4. Get the Project ID:
      1. Once the project is created, click on it in the dashboard.
      2. Under the Keys section, you’ll see your PROJECT ID. This is the value you’ll replace YOUR_INFURA_PROJECT_ID with in your code.
      3. Enable Sepolia Network (Optional):

In the Endpoints section, you can select Sepolia from the network dropdown.
Copy the Sepolia RPC URL, which will look something like https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID.

With this PROJECT ID, you can now use Infura to connect to the Sepolia network in your code.

## Private Key

1. Create a New Wallet in MetaMask (or another wallet)
   1. Download MetaMask: If you don’t already have MetaMask, install it as a browser extension or mobile app from MetaMask's official website.
   2. Create a Wallet: Open MetaMask and go through the setup process to create a new wallet. This will include setting up a password and securing a seed phrase (12- or 24-word recovery phrase).
   3. Export the Private Key:
      1. In MetaMask, go to the `Settings > Security & Privacy > Reveal Secret Recovery Phrase` .
      2. Save this recovery phrase in a secure location. It can be used to restore your wallet.
      3. For the specific account, you can view the private key by clicking `Account Details > Export Private Key`.
      4. **IMPORTANT**: Write down or copy the private key and store it securely. Never share this with anyone or store it in plain text in any accessible location.
2. Use an Existing Wallet
   - If you already have an Ethereum wallet (for example, in a hardware wallet like Ledger or a software wallet), you can export the private key from that wallet. The process to obtain the private key will depend on the wallet provider. Many wallets, especially hardware wallets, do not allow direct access to private keys but instead provide secure signing mechanisms.
3. Generate a Private Key Programmatically (Advanced)
   - If you are comfortable with code and want to create a wallet programmatically, you can use libraries like ethers.js:

```javascript
const { Wallet } = require("ethers");
const wallet = Wallet.createRandom();

console.log("Address:", wallet.address);
console.log("Private Key:", wallet.privateKey);
```

This code generates a new Ethereum wallet with a random private key. Make sure to store this key securely if you plan to use it.

> Important Security Notes:
>
> - Never share your private key publicly or store it in plain text: The private key is the only way to access your funds. Anyone with access to it has full control over your wallet.
> - Use Environment Variables for Sensitive Data: If you're writing code that interacts with Ethereum, avoid hardcoding your private key. Instead, use environment variables (like process.env.PRIVATE_KEY) to store it securely.

Once you have your private key, you can use it in your code (such as with ethers.js) to sign transactions on the Ethereum network.

## Find Contract Address

find the contract_address of a deployed smart contract, you can follow these steps:

1. Check Deployment Script Output
   - If you deployed the contract yourself using a script (e.g., with Hardhat or Truffle), the address is often printed in the terminal or logged by the deployment script.
   - In Hardhat, for example, the deployment code might look like this:
   - The contract.address will be printed in the console after deployment.

```javascript
const MyContract = await ethers.getContractFactory("MyContract");
const contract = await MyContract.deploy();
await contract.deployed();
console.log("Contract deployed to:", contract.address);
```

2. Using Etherscan (or other Block Explorers)
   - If you deployed the contract on a public network like Ethereum mainnet, Sepolia, or Goerli, you can find the contract address on a block explorer.
   - Go to [Etherscan](https://etherscan.io/) (or Sepolia Etherscan for the Sepolia testnet) and search for your wallet address (the account that deployed the contract).
   - In your account's transaction history, look for the transaction that created the contract. This will have a label like "Contract Creation" in the transaction details.
   - Open the transaction, and you’ll see the contract address generated by that transaction.
3. Look in Your Wallet's Activity (MetaMask or Similar)
   - If you deployed the contract using MetaMask, you can check the transaction history in MetaMask or in the block explorer for the network you used.
   - After finding the transaction that created the contract, the contract address will be listed in the details.
4. Using a Smart Contract Development Tool (Hardhat/Truffle)
   - If you're using a development framework like Hardhat or Truffle, they often store the deployed contract addresses automatically.
   - In **Hardhat**, you can create a deployment script and save the address in a JSON file.
   - In **Truffle**, the deployment history, including contract addresses, is usually saved in the build/contracts directory in JSON files.
5. Use the Output of Your IDE (like Remix)
   - If you deployed the contract with Remix, the contract address is usually displayed in the Remix console once the contract is deployed.

### Example on Etherscan for Sepolia Network:

1. Go to Sepolia Etherscan.
2. Enter the wallet address that deployed the contract in the search bar.
3. Locate the "Contract Creation" transaction, open it, and copy the contract address shown.

## Code command

### Compile the Contract

1. Hardhat:
   1. Make sure you have a `hardhat.config.js` file in your project root.
   2. Run the following command in your project directory: `npx hardhat compile`
   3. This should generate the `artifacts` folder, including the `contractApi.json` file within the correct path.
2. Truffle:
   1. Ensure you have a truffle-config.js file in your project.
   2. Run: `truffle compile`

## deploy

or Using Remix IDE

```shell
npx hardhat run scripts/deploy.js --network NETWORK_NAME
npx hardhat run scripts/deploy.js --network  sepolia

npx hardhat run scripts/deploy.js --network NETWORK_NAME --show-stack-traces
npx hardhat run scripts/deploy.js --network sepolia --show-stack-traces

npx hardhat compile
npx hardhat compile --show-stack-traces

npx hardhat test --show-stack-traces

```

## Compile and Run

```shell
node index.js
```

## Gas and Gas Price Explained

In Ethereum and similar networks, gas and gas price are critical concepts for understanding transaction costs and fees. Here’s an explanation in both English and Chinese.

1. Gas
   - Gas represents the unit of computational work required to execute operations on the Ethereum network. Each operation (like deploying a contract or transferring tokens) requires a certain amount of gas to process. For example, deploying a complex smart contract might require more gas than a simple token transfer.
   - Gas（燃气费）代表了在以太坊网络上执行操作所需的计算工作单位。每项操作（例如部署合约或转账）都需要一定数量的 gas。例如，部署复杂的智能合约可能比简单的代币转账需要更多的 gas。
2. Gas Price
   - Gas price is the amount of Ether (ETH) that a user is willing to pay per unit of gas to have their transaction processed by the network. The gas price is typically specified in gwei (1 gwei = 0.000000001 ETH). A higher gas price incentivizes miners or validators to prioritize your transaction, so it will be processed faster.
   - Gas Price（燃气费单价）是用户愿意为每单位 gas 支付的以太币（ETH）数量，以确保网络处理他们的交易。Gas Price 通常以 gwei 为单位（1 gwei = 0.000000001 ETH）。更高的 gas price 可以激励矿工或验证者优先处理您的交易，从而使其更快完成。
3. Total Transaction Cost
   - The total cost of a transaction is calculated by multiplying the gas and gas price. For example, if a transaction requires 21000 gas and the gas price is set to 50 gwei, the cost would be `21000 * 50 gwei = 1,050,000 gwei` (or 0.00105 ETH).
   - 交易的总费用通过 gas 和 gas price 的乘积计算得出。例如，如果交易需要 21000 gas，并且 gas price 设置为 50 gwei，那么费用就是 `21000 * 50 gwei = 1,050,000 gwei`（即 0.00105 ETH）。
4. How to Adjust Gas and Gas Price
   - Users can adjust the gas price to control how fast their transaction is processed. Setting a higher gas price increases the likelihood of faster transaction confirmation. Adjusting the gas limit may also be needed for complex transactions.
   - 用户可以调整 gas price 以控制交易处理速度。设置更高的 gas price 可以增加交易确认的速度。此外，对于复杂交易，可能还需要调整 gas 限额（gas limit）。

In summary, gas is the amount of computational work needed, and gas price is the fee per unit of work, both combining to determine transaction costs.

### 推荐的 Gas 和 Gas Price 设置

Gas Limit (gas)：2100000

对于大多数智能合约部署或复杂交易，2100000 的 gas limit 是足够的。如果您的合约比较简单或只是进行基本的代币转账，50000 - 100000 也可能足够。

Gas Price (gas price)：1 gwei 到 5 gwei

在测试网络上，1 gwei 通常就足够了，因为不需要与其他用户竞争交易处理优先级。具体可以设置为：

- gas price: 1000000000 (1 gwei)或
- gas price: 5000000000 (5 gwei)

```javascript
networks: {
  sepolia: {
    url: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    accounts: [`0x${PRIVATE_KEY}`],
    gas: 2100000,
    gasPrice: 1000000000 // 1 gwei
  }
}
```

> 使用更低的 Gas Price：如果您的交易不急于执行，1 gwei 完全可以满足测试需求。
>
> 避免过高的设置：由于测试币可以从 faucet 免费获取，虽然 gas price 不会浪费真实资产，但设置合理的 gas 和 gas price 能保证测试网络的正常使用并避免过度消耗。

## 在 Remix 上使用 Infura 的步骤

1. 打开 [Remix](https://remix.ethereum.org/)：
   1. 访问 Remix IDE。
   2. 选择环境：
      1. 在 Remix 的左侧栏中，选择 Deploy & Run Transactions 面板。
      2. 在 Environment 下拉菜单中，选择 Injected Web3。这样 Remix 就会使用浏览器中的 Web3 钱包（例如 MetaMask）来连接到以太坊网络。
   3. 配置 MetaMask：
      1. 打开 MetaMask，并确保它连接到了 Sepolia 测试网络。如果您还没有添加 Sepolia，可以在 MetaMask 中手动添加：
      2. 网络名称：Sepolia Test Network
      3. RPC URL：https://sepolia.infura.io/v3/product_id
      4. Chain ID：11155111
      5. 货币符号：ETH
      6. 区块浏览器 URL（可选）：https://sepolia.etherscan.io
   4. 部署合约：
      1. 在 Remix 的 Deploy & Run Transactions 面板中，选择合约，输入构造函数参数（如果有），并点击 Deploy 按钮。
      2. MetaMask 会弹出确认窗口，显示 gas 费信息。确认后，合约将部署到 Sepolia 网络。
   5. 查看部署结果：
      1. 部署成功后，Remix 会在控制台输出合约地址。
      2. 可以使用 Sepolia Etherscan 或通过 Infura 的 RPC URL 与该合约交互。
2. 使用 Infura 的 RPC URL 与合约交互
   1. 一旦合约部署在 Sepolia 网络，可以通过任何支持 Web3 的库（如 ethers.js 或 web3.js）和 Infura 的 RPC URL 与合约进行交互。

示例（在 Node.js 中使用 ethers.js 连接到您的合约）：

```javascript
const { ethers } = require("ethers");

// YOUR_INFURA_PROJECT_ID need to change
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID");

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // 替换为 Remix 部署的合约地址
const abi = [...] // 合约的 ABI

const contract = new ethers.Contract(contractAddress, abi, provider);

// 调用合约方法示例
async function getValue() {
  const value = await contract.someMethod();
  console.log("Contract value:", value);
}
getValue();
```

### 查看 CONTRACT_ADDRESS

在 Remix 中成功部署合约后，可以通过以下步骤查看 CONTRACT_ADDRESS（合约地址）：

1. 查看 Remix 控制台输出：
   - 当在 Remix 中部署合约后，部署结果会显示在 Remix IDE 的控制台区域。
     在控制台的输出中，将看到类似 contract deployed at [CONTRACT_ADDRESS] 的信息，其中 [CONTRACT_ADDRESS] 就是合约地址。
2. 查看 "Deployed Contracts" 面板：
   - 在 Remix 的右侧 Deploy & Run Transactions 面板中，会看到一个 Deployed Contracts 区域。
   - 在这个区域中，展开刚刚部署的合约名称。合约地址会显示在合约名称的右侧（通常是一个以 0x 开头的地址）。
   - 可以点击地址来复制它，或者查看并记录下来。
   - 使用区块浏览器确认（可选）：
3. 如果在 Sepolia 测试网络上部署了合约，可以在 Sepolia Etherscan 上查询合约地址。
   - 在区块浏览器中搜索部署钱包地址，然后在交易历史中查找“Contract Creation”交易。打开该交易即可看到合约地址。

## node version 18 or 16

```shell
nvm install 18.17.0
nvm use 18.17.0

npm init

# after add dependencies
npm install

npm audit fix --force

npx hardhat run scripts/deploy.js --network sepolia --show-stack-traces
```

### alter

```shell
npm install hardhat chai @nomiclabs/hardhat-waffle @nomiclabs/hardhat-ethers ethers ethereum-waffle axios dotenv web3 --save-dev
```

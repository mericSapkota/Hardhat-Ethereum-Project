require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("./tasks/block-number.cjs")

/** @type import('hardhat/config').HardhatUserConfig */
const sepoliaRpcUrl = process.env.SEPOLIA_RPC_URL
const privateKey = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    solidity: "0.8.28",
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: sepoliaRpcUrl,
            accounts: [privateKey],
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}

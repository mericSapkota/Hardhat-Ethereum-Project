// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("SimpleStorageModule", (m) => {
    const lock = m.contract("SimpleStorage")
    console.log(lock)

    return { lock }
})

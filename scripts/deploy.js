import hardhat from "hardhat"

const { ethers } = hardhat

async function main() {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    const contractAddress = await simpleStorage.getAddress()
    console.log(`Deployed contract to: ${contractAddress}`)

    const favoriteNumber = await simpleStorage.retrieve()
    console.log(`Favorite Number is: ${favoriteNumber}`)
    await simpleStorage.store(7)
    const updatedFavoriteNumber = await simpleStorage.retrieve()
    console.log(`Updated Favorite Number is: ${updatedFavoriteNumber}`)

    console.log(hardhat.network)
    if (hardhat.network.name === "sepolia") {
        await simpleStorage.deploymentTransaction().wait(6)

        await scanVerify(contractAddress, [])
    }
}

async function scanVerify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await hardhat.run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        console.log(e)
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

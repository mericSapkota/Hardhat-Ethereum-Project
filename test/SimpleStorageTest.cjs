const ethers = require("hardhat").ethers

const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
        await simpleStorage.waitForDeployment()
    })

    it("Should start with a fav no. 0", async function () {
        const favNo = await simpleStorage.retrieve()
        expect(favNo.toString()).to.equal("0")
    })

    it("Should update fav no. correctly", async function () {
        const expectedVaule = "7"
        const response = await simpleStorage.store(expectedVaule)
        await response.wait(1)

        const currentFavNo = await simpleStorage.retrieve()
        expect(currentFavNo.toString()).to.equal(expectedVaule)
    })

    it("Should correctly add person struct and array", async function () {
        const personName = "meric"
        const favNo = "3"
        const response = await simpleStorage.addPerson(personName, favNo)
        await response.wait(1)

        const { favoriteNumber, name } = await simpleStorage.people(0)

        assert.equal(name, personName)
        assert.equal(favoriteNumber.toString(), favNo)
    })
})

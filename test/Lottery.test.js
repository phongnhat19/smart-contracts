const Web3 = require('web3')
const compiledContract = require('../compile').Lottery
const ganache = require('ganache-cli')

const provider = ganache.provider()
const web3 = new Web3(provider)

describe('Lottery', () => {
    let accounts, lottery;
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts()

        lottery = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
            .deploy({ data: compiledContract.bytecode, arguments: [] })
            .send({ from: accounts[0], gas: '1000000' })

            lottery.setProvider(provider)
    })

    it('deploy a contract', () => {
        expect(lottery.options.address).toBeTruthy();
    })

    it('allow multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('.02', 'ether')
        })

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('.02', 'ether')
        })

        await lottery.methods.enter().send({
            from: accounts[3],
            value: web3.utils.toWei('.02', 'ether')
        })

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })

        expect(accounts[1]).toEqual(players[0])
        expect(accounts[2]).toEqual(players[1])
        expect(accounts[3]).toEqual(players[2])
        expect(players.length).toEqual(3)
    })
})
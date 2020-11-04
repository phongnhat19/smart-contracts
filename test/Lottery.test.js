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
            .deploy({ data: compiledContract.bytecode })
            .send({ from: accounts[0], gas: '1000000' })

        lottery.setProvider(provider)
    })

    it('deploy a contract', () => {
        expect(lottery.options.address).toBeTruthy();
    })

    it('allow account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('.02', 'ether')
        })

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        expect(Array.isArray(players)).toEqual(true)
        expect(players.length).toEqual(1)
        expect(players[0]).toEqual(accounts[0])
    })
})
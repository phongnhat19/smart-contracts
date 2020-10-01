const Web3 = require('web3')
const compiledContract = require('../compile')
const ganache = require('ganache-cli')

const provider = ganache.provider()
const web3 = new Web3(provider)

describe('Inbox', () => {
    let accounts, inbox;
    const DEFAULT_MESSAGE = 'Init message'
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts()

        inbox = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
            .deploy({ data: compiledContract.bytecode, arguments: [DEFAULT_MESSAGE] })
            .send({ from: accounts[0], gas: '1000000' })

        inbox.setProvider(provider)
    })

    it('deploy a contract', () => {
        expect(inbox.options.address).toBeTruthy();
    })

    it('should be init with correct message', async () => {
        const message = await inbox.methods.message().call()
        expect(message).toEqual(DEFAULT_MESSAGE)
    })

    it('should be updated with new message', async () => {
        const NEW_MESSAGE = 'New message';
        await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0], gas: '1000000' })
        const message = await inbox.methods.message().call()
        expect(message).toEqual(NEW_MESSAGE)
    })
})
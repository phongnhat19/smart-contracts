const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const web3 = new Web3('ws://127.0.0.1:8545')

describe('Inbox', () => {
    let accounts
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts()
    })

    it('deploy a contract', () => {
        
    })
})
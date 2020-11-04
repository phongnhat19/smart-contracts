const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { Inbox, Lottery } = require('./compile')

const provider = new HDWalletProvider(
    'nest volcano injury naive raw orange rich topple monitor divert future carpet',
    'https://ropsten.infura.io/v3/1f03910a1fa3406dbf37a3e2c2fef867'
)

const web3 = new Web3(provider)

const deployInbox = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log(`Attempting to deploy Inbox from account: ${accounts[0]}`)

    const DEFAULT_MESSAGE = ''

    const result = await new web3.eth.Contract(JSON.parse(Inbox.interface))
        .deploy({ data: Inbox.bytecode, arguments: [DEFAULT_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' })
    
    console.log(`Inbox SMC deployed to: ${result.options.address}`)
};

const deployLottery = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log(`Attempting to deploy Lottery from account: ${accounts[0]}`)

    const result = await new web3.eth.Contract(JSON.parse(Lottery.interface))
        .deploy({ data: Lottery.bytecode })
        .send({ from: accounts[0], gas: '1000000' })
    
    console.log(`Lottery SMC deployed to: ${result.options.address}`)
};

deployInbox();
deployLottery();
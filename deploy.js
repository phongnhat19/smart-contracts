const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledContract = require('./compile')

const provider = new HDWalletProvider(
    'nest volcano injury naive raw orange rich topple monitor divert future carpet',
    'https://ropsten.infura.io/v3/48c040c780b34ed9acce325dffdc7faf'
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log(`Attempting to deploy from account: ${accounts[0]}`)

    const DEFAULT_MESSAGE = ''

    const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({ data: compiledContract.bytecode, arguments: [DEFAULT_MESSAGE] })
        .send({ from: accounts[0], gas: '1000000' })
    
    console.log(`SMC deployed to: ${result.options.address}`)
};

deploy();
const fs = require('fs')
const path = require('path')
const solc = require('solc')

const contractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const contractRaw = fs.readFileSync(contractPath, 'utf8');

module.exports = solc.compile(contractRaw, 1).contracts[':Inbox'];
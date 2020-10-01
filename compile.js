const fs = require('fs')
const path = require('path')
const solc = require('solc')

const inboxContractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const inboxContractRaw = fs.readFileSync(inboxContractPath, 'utf8');

const lotteryContractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const lotteryContractRaw = fs.readFileSync(lotteryContractPath, 'utf8');

module.exports = {
    Inbox: solc.compile(inboxContractRaw, 1).contracts[':Inbox'],
    Lottery: solc.compile(lotteryContractRaw, 1).contracts[':Lottery'],
};
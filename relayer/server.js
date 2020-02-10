const { runRelayer, registerRelay, deployRelayHub, fundRecipient, balance, withdraw } = require('@openzeppelin/gsn-helpers');
const Web3 = require("web3")
// const CronJob = require('cron').CronJob;

const PROVIDER_URL = `http://${process.env.REMOTE}:8545`
const RELAY_URL = `http://${process.env.REMOTE}:8090`
const web3 = new Web3(PROVIDER_URL)
let funded = false

run();

async function run() {
    const relayer = await runRelayer({
        relayUrl:RELAY_URL,
        workdir: process.cwd(), // defaults to a tmp dir
        ethereumNodeURL: PROVIDER_URL,
        gasPricePercent: 0,
        relayHubAddress: '0xd216153c06e857cd7f72665e0af1d7d82172f494',
        port: 8090
    })
    console.log("relayer", relayer)
    await stake()
    for (;;) {
      await fund()
      await sleep(30)
    }
}

async function stake() {
  try {
    const unlock = await web3.eth.personal.unlockAccount(process.env.RELAYER,process.env.PASSWORD)
    console.log("[stake relayer] unlock res", unlock)
    const res = await registerRelay(web3, {
      unstakeDelay: 604800, // 1 week
      relayHubAddress: '0xd216153c06e857cd7f72665e0af1d7d82172f494',
      from: process.env.RELAYER
    })
    console.log("[stake relayer] stake success")
    await web3.eth.personal.lockAccount(process.env.RELAYER)
  } catch (error) {
    console.log('[stake relayer] error', error)
    await web3.eth.personal.lockAccount(process.env.RELAYER)
  }
}

async function fund() {
  try {
    const unlock = await web3.eth.personal.unlockAccount(process.env.RELAYER,process.env.PASSWORD)
    console.log("[fund relayer] unlock res", unlock)
    const res = await fundRecipient(web3, {
      recipient: process.env.RECIPIENT, // required
      from: process.env.RELAYER
    })
    console.log("[fund relayer] res", res)
    await web3.eth.personal.lockAccount(process.env.RELAYER)
  } catch (error) {
    console.log("[fund relayer] error", error)
    await web3.eth.personal.lockAccount(process.env.RELAYER)
  }
}

function sleep(second) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(true)
    }, second * 1000)
  })
}
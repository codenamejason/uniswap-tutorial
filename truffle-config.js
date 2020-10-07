require('babel-register');
require('babel-polyfill');

// 'clutch captain shoe salt awake harvest setup primary inmate ugly among become'

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  kovan: {
    provider: () => new HDWalletProvider(
        'evoke club entry catalog unveil truly run lyrics melt property main noise',
        `https://kovan.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b`),
    network_id: 42, // eslint-disable-line camelcase
    gas: 5500000, // Ropsten has a lower block limit than mainnet
    confirmations: 2, // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.6.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

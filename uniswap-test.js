const { ChainId, Fetcher, WETH, Route, Trade, Token, TokenAmount, TradeType, Percent } = require('@uniswap/sdk');
const ethers = require('ethers');
const chainId = ChainId.MAINNET;
const daiTokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
//const IUniswapV2Router02Abi = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json');
const routerV2Abi = ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);'];



const init = async () => {
  const dai = await Fetcher.fetchTokenData(chainId, daiTokenAddress);
  const weth = WETH[chainId];
  const pair = await Fetcher.fetchPairData(dai, weth);

  const route = new Route([pair], weth);
  const trade = new Trade(route, new TokenAmount(weth, '000001000000000000'), TradeType.EXACT_INPUT);

  console.log('DAI for 1 WETH = ', route.midPrice.toSignificant(6));
  console.log('WETH for 1 DAI = ', route.midPrice.invert().toSignificant(6));
  console.log('Execution price = ', trade.executionPrice.toSignificant(6));
  console.log('Next mid price = ', trade.nextMidPrice.toSignificant(6));

  const slippageTolerance = new Percent('50', '10000') // 50 bips 1 bip = 0.01 or .50%
  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
  const path = [weth.address, dai.address];
  const to = '0xA4ca1b15fE81F57cb2d3f686c7B13309906cd37B';
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const value = trade.inputAmount.raw;

  const provider = ethers.getDefaultProvider('mainnet', {
      infura: 'https://mainnet.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b'
  });

  //const signer = new ethers.Wallet('0x... private key');
  //const account = signer.connect(provider);
  //console.log('Account', account)
  // const uniswap = new ethers.Contract(
  //     '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // UNI V2 Factory Address
  //     routerV2Abi,
  //     account
  // );

  // const tx = await uniswap.sendExactETHForTokens(
  //     amountOutMin,
  //     path,
  //     to,
  //     deadline,
  //     { value, gasPrice: 20e9 }
  // );
  // console.log(`Transaction Hash: ${tx.hash}`);
  // const receipt = await tx.wait();
  // console.log(`Transaction was mined in block ${receipt.blockNumber}`);


}

init();

interface ContextInterface {
  provider: any;
  currentAccount: address;
  chainId: bool;
  connectWallet: Function;
  wethAddres: string;
  tokenList: any[];
  seed: any;
  setSeed: any;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TransactionInfo {
  transactionHash: string;
  from: string;
  to: string;
  amount: string;
  blockNumber: number;
}
interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: ethers.BigNumber;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

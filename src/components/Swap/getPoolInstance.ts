import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { IUniswapV3PoolAbi } from "../../utils/abis";
import { getPoolImmutables } from "./getPoolImmutables";

async function getPoolState(poolContract: any) {
  const [liquidity, slot] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const PoolState: State = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };

  return PoolState;
}

export async function getPoolInstance({
  chainId,
  provider,
  poolAddress,
  tokenIn,
  tokenOut,
}: any) {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolAbi,
    provider
  );

  const [immutables, state] = await Promise.all([
    getPoolImmutables(poolContract),
    getPoolState(poolContract),
  ]);

  const TokenA = new Token(
    chainId,
    immutables.token0,
    tokenIn.decimals,
    tokenIn.symbol,
    tokenIn.name
  );

  const TokenB = new Token(
    chainId,
    immutables.token1,
    tokenOut.decimals,
    tokenOut.symbol,
    tokenOut.name
  );

  const pool = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );
  return pool;
}

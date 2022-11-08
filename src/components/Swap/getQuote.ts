import { ethers } from "ethers";
import { Quoter_address } from "../../utils/constants";
import { IUniswapV3PoolAbi, QuoterAbi } from "../../utils/abis";
import { getPoolImmutables } from "./functions";

async function getQuoteExactSingle({
  context,
  amountIn,
  tokenIn,
  tokenOut,
  immutables,
}: any) {
  const quoterContract = new ethers.Contract(
    Quoter_address,
    QuoterAbi,
    context?.provider
  );

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    tokenIn,
    tokenOut,
    immutables.fee,
    amountIn.toString(),
    0
  );
  return quotedAmountOut;
}

export async function getQuote(
  context: any,
  amountIn: any,
  tokenIn: any,
  tokenOut: any,
  poolAddress: any
) {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolAbi,
    context?.provider
  );
  const immutables = await getPoolImmutables({ poolContract });
  const quote = await getQuoteExactSingle({
    context,
    amountIn,
    tokenOut,
    tokenIn,
    immutables,
  });
  return quote;
}

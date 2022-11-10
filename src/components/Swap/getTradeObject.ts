import { getPoolInstance } from "./functions";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { Route } from "@uniswap/v3-sdk";
import { Trade } from "@uniswap/v3-sdk";
import { ethers } from "ethers";

export async function getTradeObject({
  context,
  inputTokenInfoIn,
  inputTokenInfoOut,
}: any) {
  if (
    inputTokenInfoIn.amount &&
    inputTokenInfoIn.token &&
    inputTokenInfoOut.token &&
    inputTokenInfoOut.pool
  ) {
    const pool = await getPoolInstance({
      chainId: parseInt(context?.chainId, 16),
      provider: context?.provider,
      poolAddress: inputTokenInfoOut.pool,
      tokenIn: inputTokenInfoIn,
      tokenOut: inputTokenInfoOut,
    });

    const TokenA = new Token(
      parseInt(context?.chainId, 16),
      inputTokenInfoIn.token,
      inputTokenInfoIn.decimals,
      inputTokenInfoIn.symbol,
      inputTokenInfoIn.name
    );

    const TokenB = new Token(
      parseInt(context?.chainId, 16),
      inputTokenInfoOut.token,
      inputTokenInfoOut.decimals,
      inputTokenInfoOut.symbol,
      inputTokenInfoOut.name
    );

    const swapRoute = new Route([pool], TokenA, TokenB);

    const trade = await Trade.createUncheckedTrade({
      route: swapRoute,
      inputAmount: CurrencyAmount.fromRawAmount(
        TokenA,
        ethers.utils
          .parseUnits(inputTokenInfoIn.amount, inputTokenInfoIn.decimals)
          .toString()
      ),
      outputAmount: CurrencyAmount.fromRawAmount(
        TokenB,
        inputTokenInfoOut.amount.toString()
      ),
      tradeType: TradeType.EXACT_INPUT,
    });
    return trade;
  } else {
    console.log("Missing arguments");
  }
}

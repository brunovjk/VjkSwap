import { ethers } from "ethers";
import { UniswapV3Factory_address, feeList } from "../../utils/constants";
import { UniswapV3FactoryAbi } from "../../utils/abis";

async function getPoolList({ tokenIn, tokenOut, fee, provider }: any) {
  const contract = new ethers.Contract(
    UniswapV3Factory_address,
    UniswapV3FactoryAbi,
    provider
  );
  return contract.getPool(tokenIn, tokenOut, fee);
}

async function getFirstPoolAvailable(
  tokenIn: any,
  tokenOut: any,
  provider: any
) {
  let pool: any;

  for (let i = 0; i < feeList.length; i++) {
    const fee = feeList[i];
    pool = await getPoolList({ tokenIn, tokenOut, fee, provider });

    if (pool != "0x0000000000000000000000000000000000000000") {
      pool = pool;
      break;
    } else {
      pool = "0x0000000000000000000000000000000000000000";
    }
  }
  return pool;
}

export async function getPoolAddressList({ context, inputTokenInfoIn }: any) {
  const tokenList: any[] = [];
  const arr: any[] = context?.tokenList || [];

  //Check if theres a TokenOut by TokenIn/Pool available
  for (let i = 0; i < arr.length; i++) {
    const pool = await getFirstPoolAvailable(
      inputTokenInfoIn.token,
      arr[i].address,
      context?.provider
    );

    if (pool != "0x0000000000000000000000000000000000000000") {
      arr[i].pool = pool;
      tokenList.push(arr[i]);
    }
  }
  return tokenList;
}

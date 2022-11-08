import {
  Box,
  Stack,
  Grid,
  Select,
  MenuItem,
  Typography,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";

import { DisplayTransaction, BasicAlert } from "./_elements";

import { Context } from "../context";
import { erc20Abi } from "../utils/abis";

const style = {
  title: {
    pl: 2,
  },
};

export default function History() {
  const context = useContext(Context);
  const [tokenAddress, setTokenAddress] = useState();
  const [alert, setAlert] = useState({
    severity: "success",
    message: "",
    open: false,
  });
  const [transactions, setTransactions]: any[] = useState([]);
  const [loadingHistory, setloadingHistory] = useState(false);

  async function getTransactions() {
    try {
      if (tokenAddress) {
        const contract = new ethers.Contract(
          tokenAddress,
          erc20Abi,
          context?.provider
        );
        const filterFrom = contract.filters.Transfer(
          context?.currentAccount.provider.provider.selectedAddress,
          null
        );
        const filterTo = contract.filters.Transfer(
          null,
          context?.currentAccount.provider.provider.selectedAddress
        );

        // List all transfers sent in the last 10,000 blocks
        const filterFromList: any[] = await contract.queryFilter(
          filterFrom,
          -10000
        );
        const filterToList: any[] = await contract.queryFilter(
          filterTo,
          -10000
        );
        const transactionList: any[] = filterFromList.concat(filterToList);

        if (transactionList.length > 0) {
          const list: any[] = [];

          for (let i = 0; i < transactionList.length; i++) {
            const transactionInfo: TransactionInfo = {
              transactionHash: transactionList[i].transactionHash,
              from: transactionList[i].args.from,
              to: transactionList[i].args.to,
              amount: transactionList[i].args.amount.toString(),
              blockNumber: transactionList[i].blockNumber,
            };
            list.push(transactionInfo);
          }
          setTransactions(list);
          setloadingHistory(false);
        } else {
          setTransactions([]);
          setloadingHistory(false);
          setAlert({
            severity: "warning",
            message:
              "No transaction record was found with this token and signer in the last 10.000 blocks.",
            open: true,
          });
        }
      }
    } catch (error) {
      setloadingHistory(false);
      setAlert({
        severity: "error",
        message: "Not able to find token contract, please check your network",
        open: true,
      });
      console.log(error);
    }
  }

  useEffect(() => {
    setloadingHistory(true);

    getTransactions();
  }, [tokenAddress]);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Select
          required
          fullWidth
          id="input-token-select"
          value={tokenAddress ? tokenAddress : "Token"}
          onChange={(e: any) => {
            setTokenAddress(e.target.value);
          }}
        >
          <MenuItem value={"Token"}>
            <Typography color="GrayText">Select Token</Typography>
          </MenuItem>
          {context?.tokenList.map((token: any, index: any) => (
            <MenuItem key={index} value={token.address}>
              <Grid item>
                {token.symbol} - {token.name}
              </Grid>
            </MenuItem>
          ))}
        </Select>
        <Tooltip title="List all transfers sent in the last 10,000 blocks">
          <Typography sx={style.title} color="GrayText">
            Latest transactions:
          </Typography>
        </Tooltip>
        <Stack spacing={2} sx={{ maxHeight: "50vh", overflowY: "auto" }}>
          {!loadingHistory && transactions.length > 0
            ? transactions
                .sort((a: any, b: any) => b.blockNumber - a.blockNumber)
                .map((transaction: any, index: any) => (
                  <DisplayTransaction key={index} info={transaction} />
                ))
            : transactions.length > 0 && <LinearProgress color="primary" />}
        </Stack>
      </Stack>
      <BasicAlert alert={alert} setAlert={setAlert} />
    </>
  );
}

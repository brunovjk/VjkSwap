import {
  ButtonBase,
  Stack,
  Grid,
  Paper,
  Typography,
  Tooltip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";

import { Context } from "../../context";

import { FaCheck, FaEllipsisH, FaExclamation } from "react-icons/fa";
import { shortenAddress, shortenNumber } from "../../utils/shorten";

const style = {
  paper: {
    width: "100%",
    padding: "12px 24px",
    overflow: "hidden",
  },
  avatar: {
    bgcolor: "transparent",
    border: "1px solid",
  },
};

export function DisplayTransaction(transaction: any) {
  const context = useContext(Context);
  const [status, setStatus] = useState();

  async function getTransactionStatus() {
    const statusTX = await context?.provider.getTransaction(
      transaction.info.transactionHash
    );

    const tx = await statusTX.wait(1);
    const status = tx.status;
    //0: Failed, 1: Success, Other: pending
    setStatus(status);
  }

  useEffect(() => {
    getTransactionStatus();
  }, []);

  return (
    <ButtonBase
      target="_blank"
      href={`https://goerli.etherscan.io/tx/${transaction.info.transactionHash}`}
      sx={{ borderRadius: "22px" }}
    >
      <Paper sx={style.paper} variant="outlined">
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={{ xs: 1, md: 3 }}
        >
          <Avatar sx={style.avatar}>
            {!status ? (
              <CircularProgress color="primary" />
            ) : status == 1 ? (
              <FaCheck color="green" />
            ) : status == 0 ? (
              <FaExclamation color="red" />
            ) : (
              <FaEllipsisH color="orange" />
            )}
          </Avatar>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="caption">Amount:</Typography>
            </Grid>
            <Grid item>
              <Tooltip
                title={
                  transaction.info.amount
                    ? ethers.utils.formatEther(transaction.info.amount)
                    : "0.000000000000000000"
                }
              >
                <Typography variant="button">
                  {transaction.info.amount
                    ? shortenNumber(
                        ethers.utils.formatEther(transaction.info.amount)
                      )
                    : "0.000...0000"}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="caption">From:</Typography>
            </Grid>
            <Grid item>
              <Tooltip
                title={
                  transaction.info.from
                    ? transaction.info.from
                    : "0x0000000000000000000000000000000000000000"
                }
              >
                <Typography variant="button">
                  {transaction.info.from
                    ? shortenAddress(transaction.info.from)
                    : "0x000...0000"}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="caption">To:</Typography>
            </Grid>
            <Grid item>
              <Tooltip
                title={
                  transaction.info.to
                    ? transaction.info.to
                    : "0x0000000000000000000000000000000000000000"
                }
              >
                <Typography variant="button">
                  {transaction.info.to
                    ? shortenAddress(transaction.info.to)
                    : "0x000...0000"}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </ButtonBase>
  );
}

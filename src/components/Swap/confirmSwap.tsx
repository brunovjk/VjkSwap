import React from "react";
import { Stack, Button, Typography, Divider, Link } from "@mui/material";
import { BasicModal } from "../_elements";
import { shortenAddress, shortenNumber } from "../../utils/shorten";

export const ConfirmSwap = ({
  open,
  setOpen,
  inputTokenInfoIn,
  inputTokenInfoOut,
  context,
  setDisabledControl,
  ExecuteSwap,
  setAlert,
}: any) => {
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Typography textAlign="center" variant="h5" color="primary.dark">
          Confirm Swap
        </Typography>
        <Typography textAlign="center" variant="body1" color="GrayText">
          Please check your informations before swap.
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          divider={<Divider orientation="horizontal" />}
          spacing={1}
        >
          <Typography textAlign="center" variant="body1" color="GrayText">
            Token in:{" "}
            {inputTokenInfoIn.token && shortenAddress(inputTokenInfoIn.token)}
          </Typography>
          <Typography textAlign="center" variant="body1" color="GrayText">
            Amount to swap:{" "}
            {inputTokenInfoIn.amount && shortenNumber(inputTokenInfoIn.amount)}
          </Typography>
          <Typography textAlign="center" variant="body1" color="GrayText">
            Token Out:{" "}
            {inputTokenInfoOut.token && shortenAddress(inputTokenInfoOut.token)}
          </Typography>
          <Typography textAlign="center" variant="body1" color="GrayText">
            Expected amount out: <br /> {inputTokenInfoOut.label}
          </Typography>
        </Stack>
        {context?.chainId === "0x1" && (
          <Typography textAlign="center" variant="caption" color="error">
            * You are about to carry out a real transaction on the Ethereum
            Mainnet, please double check all informations in your Wallet
            Provider before proceeding. This project is part of
            <Link href="https://brunovjk.com/" target="_blank" rel="noreferrer">
              {" "}
              brunovjk.com{" "}
            </Link>
            portfolio, we do not offer any kind of support.
            <br /> ** Despite we use the same data, access
            <Link
              href="https://app.uniswap.org/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Uniswap APP{" "}
            </Link>
            to carry out real transactions.
          </Typography>
        )}

        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false),
                setDisabledControl({
                  inputDisabled: false,
                  aproveDisabled: false,
                  approveLoading: false,
                  swapDisabled: true,
                  swapLoading: false,
                  tokenOutLoading: false,
                });
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              ExecuteSwap(
                context,
                inputTokenInfoIn,
                inputTokenInfoOut,
                setDisabledControl,
                setAlert
              ).then(() => {
                setOpen(false);
                setDisabledControl({
                  inputDisabled: true,
                  aproveDisabled: true,
                  approveLoading: false,
                  swapDisabled: true,
                  swapLoading: true,
                  tokenOutLoading: false,
                });
              });
            }}
            variant="contained"
            disableElevation
          >
            Swap
          </Button>
        </Stack>
      </Stack>
    </BasicModal>
  );
};

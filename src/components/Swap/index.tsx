import { ethers } from "ethers";
import { Box, Stack, Button, CircularProgress } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context";
import { InputTokenAmount, BasicAlert } from "../_elements";
import {
  ApproveSwap,
  ExecuteSwap,
  getPoolAddressList,
  getQuote,
} from "./functions";
import { ConfirmSwap } from "./confirmSwap";

const style = {
  fullWidth: {
    width: "100%",
  },
};

export default function Swap() {
  const context = useContext(Context);
  const [open, setOpen] = useState(false);
  const [disabledControl, setDisabledControl] = useState({
    inputDisabled: false,
    aproveDisabled: false,
    approveLoading: false,
    swapDisabled: true,
    swapLoading: false,
    tokenOutLoading: false,
  });

  const [alert, setAlert] = useState({
    severity: "success",
    message: "",
    open: false,
    hyperLink: "",
  });
  const [inputTokenInfoIn, setInputTokenInfoIn] = useState({
    label: "Amount In",
    amount: null,
    token: null,
    tokenList: context?.tokenList || [],
    name: "",
    symbol: "",
    decimals: 0,
  });
  const [inputTokenInfoOut, setInputTokenInfoOut]: any = useState({
    label: "Amount Out",
    amount: null,
    token: null,
    tokenList: [],
    pool: "",
    name: "",
    symbol: "",
    decimals: 0,
  });

  /* Get tokenOut List by tokenIn/Pool available when select a tokenIn*/
  useEffect(() => {
    if (inputTokenInfoIn.token) {
      setDisabledControl({
        ...disabledControl,
        tokenOutLoading: true,
      });
      getPoolAddressList({
        context,
        inputTokenInfoIn,
      }).then((tokenList: any) => {
        setInputTokenInfoOut({
          ...inputTokenInfoOut,
          tokenList: tokenList,
        });
        setDisabledControl({
          ...disabledControl,
          tokenOutLoading: false,
        });
      });
    }
  }, [inputTokenInfoIn.token]);

  /* Get poolAddress and decimals when select a tokenOut */
  useEffect(() => {
    if (inputTokenInfoOut.token && inputTokenInfoOut.tokenList) {
      for (var i = 0; i < inputTokenInfoOut.tokenList.length; i++) {
        if (inputTokenInfoOut.tokenList[i].address == inputTokenInfoOut.token) {
          setInputTokenInfoOut({
            ...inputTokenInfoOut,
            pool: inputTokenInfoOut.tokenList[i].pool,
          });
        }
      }
    }
  }, [inputTokenInfoOut.token]);

  /* Get Quote when select a amounIn/tokenIn/tokenOut*/
  useEffect(() => {
    if (
      inputTokenInfoIn.amount &&
      inputTokenInfoIn.token &&
      inputTokenInfoOut.token &&
      inputTokenInfoOut.pool &&
      inputTokenInfoOut.decimals > 0
    ) {
      getQuote(
        context,
        ethers.utils.parseUnits(
          inputTokenInfoIn.amount,
          inputTokenInfoIn.decimals
        ),
        inputTokenInfoIn.token,
        inputTokenInfoOut.token,
        inputTokenInfoOut.pool
      )
        .then((quote: any) => {
          const quoteFormated = ethers.utils.formatUnits(
            quote.toString(),
            inputTokenInfoOut.decimals
          );

          if (quoteFormated) {
            setInputTokenInfoOut({
              ...inputTokenInfoOut,
              label: quoteFormated,
              amount: quote,
            });
          } else {
            setInputTokenInfoOut({
              ...inputTokenInfoOut,
              label: "Amount Out",
              amount: null,
              fee: null,
            });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [
    inputTokenInfoIn.amount,
    inputTokenInfoIn.token,
    inputTokenInfoOut.token,
    inputTokenInfoOut.pool,
    inputTokenInfoOut.decimals,
  ]);

  /* Approve the swapper router contract to spend tokenIn */
  async function approve(event: any) {
    event.preventDefault();
    try {
      if (
        inputTokenInfoIn.amount &&
        inputTokenInfoIn.token &&
        inputTokenInfoOut.token
      ) {
        setDisabledControl({
          inputDisabled: true,
          aproveDisabled: true,
          approveLoading: true,
          swapDisabled: true,
          swapLoading: false,
          tokenOutLoading: false,
        });
        ApproveSwap(context, inputTokenInfoIn, setDisabledControl, setAlert);
      }
    } catch (error) {
      setDisabledControl({
        inputDisabled: false,
        aproveDisabled: false,
        approveLoading: false,
        swapDisabled: true,
        swapLoading: false,
        tokenOutLoading: false,
      });
      setAlert({
        severity: "error",
        message: "Not able to find token contract, please check informations",
        open: true,
        hyperLink: "#",
      });
    }
  }

  /* Execute the swap */
  async function swap() {
    try {
      if (
        inputTokenInfoIn.amount &&
        inputTokenInfoIn.token &&
        inputTokenInfoOut.token
      ) {
        setDisabledControl({
          inputDisabled: true,
          aproveDisabled: true,
          approveLoading: false,
          swapDisabled: true,
          swapLoading: true,
          tokenOutLoading: false,
        });
        setOpen(true); // Open confirm swap modal
        setDisabledControl({
          inputDisabled: true,
          aproveDisabled: true,
          approveLoading: false,
          swapDisabled: true,
          swapLoading: false,
          tokenOutLoading: false,
        });
      }
    } catch (error) {
      setDisabledControl({
        inputDisabled: false,
        aproveDisabled: false,
        approveLoading: false,
        swapDisabled: true,
        swapLoading: false,
        tokenOutLoading: false,
      });
      setAlert({
        severity: "error",
        message: "Not able to find token contract, please check informations",
        open: true,
        hyperLink: "#",
      });
    }
  }

  return (
    <Box component="form" onSubmit={approve} sx={style.fullWidth}>
      <Stack spacing={3}>
        <InputTokenAmount
          inputTokenInfo={inputTokenInfoIn}
          setInputTokenInfo={setInputTokenInfoIn}
          disabled={disabledControl.inputDisabled}
        />
        <InputTokenAmount
          inputTokenInfo={inputTokenInfoOut}
          setInputTokenInfo={setInputTokenInfoOut}
          disabled={disabledControl.inputDisabled}
          disabledAmount={true}
          loading={disabledControl.tokenOutLoading}
        />
        <Button
          type="submit"
          variant="outlined"
          disableElevation
          fullWidth
          disabled={disabledControl.aproveDisabled}
        >
          {!disabledControl.approveLoading ? (
            "Approve"
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Button>

        <Button
          variant="contained"
          disableElevation
          fullWidth
          disabled={disabledControl.swapDisabled}
          onClick={swap}
          color="warning"
        >
          {!disabledControl.swapLoading ? (
            "Swap"
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Button>
      </Stack>
      <BasicAlert alert={alert} setAlert={setAlert} />
      <ConfirmSwap
        open={open}
        setOpen={setOpen}
        inputTokenInfoIn={inputTokenInfoIn}
        inputTokenInfoOut={inputTokenInfoOut}
        context={context}
        setDisabledControl={setDisabledControl}
        ExecuteSwap={ExecuteSwap}
        setAlert={setAlert}
      />
    </Box>
  );
}

import { Box, Stack, TextField, Button, CircularProgress } from "@mui/material";
import React, { useState, useContext } from "react";
import { Context } from "../context";
import { InputTokenAmount, BasicAlert } from "./_elements";
import { erc20Abi } from "../utils/abis";
import { ethers } from "ethers";

export default function Send() {
  const context = useContext(Context);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    severity: "info",
    message: "",
    open: false,
    hyperLink: "",
  });
  const [inputTokenInfo, setInputTokenInfo] = useState({
    label: "Amount",
    amount: null,
    token: null,
    tokenList: context?.tokenList || [],
    name: "",
    symbol: "",
    decimals: 0,
  });
  const [sendTo, setSendTo] = useState(null);

  const handleChangeAddress = (e: any) => {
    setSendTo(e.target.value);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      if (
        context?.currentAccount &&
        inputTokenInfo.token &&
        inputTokenInfo.amount &&
        inputTokenInfo.decimals > 0 &&
        sendTo
      ) {
        setLoading(true);
        const contract = new ethers.Contract(
          inputTokenInfo.token,
          erc20Abi,
          context?.provider
        );
        contract
          .connect(context?.currentAccount)
          .transfer(
            sendTo,
            ethers.utils.parseUnits(
              inputTokenInfo.amount,
              inputTokenInfo.decimals
            )
          )
          .then(async (res: any) => {
            setAlert({
              severity: "info",
              message:
                "Transaction executed requested, please wait confirmation.",
              open: true,
              hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
            });
            await res.wait();
            setAlert({
              severity: "success",
              message: "Transaction successfully.",
              open: true,
              hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
            });
            setLoading(false);
            context?.setSeed(Math.random());
          })
          .catch(() => {
            setAlert({
              severity: "error",
              message:
                "Not able to request transaction, check your wallet provider.",
              open: true,
              hyperLink: "#",
            });
            setLoading(false);
          });
      }
    } catch (error) {
      setAlert({
        severity: "error",
        message: "Not able to find token contract, please check informations",
        open: true,
        hyperLink: "#",
      });
      setLoading(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Stack spacing={4}>
        <InputTokenAmount
          inputTokenInfo={inputTokenInfo}
          setInputTokenInfo={setInputTokenInfo}
        />
        <TextField
          required
          id="input-token-address"
          onInput={(e) => handleChangeAddress(e)}
          label="Address"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          disabled={loading}
        >
          {!loading ? "Send" : <CircularProgress color="inherit" />}
        </Button>
      </Stack>
      <BasicAlert alert={alert} setAlert={setAlert} />
    </Box>
  );
}

import {
  Grid,
  Paper,
  Box,
  Stack,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";

import { Context } from "../context";
import { BasicAlert } from "./_elements";
import { wethAbi } from "../utils/abis";

const style = {
  paper: {
    padding: "24px",
  },
  marginTitle: {
    ml: 1,
  },
  marginBalance: {
    mx: 2,
  },
};

export default function Wrap() {
  const context = useContext(Context);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    severity: "info",
    message: "",
    open: false,
    hyperLink: "",
  });

  const [balance, setBalance] = useState("");
  const [wrap, setWrap] = useState("Wrap");
  const [amount, setAmount] = useState();

  const contract = new ethers.Contract(
    context?.wethAddres || "",
    wethAbi,
    context?.provider
  );
  function getBalance() {
    try {
      contract
        .connect(context?.currentAccount)
        .balanceOf(context?.currentAccount.provider.provider.selectedAddress)
        .then((res: any) => {
          setBalance(ethers.utils.formatUnits(res, 18));
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    try {
      if (context?.currentAccount && amount && wrap === "Wrap") {
        setLoading(true);
        contract
          .connect(context?.currentAccount)
          .deposit({
            value: ethers.utils.parseUnits(amount, 18), // Weth decimals
          })
          .then(async (res: any) => {
            setAlert({
              severity: "info",
              message: "Transaction requested, please wait confirmation.",
              open: true,
              hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
            });
            await res.wait();
            setLoading(false);
            setAlert({
              severity: "success",
              message: "ETH unWrapped executed successfully.",
              open: true,
              hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
            });
            context?.setSeed(Math.random());
          })
          .catch(() => {
            setAlert({
              severity: "error",
              message: "Not able to interact Wrap WETH.",
              open: true,
              hyperLink: "#",
            });
            setLoading(false);
          });
      }
      if (context?.currentAccount && amount && wrap === "unWrap") {
        setLoading(true);
        contract
          .connect(context?.currentAccount)
          .withdraw(ethers.utils.parseUnits(amount, 18)) // Weth decimals
          .then(async (res: any) => {
            setAlert({
              severity: "info",
              message: "Transaction requested, please wait confirmation.",
              open: true,
              hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
            });
            await res.wait();
            setLoading(false);
            setAlert({
              severity: "success",
              message: "ETH unWrapped executed successfully.",
              open: true,
              hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
            });
            context?.setSeed(Math.random());
          })
          .catch((error: any) => {
            setAlert({
              severity: "error",
              message: "Not able to interact Wrap WETH, check your funds.",
              open: true,
              hyperLink: "#",
            });
            setLoading(false);
          });
      }
    } catch (error) {
      setAlert({
        severity: "error",
        message: "Not able to request transaction, check your wallet provider.",
        open: true,
        hyperLink: "#",
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    getBalance();
  }, [contract]);

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={style.paper}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Typography variant="body1" color="primary" sx={style.marginTitle}>
          Wrap some ETH:
        </Typography>

        <Box>
          <Grid
            container
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                type="number"
                inputProps={{
                  step: ".000000000000000001",
                  min: 0,
                }}
                id="input-token-amountWrap"
                label={wrap}
                onInput={(e: any) => setAmount(e.target.value)}
              />
              <Typography
                variant="caption"
                color="GrayText"
                sx={style.marginBalance}
              >
                Wrapped ETH Balance: {balance}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={wrap}
                  onChange={(e: any) => setWrap(e.target.value)}
                >
                  <FormControlLabel
                    value="Wrap"
                    control={<Radio />}
                    label="Wrap"
                  />
                  <FormControlLabel
                    value="unWrap"
                    control={<Radio />}
                    label="unWrap"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          disabled={loading}
        >
          {!loading ? wrap : <CircularProgress color="inherit" />}
        </Button>
      </Stack>
      <BasicAlert alert={alert} setAlert={setAlert} />
    </Paper>
  );
}

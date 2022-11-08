import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { Context } from "../../context";
import { BasicModal, BasicAlert } from "./index";
import { erc20Abi } from "../../utils/abis";

const style = {
  tokenAlert: {
    ml: 2,
  },
};

export function AddNewToken({ open, setOpen }: any) {
  const context = useContext(Context);
  const [alert, setAlert] = useState({
    severity: "success",
    message: "",
    open: false,
  });
  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: 0,
    address: "",
    chainId: "",
  });
  const [tokenAlert, setTokenAlert] = useState(false);

  async function handleChangeAddress(event: any) {
    event.preventDefault();

    const contract = new ethers.Contract(
      event.target.value,
      erc20Abi,
      context?.provider
    );
    try {
      const constractAddress = await contract.resolvedAddress;
      setTokenAlert(false);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();

      setToken({
        name: name,
        symbol: symbol,
        decimals: decimals,
        address: constractAddress,
        chainId: context?.chainId,
      });
    } catch (error) {
      console.log(error);
      setTokenAlert(true);
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const tokenList: any[] = context?.tokenList || [];
    try {
      if (token.chainId === "0x1") {
        // Test repeated address
        for (var i = 0; i < tokenList.length; i++) {
          if (tokenList[i].address === token.address) {
            setAlert({
              severity: "warning",
              message: "Token Address already added.",
              open: true,
            });
            setToken({
              name: "",
              symbol: "",
              decimals: 0,
              address: "",
              chainId: "",
            });
            console.log("");
            setOpen(false);
            return;
          }
        }
        // Add new token to local_added_tokenList_Mainnet
        const new_local_tokenList = JSON.parse(
          localStorage.getItem("local_added_tokenList_Mainnet") || "[]"
        ).concat(token);

        localStorage.setItem(
          "local_added_tokenList_Mainnet",
          JSON.stringify(new_local_tokenList)
        );

        //Refresh component and show success alert

        setToken({
          name: "",
          symbol: "",
          decimals: 0,
          address: "",
          chainId: "",
        });
        setAlert({
          severity: "success",
          message: "Token Address added successfully.",
          open: true,
        });
        setOpen(false);
        window.location.reload();
      }
      if (token.chainId === "0x5") {
        // Test repeated address
        for (var i = 0; i < tokenList.length; i++) {
          if (tokenList[i].address === token.address) {
            setAlert({
              severity: "warning",
              message: "Token Address already added.",
              open: true,
            });
            setToken({
              name: "",
              symbol: "",
              decimals: 0,
              address: "",
              chainId: "",
            });
            console.log("");
            setOpen(false);
            return;
          }
        }
        // Add new token to local_added_tokenList_Mainnet
        const new_local_tokenList = JSON.parse(
          localStorage.getItem("local_added_tokenList_Goerli") || "[]"
        ).concat(token);

        localStorage.setItem(
          "local_added_tokenList_Goerli",
          JSON.stringify(new_local_tokenList)
        );

        //Refresh component and show success alert

        setToken({
          name: "",
          symbol: "",
          decimals: 0,
          address: "",
          chainId: "",
        });
        setAlert({
          severity: "success",
          message: "Token Address added successfully.",
          open: true,
        });
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      setToken({
        name: "",
        symbol: "",
        decimals: 0,
        address: "",
        chainId: "",
      });
      setAlert({
        severity: "error",
        message: "No valid Token Information.",
        open: true,
      });
      setOpen(false);
    }
  }
  return (
    <>
      <BasicModal open={open} setOpen={setOpen}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Box>
              <TextField
                required
                id="add-token-address"
                label="Address"
                fullWidth
                onInput={(e) => handleChangeAddress(e)}
              />
              {tokenAlert && (
                <Typography
                  sx={style.tokenAlert}
                  variant="caption"
                  color="error"
                >
                  * Invalid ERC-20 Contract Address
                </Typography>
              )}
            </Box>

            <TextField
              disabled
              value={token.symbol}
              id="add-token-symbol"
              label="Symbol"
              fullWidth
            />
            <TextField
              disabled
              value={token.name}
              id="add-token-name"
              label="Name"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disableElevation
              fullWidth
            >
              Add
            </Button>
          </Stack>
        </Box>
      </BasicModal>
      <BasicAlert alert={alert} setAlert={setAlert} />
    </>
  );
}

export default AddNewToken;

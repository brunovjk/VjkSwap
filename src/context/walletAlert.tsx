import React from "react";
import {
  Paper,
  ButtonBase,
  Avatar,
  Button,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import { BasicModal } from "../components/_elements";
import Metamask from "../assets/Metamask.png";
import Coinbase from "../assets/Coinbase.png";
import Trust from "../assets/Trust.png";

export const WalletAlert = ({ open, setOpen }: any) => {
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Typography textAlign="center">
        In order to interact with Our Application you Need a{" "}
        <Link
          href="https://www.makeuseof.com/best-browser-extension-crypto-wallets/"
          target="_blank"
          rel="noreferrer"
          color="inherit"
          underline="hover"
        >
          Browser Extension Wallet
        </Link>{" "}
        like:
      </Typography>
      <Paper variant="outlined" sx={{ m: "2rem" }}>
        <ButtonBase
          target="_blank"
          href="https://metamask.io/download/"
          sx={{ width: "100%", p: "1rem" }}
        >
          <Avatar alt="Metamask" src={Metamask} sx={{ mr: "1rem" }} />
          <Typography sx={{ width: "120px" }}>Metamask</Typography>
        </ButtonBase>
      </Paper>
      <Paper variant="outlined" sx={{ m: "2rem" }}>
        <ButtonBase
          target="_blank"
          href="https://www.coinbase.com/wallet/downloads"
          sx={{ width: "100%", p: "1rem" }}
        >
          <Avatar alt="Coinbase Wallet" src={Coinbase} sx={{ mr: "1rem" }} />
          <Typography sx={{ width: "120px" }}>Coinbase Wallet</Typography>
        </ButtonBase>
      </Paper>
      <Paper variant="outlined" sx={{ m: "2rem", mb: "0rem" }}>
        <ButtonBase
          target="_blank"
          href="https://trustwallet.com/deeplink/"
          sx={{ width: "100%", p: "1rem" }}
        >
          <Avatar alt="Trust Wallet" src={Trust} sx={{ mr: "1rem" }} />
          <Typography sx={{ width: "120px" }}>Trust Wallet</Typography>
        </ButtonBase>
      </Paper>
    </BasicModal>
  );
};

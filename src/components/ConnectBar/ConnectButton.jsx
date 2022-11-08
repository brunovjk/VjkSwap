import { ButtonBase, Typography, Paper } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../context";
import { Account, IncorrectNetwork } from "./NetWorkInfo";
import IncorrectNetworkPopup from "./IncorrectNetworkPopup";

const style = {
  borderPrimary: {
    height: "48px",
    width: "196px",
    borderColor: "primary.main",
    borderRadius: "50px",
  },
  borderError: {
    height: "48px",
    width: "196px",
    borderColor: "error.main",
    borderRadius: "50px",
  },
};

export default function ConnectButton() {
  const context = useContext(Context);

  return (
    <Paper
      variant="outlined"
      sx={
        !context.currentAccount
          ? style.borderPrimary
          : context.chainId
          ? style.borderPrimary
          : style.borderError
      }
    >
      {!context.currentAccount ? (
        <ButtonBase sx={style.borderPrimary} onClick={context.connectWallet}>
          <Typography variant="button" color="primary">
            Connect
          </Typography>
        </ButtonBase>
      ) : (
        <>
          {context.chainId ? (
            <Account />
          ) : (
            <>
              <IncorrectNetwork />
              <IncorrectNetworkPopup />
            </>
          )}
        </>
      )}
    </Paper>
  );
}

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ConnectButton from "./ConnectButton";
import { ThemeSwitch } from "../_elements";

const style = {
  paper: {
    borderRadius: "0px 0px 22px 22px",
  },
  Logo: {
    flexGrow: 1,
    cursor: "pointer",
  },
};

export default function ConnectBar({ setTheme }: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={3}
        color="inherit"
        sx={style.paper}
        enableColorOnDark
      >
        <Toolbar>
          <Typography
            variant="h6"
            color="primary"
            component="div"
            sx={style.Logo}
            onClick={() => window.location.reload()}
          >
            VjkSwapp
          </Typography>
          <ThemeSwitch setTheme={setTheme} />
          <ConnectButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

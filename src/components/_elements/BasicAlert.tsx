import { Snackbar, Alert, Link } from "@mui/material";
import React from "react";

export function BasicAlert({ alert, setAlert }: any) {
  const handleClose = () => setAlert({ ...alert, open: false });

  return (
    <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={alert.severity}>
        {alert.message}
        {"  "}
        {alert.hyperLink && alert.hyperLink != "#" && (
          <Link target="_blank" href={alert.hyperLink} underline="hover">
            Etherscan.io
          </Link>
        )}
      </Alert>
    </Snackbar>
  );
}

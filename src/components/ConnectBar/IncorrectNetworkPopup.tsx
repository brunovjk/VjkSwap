import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { BasicModal } from "../_elements";

export default function IncorrectNetworkPopup() {
  const [open, setOpen] = useState(true);

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Incorrect Network
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            textAlign="center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Please, switch to Mainnet, Polygon, Optimism, Arbitrum, Goerli or
            Mumbai.
          </Typography>
        </Grid>
      </Grid>
    </BasicModal>
  );
}

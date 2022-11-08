import { Grid } from "@mui/material";

import React from "react";
import { Balance, TokenInteractions, Wrap } from "../components";
const style = {
  gridContainer: {
    opacity: 10,
  },
  fullWidth: {
    width: "100%",
  },
  shortWidth: {
    width: { xs: "100%", md: "80%" },
  },
};

export default function Home() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      sx={style.gridContainer}
    >
      <Grid item sx={style.fullWidth}>
        <TokenInteractions />
      </Grid>
      <Grid item sx={style.fullWidth}>
        <Wrap />
      </Grid>
      <Grid item sx={style.shortWidth}>
        <Balance />
      </Grid>
    </Grid>
  );
}

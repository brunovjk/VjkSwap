import { Grid, Paper, Typography } from "@mui/material";

import React from "react";
import img from "../../assets/img01.jpg";

const style = {
  gridContainer: {
    height: "100vh",
  },
  paper: {
    padding: "64px",
    borderRadius: "50px",
    borderColor: "primary.main",
  },
};

export default function IncorrectNetwork() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={style.gridContainer}
    >
      <Grid item>
        <Paper sx={style.paper}>
          <Typography>IncorrectNetwork</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

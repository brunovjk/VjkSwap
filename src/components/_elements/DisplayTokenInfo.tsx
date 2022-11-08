import { Divider, Grid, Paper, Typography, ButtonBase } from "@mui/material";
import React from "react";

const style = {
  paper: {
    padding: "12px 24px",
    overflow: "hidden",
  },
  symbol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "55px",
    height: "55px",
    borderRadius: "50px",
  },
};

export function DisplayTokenInfo(props: any) {
  return (
    <Paper sx={style.paper} variant="outlined">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={3}>
          <ButtonBase
            target="_blank"
            href={`https://goerli.etherscan.io/address/${props.address}`}
            sx={style.symbol}
          >
            <Paper sx={style.symbol} variant="outlined">
              <Typography color="primary">
                {props.symbol ? props.symbol : "---"}
              </Typography>
            </Paper>
          </ButtonBase>
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="caption">
                {props.name ? props.name : "-----"}
              </Typography>
            </Grid>
            <Divider />
            <Grid item>
              <Typography variant="button">
                {props.balance ? props.balance : "-.--"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

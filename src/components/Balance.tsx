import { Grid, Paper, Tooltip, IconButton, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";

import { Context } from "../context";
import { FaPlusCircle } from "react-icons/fa";
import { ETHBalance, TokenBalance, AddNewToken } from "./_elements";

const style = {
  paper: {
    padding: "8px 16px 16px 16px",
    borderColor: "primary.light",
  },
  fullWidth: {
    width: "100%",
  },
  marginX: {
    mx: 2,
  },
  marginTop: {
    mt: 0.5,
  },
};

export default function Balance() {
  const context = useContext(Context);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {}, [context?.seed]);

  return (
    <Paper sx={style.paper}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={style.marginTop}
      >
        <Grid item sx={style.fullWidth}>
          <ETHBalance />
        </Grid>
        <Grid item sx={style.fullWidth}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body1" color="primary" sx={style.marginX}>
                ERC-20 Token Balance:
              </Typography>
            </Grid>
            <Grid item>
              <AddNewToken open={open} setOpen={setOpen} />
              <Tooltip title="Add new ERC-20 Token">
                <IconButton onClick={handleOpen} color="primary">
                  <FaPlusCircle />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        {context?.tokenList.map((item: any, index: any) => (
          <Grid key={index} item sx={style.fullWidth}>
            <TokenBalance token={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

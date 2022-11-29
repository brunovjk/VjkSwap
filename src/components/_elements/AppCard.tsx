import { Grid, Stack, Paper, Typography, Box, Link } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../../context";

import logo from "../../assets/VjkSwapLogo.png";
import logoDark from "../../assets/VjkSwapLogoDark.png";

const style = {
  gridContainer: {
    height: "90vh",
  },
  paper: {
    padding: "2rem 3rem",
  },
};

export function AppCard({ title, subTitle, text, paragraph }: any) {
  const context: any = useContext(Context);
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
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography
              fontFamily="Roboto Mono, sans-serif"
              variant="h3"
              color="primary"
            >
              VjkSwapp
            </Typography>
            <Typography
              variant="overline"
              color="primary"
              fontFamily="Roboto Mono, sans-serif"
            >
              A{" "}
              <Link
                target="_blank"
                underline="hover"
                href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/"
              >
                ERC-20
              </Link>{" "}
              Playground
            </Typography>
            <Box
              component="img"
              sx={{
                maxHeight: 180,
                maxWidth: 180,
              }}
              alt="The house from the offer."
              src={context.themeSelector ? logoDark : logo}
            />

            <Typography
              variant="h6"
              color="primary"
              textAlign="center"
              fontFamily="Roboto Mono, monospace"
            >
              {title}
              <br />
              {subTitle}
            </Typography>
            <Typography
              variant="body2"
              color="GrayText"
              textAlign="center"
              sx={{ mt: "1rem", maxWidth: 240 }}
              fontFamily="Roboto Mono, sans-serif"
            >
              {text}
              <br />
              {paragraph}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

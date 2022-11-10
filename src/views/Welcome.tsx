import { AppCard } from "../components/_elements";
import React from "react";
import { Typography, Link } from "@mui/material";

const style = {
  waterMarkRight: {
    position: "fixed",
    bottom: "5px",
    right: "5px",
    opacity: "0.5",
    zIndex: "99",
    color: "white",
  },
  waterMarkLeft: {
    display: { xs: "none", md: "block" },
    position: "fixed",
    bottom: "5px",
    left: "5px",
    opacity: "0.5",
    zIndex: "99",
    color: "white",
  },
  linkColor: {
    color: "inherit",
    "&:hover": {
      color: "secondary.dark",
    },
  },
};

export default function Welcome() {
  return (
    <>
      <AppCard
        title="Connect your wallet"
        subTitle="and Have Fun!"
        text="ERC-20 is Ethereum Request for Comment, number 20."
        paragraph="ERC-20 is the standard for smart contract tokens created using
      Ethereum."
      />
      <Typography sx={style.waterMarkLeft}>Powered by Uniswap</Typography>
      <Typography sx={style.waterMarkRight}>
        Designed by{" "}
        <Link
          href="https://brunovjk.com/"
          sx={style.linkColor}
          underline="none"
          target="_blank"
          rel="noreferrer"
        >
          @brunovjk
        </Link>
      </Typography>
    </>
  );
}

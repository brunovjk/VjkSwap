import { AppCard } from "../components/_elements";
import React from "react";

export default function IncorrectNetwork() {
  return (
    <AppCard
      title="Incorrect Network"
      text="Please, switch to Mainnet, Polygon, Optimism, Arbitrum, Goerli or Mumbai."
    />
  );
}

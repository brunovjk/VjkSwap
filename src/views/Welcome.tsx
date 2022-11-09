import { AppCard } from "../components/_elements";
import React from "react";

export default function Welcome() {
  return (
    <AppCard
      title="Connect your wallet"
      subTitle="and Have Fun!"
      text="ERC-20 is Ethereum Request for Comment, number 20."
      paragraph="ERC-20 is the standard for smart contract tokens created using
      Ethereum."
    />
  );
}

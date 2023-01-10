import React, { useContext } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Context } from "../../context";
import { shortenAddress } from "../../utils/shorten";

export function Account() {
  const context = useContext(Context);
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="caption" color="primary.main">
        {context?.chainId === 1 && "ETH Mainnet"}
        {context?.chainId === 5 && "Görli Testnet"}
        {context?.chainId === 137 && "Polygon Mainnet"}
        {context?.chainId === 80001 && "Mumbai Testnet"}
        {context?.chainId === 10 && "Optimism"}
        {context?.chainId === 42161 && "Arbitrum One"}
      </Typography>
      <Typography variant="body1" color="primary.main">
        {context?.currentAccount.provider.provider.selectedAddress &&
          shortenAddress(
            context?.currentAccount.provider.provider.selectedAddress
          )}
      </Typography>
    </Stack>
  );
}
export function IncorrectNetwork() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="caption" color="error.main">
        Incorrect Network
      </Typography>
      <Typography variant="body2" color="error.main">
        Switch Network
      </Typography>
    </Stack>
  );
}

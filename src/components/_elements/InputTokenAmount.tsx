import {
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import React, { useState } from "react";

const style = {
  paper: {
    padding: "12px",
    borderRadius: "25px",
  },
};

export function InputTokenAmount({
  inputTokenInfo,
  setInputTokenInfo,
  disabled,
  disabledAmount,
  loading,
}: any) {
  const [value, setValue] = useState();

  return (
    <Paper sx={style.paper} variant="outlined">
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={5}>
          {loading ? (
            <Stack
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              <Typography textAlign="center" variant="caption" color="primary">
                Loading pools...
              </Typography>
              <LinearProgress color="primary" />
            </Stack>
          ) : (
            <Select
              required
              disabled={disabled}
              fullWidth
              id="input-token-select"
              value={value ? value : "Token"}
              onChange={(e: any) => {
                setValue(e.target.value);
                setInputTokenInfo({
                  ...inputTokenInfo,
                  token: e.target.value.address,
                  name: e.target.value.name,
                  symbol: e.target.value.symbol,
                  decimals: e.target.value.decimals,
                });
              }}
            >
              <MenuItem value={"Token"}>
                <Typography color="GrayText">Token</Typography>
              </MenuItem>
              {inputTokenInfo.tokenList.map((token: any, index: any) => (
                <MenuItem key={index} value={token}>
                  <Grid item>{token.symbol}</Grid>
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>
        <Grid item xs={7}>
          <TextField
            required={!disabled}
            disabled={disabled || disabledAmount}
            type="number"
            inputProps={{ step: ".000000000000000001", min: 0 }}
            id="input-token-amountIn"
            label={inputTokenInfo.label}
            onInput={(e: any) =>
              setInputTokenInfo({
                ...inputTokenInfo,
                amount: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

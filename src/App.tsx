import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";

import React, { useContext } from "react";

import { Container, Box, Paper, Toolbar } from "@mui/material";
import { ConnectBar } from "./components";
import { Home, Welcome, IncorrectNetwork, Loading } from "./views";
import { Context } from "./context";
import { style } from "./stylesApp";

function App() {
  const context: any = useContext(Context);

  return (
    <ThemeProvider theme={context?.themeSelector ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        component="div"
        sx={[
          style.appContainer,
          !context?.currentAccount ? style.welcome : style.app,
        ]}
      >
        <ConnectBar setTheme={context?.setThemeSelector} />
        {context?.currentAccount ? (
          context?.chainId === 1 ||
          context?.chainId === 5 ||
          context?.chainId === 137 ||
          context?.chainId === 80001 ||
          context?.chainId === 10 ||
          context?.chainId === 42161 ? (
            context?.loadingApp ? (
              <Loading />
            ) : (
              <>
                <Container maxWidth="sm" disableGutters>
                  <Paper
                    sx={[
                      style.gridContainer,
                      context?.themeSelector
                        ? style.darkThemeContainer
                        : style.lightThemeContainer,
                    ]}
                    elevation={6}
                  >
                    <Home />
                  </Paper>
                </Container>
                <Toolbar />
              </>
            )
          ) : (
            <IncorrectNetwork />
          )
        ) : (
          <Box>
            <Welcome />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;

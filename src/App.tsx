import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";

import React, { useContext, useState } from "react";

import { Container, Box, Paper, Toolbar } from "@mui/material";
import { ConnectBar } from "./components";
import { Home, Welcome } from "./views";
import { Context } from "./context";
import { style } from "./stylesApp";

function App() {
  const context: any = useContext(Context);
  const [themeSelector, setThemeSelector] = useState(
    localStorage.getItem("themeSelector") ?? false
  );

  return (
    <ThemeProvider theme={themeSelector ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        component="div"
        sx={[
          style.appContainer,
          !context.currentAccount ? style.welcome : style.app,
        ]}
      >
        <ConnectBar setTheme={setThemeSelector} />
        {context.currentAccount ? (
          context.chainId ? (
            <>
              <Container maxWidth="sm" disableGutters>
                <Paper
                  sx={[
                    style.gridContainer,
                    themeSelector
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
          ) : (
            <Welcome /> // Incorrent network
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

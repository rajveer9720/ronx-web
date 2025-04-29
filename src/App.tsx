import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import Navigation from "./Navigation";
import { Web3ModalProvider } from "./providers/web3Provider";

function App() {
  return (
    <Web3ModalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
      </ThemeProvider>
    </Web3ModalProvider>
  );
}

export default App;

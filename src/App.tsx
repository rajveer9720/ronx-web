import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Navigation from "./Navigation";
import { Web3ModalProvider } from "./providers/web3Provider";
import theme from "./utils/theme";

function App() {
  localStorage.setItem("toolpad-mode", "dark");
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

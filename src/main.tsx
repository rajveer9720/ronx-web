import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./components/SnackbarProvider";
import { SnackbarUtilsConfigurator } from "./components/SnackbarUtils";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

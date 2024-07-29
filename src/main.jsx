import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./app/store.js";

import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import theme from "./configs/theme.js";

import defaultOptions from "./configs/reactQuery.js";

import "./styles/font.css";
import "./styles/global.css";

const queryClient = new QueryClient({ defaultOptions });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={2} autoHideDuration={3000}>
          <Provider store={store}>
            <App />
          </Provider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

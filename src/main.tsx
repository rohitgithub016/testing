import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import eruda from "eruda";
import WebApp from "@twa-dev/sdk";

eruda.init();

WebApp.disableVerticalSwipes()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://ipfs.io/ipfs/QmUGoWd9pC3BteB85BoCaMZAVJm8qc2wPYDBe2YsNWoK7R">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "src/index.css";
import { RouterProvider } from "react-router-dom";
import router from "src/router/index";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "src/store/index";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Spinner from "./Component/Page/Spinner";
import WebApp from "@twa-dev/sdk";

WebApp.expand();
WebApp.disableVerticalSwipes();
WebApp.ready();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Scandia-Medium",
        },
        components: {
          Button: {
            paddingBlockLG: 14,
          },
          Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
            fontSizeHeading1: 32,
            fontSizeHeading2: 24,
            fontSizeHeading3: 20,
            fontSizeHeading4: 18,
            fontSizeHeading5: 16,
            colorTextHeading: "#101019",
            fontWeightStrong: 500,
            colorLink: "#3B63F6",
          },
        },
      }}
    >
      <Provider store={store}>
        <TonConnectUIProvider manifestUrl="https://ipfs.io/ipfs/QmUGoWd9pC3BteB85BoCaMZAVJm8qc2wPYDBe2YsNWoK7R">
          <Suspense fallback={<Spinner />}>
            <RouterProvider router={router} />
          </Suspense>
        </TonConnectUIProvider>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

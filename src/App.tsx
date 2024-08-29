import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    WebApp?.setHeaderColor("#fff");
    WebApp?.disableVerticalSwipes();
    WebApp.themeParams.bg_color = "#ff0000"
    console.log(WebApp.themeParams)
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      App
    </div>
  );
};

export default App;

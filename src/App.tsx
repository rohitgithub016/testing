import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // WebApp?.setHeaderColor(WebApp?.themeParams?.bg_color);
    console.log(WebApp?.themeParams)
    console.log(WebApp?.themeParams?.secondary_bg_color);
    console.log(WebApp?.headerColor)

    WebApp?.setHeaderColor("#000000");

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

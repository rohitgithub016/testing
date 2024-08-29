import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    WebApp?.setHeaderColor(WebApp?.themeParams?.secondary_bg_color);
    console.log(WebApp?.themeParams?.bg_color)
    console.log(WebApp?.themeParams?.secondary_bg_color);

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

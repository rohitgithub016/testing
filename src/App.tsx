import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";


const App = () => {

  useEffect(()=>{
    console.log(WebApp);
    console.log(WebApp?.themeParams)
    WebApp?.setHeaderColor(WebApp?.themeParams?.secondary_bg_color);
    WebApp?.setBackgroundColor(WebApp?.themeParams?.secondary_bg_color);
  },[])

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
      Hello World
    </div>
  );
};

export default App;

import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";


const App = () => {

  useEffect(()=>{
    console.log(WebApp);
    console.log(WebApp?.themeParams)
    WebApp.setBackgroundColor("#f4f4f5")
    WebApp.setHeaderColor("#f4f4f5");
    WebApp.themeParams.text_color = "#FF0000"
    WebApp.themeParams.bg_color = "#FF0000"
    WebApp.themeParams.button_color = "#FF0000"
    WebApp.themeParams.destructive_text_color = "#FF0000"
    WebApp.themeParams.header_bg_color = "#0000"
    WebApp.themeParams.hint_color = "#FF0000"
    WebApp.themeParams.link_color = "#FF0000"
    WebApp.themeParams.secondary_bg_color = "#FF0000"
    WebApp.themeParams.section_bg_color = "#FF0000"
    WebApp.themeParams.section_header_text_color = "#FF0000"
    WebApp.themeParams.section_separator_color = "#FF0000"
    WebApp.themeParams.subtitle_text_color = "#FF0000"

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

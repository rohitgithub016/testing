import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";


const App = () => {

  useEffect(()=>{
    WebApp.setBackgroundColor("#f4f4f5")
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

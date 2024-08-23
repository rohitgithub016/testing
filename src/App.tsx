import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  useEffect(()=>{
    WebApp?.setHeaderColor("#fff")
  }, [])
  return (
    <div
      style={{
        height: "calc(100vh - 20px)", // Adjust height to avoid overflow
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Ensure no overflow
        boxSizing: "border-box", 
      }}
    >
      App
    </div>
  );
};

export default App;

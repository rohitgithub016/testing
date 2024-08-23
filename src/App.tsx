import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  useEffect(()=>{
    WebApp?.setHeaderColor("#fff")
  }, [])
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      App
    </div>
  );
};

export default App;

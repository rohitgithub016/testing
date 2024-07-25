import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

const App = () => {
  const botUsername = "hubz_dev_v2_bot";

  const [display, setDisplay] = useState("none")

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
    setDisplay("block")
  };

  const handleOverLay = () => {
    setDisplay("none")
  };

  useEffect(()=>{
    window.addEventListener("focus", ()=>console.log("focused"))
    window.addEventListener("blur", ()=>console.log("blur"))

  },[])

  return (
    <>
      <div
        id="overlay"
        onClick={handleOverLay}
        style={{
          position: "fixed",
          display: display,
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 2,
          cursor: "pointer",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* <h1>{vState}</h1> */}
        <button onClick={handleClick}>Add Group</button>
      </div>
    </>
  );
};

export default App;

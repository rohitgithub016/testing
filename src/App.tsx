import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  useEffect(()=>{
    window.addEventListener('focus', () => {
      console.log("focus")
    })
    window.addEventListener('blur', () => {
      console.log("blur")
    })
  },[])
  const handleClick = () => {
    const a = WebApp.openTelegramLink(
      `https://t.me/weekendPac_bot?startgroup=true`
    );
    console.log(a);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={handleClick}>Open</button>
    </div>
  );
};

export default App;

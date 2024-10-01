import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  useEffect(()=>{
    window.addEventListener('focus', () => {
      console.log("focus")
      setText("focus");
    })
    window.addEventListener('blur', () => {
      console.log("blur")
      setText("blur");
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
        color: 'red',
        fontSize: '54px'
      }}
    >
      <>{text}</>
      <button onClick={handleClick}>Open</button>
    </div>
  );
};

export default App;

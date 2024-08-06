import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  const botUsername = "hubz_dev_v2_bot";

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
  };

  useEffect(()=>{
    WebApp.setBackgroundColor("#EFEFF4")
  }, [])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <button onClick={handleClick}>Add Group</button>
    </div>
  );
};

export default App;

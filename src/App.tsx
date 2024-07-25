import { useState } from "react";
import WebApp from "@twa-dev/sdk";

const App = () => {
  const botUsername = "hubz_dev_v2_bot";

  const [vState, setVState] = useState("First");

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
    WebApp.showAlert("Refresh", () => {
      console.log("refetch data");
      setVState("refetch")
    })
  };




  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>{vState}</h1>
      <button onClick={handleClick}>Add Group</button>
    </div>
  );
};

export default App;

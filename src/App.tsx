import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";

const App = () => {
  const botUsername = "hubz_dev_v2_bot";

  const [vState, setVState] = useState<string[]>([]);

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
  };


  const handlePageShow = () => {

      setVState((prev) => [...prev, `${prev?.length}___VISIBLE`]);

  };

  const handlePageHide = () => {

      setVState((prev) => [...prev, `${prev?.length}___VISIBLE`]);
  
  };


  useEffect(() => {
    window.addEventListener("blur", handlePageHide);
    window.addEventListener("focus", handlePageShow);

    return () => {
      window.removeEventListener("blur", handlePageHide);
      window.removeEventListener("focus", handlePageShow);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Hello World</h1>
      <button onClick={handleClick}>Add Group</button>
      {vState?.map((s) => (
        <div>{s}</div>
      ))}
    </div>
  );
};

export default App;

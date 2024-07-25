import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";

const App = () => {
  const botUsername = "hubz_dev_v2_bot";

  const [vState, setVState] = useState<string[]>([]);

  const handleClick = () => {
    console.log(document?.hasFocus());
    // WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
    WebApp.openLink(`https://t.me/${botUsername}?startgroup=true`, {try_instant_view: true});

    console.log(document?.hasFocus());
  };


  const handlePageShow = () => {

      setVState((prev) => [...prev, `${prev?.length}___VISIBLE`]);

  };

  const handlePageHide = () => {

      setVState((prev) => [...prev, `${prev?.length}___VISIBLE`]);
  
  };


  useEffect(() => {
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  console.log(document?.hasFocus());
  console.log(WebApp?.viewportStableHeight)

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

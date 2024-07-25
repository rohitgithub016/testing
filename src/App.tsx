import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";

const App = () => {
  const botUsername = "hubz_dev_v2_bot";

  const [vState, setVState] = useState<string[]>([]);

  const handleClick = () => {
    console.log(document?.hasFocus());
    // WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
    WebApp.openInvoice(`https://t.me/${botUsername}?startgroup=true`, () => {console.log("opened")});

    console.log(document?.hasFocus());
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      console.log(
        "Mini App is not visible. The Telegram link might be open or the user is away."
      );
      setVState((prev) => [...prev, `${prev?.length}___HIDDEN`]);
    } else {
      setVState((prev) => [...prev, `${prev?.length}___VISIBLE`]);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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

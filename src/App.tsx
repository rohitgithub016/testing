import { useEffect, useState } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {
  console.log(WebApp);

  const [settings, setSettingsClicked] = useState("not CCLIKED");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    (window as any).Telegram?.WebView?.postEvent("web_app_open_tg_link", () => {
      console.log("Hello world");
      WebApp?.close();
      if (buttonClicked) {
      }
    });

    WebApp.onEvent("settingsButtonClicked", () => {
      console.log("clicked");
      setSettingsClicked("clicked");
    });

    WebApp.SettingsButton.show();
  }, []);

  const [group, setGroup] = useState("https://t.me/+_RiWhOpbYGg2ZDg1");

  const handleClick = () => {
    setButtonClicked(true);
    console.log(WebApp.openTelegramLink(group));
    WebApp.openTelegramLink(group);
    // WebApp?.close();
  };

  const handleChange = (event: any) => {
    setGroup(event?.target?.value);
  };

  return (
    <div>
      Hello WOrlsd{" "}
      {(window as any).Telegram?.WebApp?.initDataUnsafe?.user?.username}
      <input onChange={handleChange} />
      <button onClick={handleClick}>Click Me</button>
      <p>{WebApp?.version}</p>
      <p>{(window as any).Telegram?.WebApp?.version ? "Hello" : "World"}</p>
      <p>{WebApp?.SettingsButton?.isVisible ? "Hello" : "World"} </p>
      <p>{settings}</p>
      <p></p>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {
  console.log(WebApp);

  const [settings, setSettingsClicked] = useState("not CCLIKED");

  useEffect(() => {
    (window as any).Telegram?.WebApp?.SettingsButton.hide();

    WebApp.onEvent("settingsButtonClicked", () => {
      console.log("clicked");
      setSettingsClicked("clicked");
    });

    WebApp.SettingsButton.show();
  }, []);

  const [group, setGroup] = useState("https://t.me/+_RiWhOpbYGg2ZDg1");

  const handleClick = () => {
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

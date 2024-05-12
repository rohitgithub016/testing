import { useState } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {
  console.log(WebApp);

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
    </div>
  );
}

export default App;

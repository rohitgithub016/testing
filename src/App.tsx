import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {
  console.log(WebApp);
  const handleClick = () => {
    WebApp.openTelegramLink("https://t.me/+_RiWhOpbYGg2ZDg1");
  };
  return (
    <div>
      Hello WOrlsd{" "}
      {(window as any).Telegram?.WebApp?.initDataUnsafe?.user?.username}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;

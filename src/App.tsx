import "./App.css";
import WebApp from "@twa-dev/sdk";

function App() {
  return (
    <div>
      Hello WOrlsd {window?.Telegram?.WebApp?.initDataUnsafe?.user?.username}
    </div>
  );
}

export default App;

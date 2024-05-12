import "./App.css";

function App() {
  return (
    <div>
      Hello WOrlsd{" "}
      {(window as any).Telegram?.WebApp?.initDataUnsafe?.user?.username}
    </div>
  );
}

export default App;

import "./App.css";
import useTelegramAuth from "@use-telegram-auth/hook";

function App() {
  const BOT_ID = "7023151966";

  const { onAuth } = useTelegramAuth(
    BOT_ID,
    {
      windowFeatures: { popup: true },
    },
    {
      onSuccess: (result) => {
        console.log(result);
      },
    }
  );
  const hanldeClick = async () => {
    onAuth();
  };

  return <button onClick={hanldeClick}>{"Login"}</button>;
}

export default App;

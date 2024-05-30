import "./App.css";
import telegramLogin from "telegram-bot-auth";

function App() {
  const handleClick = async () => {
    try {
      const params = {
        botId: 7023151966, // telergam id of bot
        botNick: "weekendPrac", // telegram username of bot
        origin: "https://testing-six-gilt.vercel.app/", // domain that is linked to your bot
        phone: "+917908027118", // phone number to auth
      };
      const tgUser = await telegramLogin(params);
      console.log(tgUser);
    } catch (error) {
      console.error("Telegram auth error", error);
    }
  };
  return <button onClick={handleClick}>Click me</button>;
}

export default App;

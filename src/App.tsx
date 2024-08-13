import WebApp from "@twa-dev/sdk";

const App = () => {
  const handleClick = () => {
    WebApp.openLink('https://telegram.org/tos/mini-apps')
  }
  return (
    <div>
      <a href="https://telegram.org/tos/mini-apps">Link external</a>
      <button onClick={handleClick}>Telegram</button>
    </div>
  );
};

export default App;

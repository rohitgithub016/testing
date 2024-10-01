import WebApp from "@twa-dev/sdk";

const App = () => {
  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/weekendPac_bot?startgroup=true`);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button onClick={handleClick}>Open</button>
    </div>
  );
};

export default App;

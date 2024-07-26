import WebApp from "@twa-dev/sdk";

const App = () => {
  const botUsername = "hubz_dev_v2_bot";

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
  };

  WebApp.onEvent("mainButtonClicked", function () {
    console.log("Main button clicked");
  });

  WebApp.onEvent("viewportChanged", () => {
    console.log("viewPort changed");
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <button onClick={handleClick}>Add Group</button>
    </div>
  );
};

export default App;

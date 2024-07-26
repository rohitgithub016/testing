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

  WebApp.onEvent("themeChanged", ()=>{
    console.log("themeChanged")
  })
  WebApp.onEvent("backButtonClicked", ()=>{
    console.log("backButtonClicked")
  })
  WebApp.onEvent("settingsButtonClicked", ()=>{
    console.log("settingsButtonClicked")
  })

  WebApp.onEvent("invoiceClosed", ()=>{
    console.log("invoiceClosed")
  })

  WebApp.onEvent("popupClosed", ()=>{
    console.log("popupClosed")
  })

  WebApp.onEvent("qrTextReceived", ()=>{
    console.log("qrTextReceived	")
  })

  WebApp.onEvent("clipboardTextReceived", ()=>{
    console.log("clipboardTextReceived")
  })

  WebApp.onEvent("writeAccessRequested", ()=>{
    console.log("writeAccessRequested")
  })

  WebApp.onEvent("contactRequested", ()=>{
    console.log("contactRequested")
  })


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

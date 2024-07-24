import WebApp from "@twa-dev/sdk";


const VisibilityTracker = () => {
  const botUsername = "weekendPac_bot";
  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`)
  }
  WebApp.onEvent("themeChanged", () => {
    console.log("themeChanged");
  })
  WebApp.onEvent("viewportChanged", () => {
    console.log("viewportChanged");
  })
  WebApp.onEvent("mainButtonClicked", () => {
    console.log("mainButtonClicked");
  })
  WebApp.onEvent("backButtonClicked", () => {
    console.log("backButtonClicked");
  })
  WebApp.onEvent("settingsButtonClicked", () => {
    console.log("settingsButtonClicked");
  })
  WebApp.onEvent("invoiceClosed", () => {
    console.log("invoiceClosed");
  })
  WebApp.onEvent("popupClosed", () => {
    console.log("popupClosed");
  })
  WebApp.onEvent("qrTextReceived", () => {
    console.log("qrTextReceived");
  })
  WebApp.onEvent("clipboardTextReceived", () => {
    console.log("clipboardTextReceived");
  })
  WebApp.onEvent("writeAccessRequested", () => {
    console.log("writeAccessRequested");
  })
  WebApp.onEvent("contactRequested", () => {
    console.log("contactRequested");
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  console.log(window.Telegram.WebView);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  window.Telegram.WebView.postEvent('web_app_open_tg_link', () => {
    console.log("sadfasdjflasjdf;la")
  })

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default VisibilityTracker;

import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log(WebApp);
    console.log(WebApp?.themeParams);
    console?.log(WebApp?.initData);
    WebApp?.setHeaderColor(WebApp?.themeParams?.secondary_bg_color);
    WebApp?.setBackgroundColor(WebApp?.themeParams?.secondary_bg_color);
  }, []);

  const callApi = async () => {
    await fetch("https://api-dev.hubz.io/api/v0/subscriber/payment-success", {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-api-key": "ovIfmVfSIZ2iqiFzuGqrh2mHF6STcqa71DSf9jPJ",
      },
      body: JSON.stringify({
        subscriptionId: "66d59415beaf2bf54d935f40",
        username: "rohitbhandari016",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        WebApp.openTelegramLink(data?.data?.inviteLink);
        WebApp.openLink(data?.data?.inviteLink);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleClick = () => {
    callApi();
  };

  const handleClick1 = () => {
    WebApp?.openTelegramLink("https://t.me/+OFHuZeYqSB1jNTE9");
  }

  const handleClick2 = () => {
    WebApp?.openLink("https://t.me/+OFHuZeYqSB1jNTE9");
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      <button onClick={handleClick}>Click Me</button>
      <button onClick={handleClick1}>Click Me 1</button>
      <button onClick={handleClick2}>Click Me 2</button>

    </div>
  );
};

export default App;

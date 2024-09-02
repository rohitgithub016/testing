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

  const handleClick = () => {
    WebApp.openTelegramLink(
      `https://t.me/weekendPac_bot?startgroup=true&admin=manage_chat invite_users change_info post_messages edit_messages delete_messages pin_messages restrict_members`
    );
  };

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
    </div>
  );
};

export default App;

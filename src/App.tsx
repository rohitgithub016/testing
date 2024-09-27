import WebApp from "@twa-dev/sdk";
import ChainLinkChat from "./Onboarding/ChainLinkChat";

const App = () => {
  // const handleClick = () => {
  //   WebApp.openTelegramLink(`https://t.me/undefined?startgroup=true`);
  // };

  // const handleClick1 = () => {
  //   WebApp.openTelegramLink(
  //     `https://t.me/undefined?startgroup=true&admin=manage_chat invite_users change_info post_messages edit_messages delete_messages pin_messages restrict_members`
  //   );
  // };

  console.log(WebApp.initDataUnsafe?.chat);
  console.log(WebApp.initDataUnsafe);
  console.log(WebApp?.initData);
  console.log(WebApp?.initDataUnsafe);

  return <ChainLinkChat />;
};

export default App;

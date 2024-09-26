import WebApp from "@twa-dev/sdk";


const App = () => {

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/undefined?startgroup=true`)
  }

  const handleClick1 = () => {
    WebApp.openTelegramLink(
      `https://t.me/undefined?startgroup=true&admin=manage_chat invite_users change_info post_messages edit_messages delete_messages pin_messages restrict_members`

    )
  }


  console.log(WebApp.initDataUnsafe?.chat);
  console.log(WebApp.initDataUnsafe);
  console.log(WebApp?.initData);
  console.log(WebApp?.initDataUnsafe);
  



  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <button onClick={handleClick}>Clickme</button>
      <button onClick={handleClick1}>Clickme1</button>

    </div>
  );
};

export default App;

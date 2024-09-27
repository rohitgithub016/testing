import WebApp from "@twa-dev/sdk";

const App = () => {
 const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/undefined?startgroup=true`);
  };

  const handleClick1 = () => {
    WebApp.openTelegramLink(
      `https://t.me/undefined?startgroup=true&admin=manage_chat invite_users change_info post_messages edit_messages delete_messages pin_messages restrict_members`
    );
  };

  console.log(WebApp.initDataUnsafe?.chat);
  console.log(WebApp.initDataUnsafe);
  console.log(WebApp?.initData);
  console.log(WebApp?.initDataUnsafe);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: '#fff',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 77px)',
          overflow: 'scroll'
        }}
      >
        <button onClick={handleClick}>Clickme</button>
        <button onClick={handleClick1}>Clickme1</button>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magnam optio sed veritatis perspiciatis voluptatum excepturi aut explicabo adipisci, alias aperiam ea id amet sapiente dolorem. Impedit enim veritatis voluptatem.</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magnam optio sed veritatis perspiciatis voluptatum excepturi aut explicabo adipisci, alias aperiam ea id amet sapiente dolorem. Impedit enim veritatis voluptatem.</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magnam optio sed veritatis perspiciatis voluptatum excepturi aut explicabo adipisci</h1>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos magnam optio sed veritatis perspiciatis voluptatum excepturi aut explicabo adipisci This is the end</h1>

      </div>
      <div
        id="bottom-btn"
        style={{
          position: "fixed",
          bottom: 0,
          background: "#000",
          color: "#fff",
          width: '100%',
          padding: '20px'

        }}
      >
        <h1 style={{textAlign: 'center'}}>Hello World</h1>
      </div>
    </>
  );
};

export default App;

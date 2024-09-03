import WebApp from "@twa-dev/sdk";
import { SetStateAction, useEffect, useState } from "react";

const App = () => {

  const  [customlink, setLink] = useState('');
  const [openLink, setOpen] = useState(false);

  useEffect(()=>{
    if(openLink){
      WebApp?.openTelegramLink(customlink);
      setOpen(false)
    }
  }, [openLink]);

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
        subscriptionId: "66d6a021045a39eb97eef588",
        username: "rohitbhandari016",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLink(data?.data?.inviteLink);
        setOpen(true)
        // WebApp.openLink(data?.data?.inviteLink);
      })
      .catch((error) => console.error("Error:", error));
  };

  const callApi1 = async () => {
    await fetch("https://api-dev.hubz.io/api/v0/subscriber/payment-success", {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-api-key": "ovIfmVfSIZ2iqiFzuGqrh2mHF6STcqa71DSf9jPJ",
      },
      body: JSON.stringify({
        subscriptionId: "66d6a021045a39eb97eef588",
        username: "rohitbhandari016",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
          WebApp.openLink(data?.data?.inviteLink);
        // WebApp.openLink(data?.data?.inviteLink);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleClick = () => {
    callApi();
  };

  // const handleClick1 = () => {
  //   WebApp?.openTelegramLink("https://t.me/+OFHuZeYqSB1jNTE9");
  // }

  const handleClick2 = () => {
    WebApp?.openLink("https://t.me/+caiisgDR2oJkMjA1");
  }

  const handleInput = (event: { target: { value: SetStateAction<string>; }; }) => {
    setLink(event?.target?.value)
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent scrollbars
        flexDirection: 'column'
      }}
    >
      <input onChange={handleInput}/>
      <button onClick={handleClick}>Click Me</button>
      <button onClick={callApi1}>Click Me 1</button>
      <button onClick={handleClick2}>Click Me 2</button>

    </div>
  );
};

export default App;

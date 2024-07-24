import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const VisibilityTracker = () => {

  const getVisibility = (data: boolean) => {
    if (data) {
      return "hidden"
    }
    return "visible"
  }

  const [isVisible, setIsVisible] = useState([getVisibility(!document.hidden)]);
  // const botUsername = 'weekendPac_bot';
  const botUsername = "hubz_dev_v2_bot"



  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
    startVisibilityCheck();
  };

  const handleVisibilityChange = () => {
    setIsVisible(prev => [...prev, getVisibility(!document.hidden)]);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const startVisibilityCheck = () => {
    const intervalId = setInterval(() => {
      if (!document.hidden) {
        setIsVisible(prev => [...prev, getVisibility(true)]);
        clearInterval(intervalId);
      }
    }, 1000); // Check every second
  };

  const [todo, setTodo] = useState<string[]>([])

  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'x-api-key': 'ovIfmVfSIZ2iqiFzuGqrh2mHF6STcqa71DSf9jPJ'
    }
  };

  

  useEffect(() => {
  
    console.log(new Date().toISOString())
    fetch(`https://api-dev.hubz.io/api/v0/group?creatorUsername=rohitbhandari016`, options)
      .then(response => response.json())
      .then(json => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
         setTodo(json.data.map((group) => group?.groupName))
      })
  }, [isVisible])

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'scroll' }}>
      <button onClick={handleClick}>Click me</button>
      {todo?.map(t => <div>{t}</div>)}
    </div>
  );
};

export default VisibilityTracker;

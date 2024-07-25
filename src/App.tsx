import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const App = () => {
  const botUsername = "hubz_dev_v2_bot"

  const [vState, setVState] = useState<string[]>([])

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      console.log('Mini App is not visible. The Telegram link might be open or the user is away.');
      setVState((prev) => [...prev, `${prev?.length}___HIDDEN`])
    } else {
      setVState((prev) => [...prev, `${prev?.length}___VISIBLE`])
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',  }}>
    <h1>Hello World</h1>
    <button onClick={handleClick}>Add Group</button>
    {vState?.map(s => <div>{s}</div>)}
  </div>)
}

export default App;
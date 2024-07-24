import { useState, useEffect } from 'react';
import WebApp from "@twa-dev/sdk";

const VisibilityTracker = () => {
  const botUsername = "weekendPac_bot";

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`)
  }

  const [visibility, setVisibility] = useState<string[]>([document.visibilityState]);

  const handleVisibilityChange = () => {
    setVisibility(prev => [...prev, `${document.visibilityState}${prev.length}`]);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <ul>
        {visibility.map(item => <li>{item}</li>)}
      </ul>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default VisibilityTracker;

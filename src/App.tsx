import  { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const VisibilityTracker = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const botUsername = 'weekendPac_bot';

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
    startVisibilityCheck();
  };

  const handleVisibilityChange = () => {
    setIsVisible(!document.hidden);
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
        setIsVisible(true);
        clearInterval(intervalId);
      }
    }, 1000); // Check every second
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <button onClick={handleClick}>Click me</button>
      <p>{isVisible ? 'Mini app is visible' : 'Mini app is hidden'}</p>
    </div>
  );
};

export default VisibilityTracker;

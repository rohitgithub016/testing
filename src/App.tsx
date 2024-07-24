import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const VisibilityTracker = () => {

  const getVisibility = (data: boolean) => {
    if(data){
        return "hidden"
    } 
    return "visible"
}

  const [isVisible, setIsVisible] = useState([getVisibility(!document.hidden)]);
  const botUsername = 'weekendPac_bot';

  

  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`);
    startVisibilityCheck();
  };

  const handleVisibilityChange = () => {
    setIsVisible(prev =>  [...prev, getVisibility(!document.hidden)]);
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
        setIsVisible(prev =>  [...prev, getVisibility(true)]);
        clearInterval(intervalId);
      }
    }, 1000); // Check every second
  };


  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
  }, [isVisible])

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default VisibilityTracker;

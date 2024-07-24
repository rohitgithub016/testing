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

  const [count, setCount] = useState(1);
  const [todo, setTodo] = useState<string[]>([])


  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
      .then(response => response.json())
      .then(json => {
        setCount(prev => prev + 1);
        setTodo(prev => [...prev, `${count}___${json?.title}`])
      })
  }, [isVisible])

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'scroll' }}>
      <button onClick={handleClick}>Click me</button>
      {todo?.map(t=><div>{t}</div>)}
    </div>
  );
};

export default VisibilityTracker;

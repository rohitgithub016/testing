import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";


const VisibilityTracker = () => {
  const getVisi = (data: boolean) => {
    if(data){
      return "visible"
    }
    return "hidden"
  }
  const [isVisible, setIsVisible] = useState<string[]>([getVisi(!document.hidden)]);
  const botUsername = "weekendPac_bot";
  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`)
  }


  console.log(isVisible);

  const handleVisibilityChange = () => {
    setIsVisible(prev => [...prev, `${getVisi(!document.hidden)}${prev.length}`]);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {isVisible.map(item => <div>{item}</div>)}
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default VisibilityTracker;

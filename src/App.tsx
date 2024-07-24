import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";


const VisibilityTracker = () => {

  const [isVisible, setIsVisible] = useState<string[]>([]);
  const botUsername = "weekendPac_bot";
  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`)
  }

  const [value, setValue] = useState("")

  console.log(document?.visibilityState)

  useEffect(()=>{
    setInterval(()=>{
      setValue(document?.visibilityState)
    }, 1000)
  },[])

  useEffect(() => {
    
      // Handle visibility change
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
          console.log('Page is hidden');
          setIsVisible(prev => [...prev, `${prev?.length}_HIDDEN`])
          // Add your custom logic here
        } else if (document.visibilityState === 'visible') {
          console.log('Page is visible');
          setIsVisible(prev => [...prev, `${prev?.length}_VISIBLE`])

          // Add your custom logic here
        }
      });
    
      // Handle focus and blur events
      window.addEventListener('focus', function() {
        console.log('Window is focused');
        // Add your custom logic here
        setIsVisible(prev => [...prev, `${prev?.length}_VISIBLE`])

      });
    
      window.addEventListener('blur', function() {
        console.log('Window is blurred');
        // Add your custom logic here
        setIsVisible(prev => [...prev, `${prev?.length}_HIDDEN`])

      });
    
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {isVisible.map(item => <div>{item}</div>)}
      <button onClick={handleClick}>Click me</button>
      <div>{value}</div>
    </div>
  );
};

export default VisibilityTracker;

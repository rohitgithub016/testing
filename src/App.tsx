import WebApp from "@twa-dev/sdk";
import "./App.css";
import { useEffect, useState } from "react";


function App() {
  const botUsername = "weekendPac_bot";

  const [tracker, setTracker] = useState<string[]>([]);


  const handleClick = () => {
    WebApp.openTelegramLink(`https://t.me/${botUsername}?startgroup=true`)
  }

  const handleFocus = () => {
    setTracker(prevTracker => [...prevTracker, `"FOCUS"${prevTracker?.length}`]);
  };

  const handleBlur = () => {
    setTracker(prevTracker => [...prevTracker, `"BLUR"${prevTracker?.length}`]);
  };

  useEffect(() => {
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);



  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <ul>
        {tracker.map(item => <li>{item}</li>)}
      </ul>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;

import WebApp from "@twa-dev/sdk";
import  { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log(WebApp?.initData);
  }, []);
  return <div>App</div>;
};

export default App;

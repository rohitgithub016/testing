import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import Carousel from "./Carousel/Carousel";

const App = () => {
  useEffect(() => {
    console.log(WebApp?.initData);
  }, []);
  return (
    <div>
      <Carousel />
    </div>
  );
};

export default App;

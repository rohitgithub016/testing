import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import Carousel from "./Carousel/Carousel";

const App = () => {
  useEffect(() => {
    console.log(WebApp?.initData);
  }, []);
  return (
    <div style={{ background: "#EFEFF4", padding: "20px", height: "100vh" }}>
      <Carousel />
    </div>
  );
};

export default App;

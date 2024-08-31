import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const App = () => {

  const [color, setColor] = useState("#aabbcc");

  useEffect(()=>{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    WebApp?.setHeaderColor(color);
  },[color])

  console.log(color);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
};

export default App;

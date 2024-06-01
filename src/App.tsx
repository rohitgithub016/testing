import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  //@ts-ignore
  const telegramWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = `https://telegram.org/js/telegram-widget.js?21`;
    scriptElement.setAttribute("data-telegram-login", "weekendPac_bot");
    scriptElement.setAttribute("data-size", "large");
    scriptElement.setAttribute(
      "data-auth-url",
      "https://testing-six-gilt.vercel.app/"
    );
    // scriptElement.async = true;

    // //@ts-ignore
    // telegramWrapperRef.current.appendChild(scriptElement);
  }, []);

  return <div>Hello world</div>;
}

export default App;

import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const telegramWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://telegram.org/js/telegram-widget.js?22";
    scriptElement.setAttribute("data-telegram-login", "weekendPrac");
    scriptElement.setAttribute("data-size", "large");
    scriptElement.setAttribute(
      "data-auth-url",
      "https://testing-six-gilt.vercel.app/"
    );
    scriptElement.async = true;

    //@ts-ignore
    telegramWrapperRef.current.appendChild(scriptElement);
  }, []);

  return <div ref={telegramWrapperRef}></div>;
}

export default App;

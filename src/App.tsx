import "./App.css";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";

function App() {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [tonConnectUI] = useTonConnectUI();
  const botUsername = "weekendPac_bot";
  const addBotLink = `https://t.me/${botUsername}?startgroup=true`;
  console.log(tonConnectUI);
  return (
    <>
      <TonConnectButton />
      <div>
        <span>User-friendly address: {userFriendlyAddress}</span>
        <span>Raw address: {rawAddress}</span>
        <span>{tonConnectUI.connected}</span>
      </div>
      <div>
        <a href={addBotLink} target="_blank">
          <button>Add Bot to Groups or Channels</button>
        </a>
      </div>
    </>
  );
}

export default App;

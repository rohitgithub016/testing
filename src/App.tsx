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

  console.log(tonConnectUI);
  return (
    <>
      <TonConnectButton />
      <div>
        <span>User-friendly address: {userFriendlyAddress}</span>
        <span>Raw address: {rawAddress}</span>
        <span>{tonConnectUI.connected}</span>
      </div>
    </>
  );
}

export default App;

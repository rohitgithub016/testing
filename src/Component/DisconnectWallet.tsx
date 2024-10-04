import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Flex, Typography } from "antd";
import { useSelector } from "react-redux";
import { useDisconnectWalletMutation } from "src/api";
import { selectUserName } from "src/appSlice";
import DisconnectIcon from "src/assets/svg/Dashboard/DisconnectIcon";

const DisconnectWallet = () => {
    const [tonConnectUi] = useTonConnectUI();
    const username = useSelector(selectUserName);
    const walletAddress = useTonAddress(false);

    const [disconnectWallet] = useDisconnectWalletMutation();
 
  async function handleDisconnect() {
    disconnectWallet({username, walletAddress })
    await tonConnectUi.disconnect();
  }

  return (
    <Flex gap={10} style={{ padding: "12px 19px" }} onClick={handleDisconnect}>
      <DisconnectIcon />
      <Typography.Paragraph
        className="large-para-medium"
        style={{ fontWeight: 400 }}
      >
        Disconnect
      </Typography.Paragraph>
    </Flex>
  );
};

export default DisconnectWallet;

import { useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";
import { Flex, Popover, Typography } from "antd";
import { useSelector } from "react-redux";
import { selectUserName } from "src/appSlice";
import WalletSVG from "src/assets/svg/WalletSVG";
import getShortenedAddress from "src/utils/getShortenedAddress";
import getUserName from "src/utils/getUserName";
import "./index.css";
import DisconnectWallet from "src/Component/DisconnectWallet";

const HomePageHeader = () => {
  const userName = useSelector(selectUserName);
  const userFriendlyAddress = useTonAddress();

  const { open } = useTonConnectModal();

  function handleClickConnect() {
    if (!userFriendlyAddress) {
      open();
    }
  }
  return (
    <Flex className="homepage-header">
      <Typography.Title level={3} className="user-name">{`Hi, ${getUserName(
        userName
      )}`}</Typography.Title>

      {userFriendlyAddress ? (
        <Popover
          content={<DisconnectWallet />}
          trigger="click"
          placement="topRight"
          arrow={false}
          id="creator-wallet"
        >
          <Flex className="homepage-header-wallet">
            <WalletSVG />
            <Typography.Paragraph className="small-para-medium">
              {getShortenedAddress(userFriendlyAddress)}
            </Typography.Paragraph>
          </Flex>
        </Popover>
      ) : (
        <button className="connect-wallet-btn" onClick={handleClickConnect}>
          <Typography.Paragraph className="large-para-medium txt">
            Connect Wallet
          </Typography.Paragraph>
        </button>
      )}
    </Flex>
  );
};

export default HomePageHeader;

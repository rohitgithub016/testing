import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { Flex, Modal, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAcceptTermsMutation } from "src/api";
import { selectUserName } from "src/appSlice";
import ConnectWalletSvg from "src/assets/svg/Onboarding/ConnectWalletSvg";
import OnboardingScreen from "src/Component/OnboardingScreen/OnboardingStep";
import { ENABLE_HUBZ_BOT } from "src/constants/pages";

const ConnectWallet = () => {
  const navigate = useNavigate();
  const [updateWalletAddress] = useAcceptTermsMutation();
  const userName = useSelector(selectUserName);
  const { open } = useTonConnectModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const walletAddress = useTonAddress(false);

  const stepNumber = 1;
  const stepName = "Connect Wallet";
  const stepDescription = "Connect your non-custodial TON wallet to Hubz.";
  const hasPagebeenRendered = useRef(false);
  const [tonConnectUI] = useTonConnectUI();

  const handleClickConnect = () => {
    navigate(ENABLE_HUBZ_BOT);

    tonConnectUI?.disconnect();
    open();
    hasPagebeenRendered.current = true;
  };

  const handleWalletConnected = () => {
    if (!walletAddress) {
      setIsModalOpen(true);
      return;
    }
    navigate(ENABLE_HUBZ_BOT);
  };

  const buttons = [
    {
      text: "Connect Wallet",
      clickHandler: handleClickConnect,
      type: "contained",
    },
    {
      text: "I already have connected Wallet",
      clickHandler: handleWalletConnected,
      type: "outlined",
    },
  ];

  useEffect(() => {
    if (walletAddress && hasPagebeenRendered?.current) {
      updateWalletAddress({ username: userName, walletAddress: walletAddress });
      navigate(ENABLE_HUBZ_BOT);
    }
  }, [walletAddress]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        centered
        open={isModalOpen}
        closeIcon={null}
        footer={null}
        className="no-padding-modal"
      >
        <Flex vertical style={{ padding: "20px 0px" }}>
          <Flex vertical style={{ padding: "20px 0px" }} gap={12}>
            <Typography.Title
              level={4}
              className="txt-center txt-bold"
              style={{ lineHeight: "22px", letterSpacing: "-0.45px" }}
            >
              Wallet Not Found
            </Typography.Title>
            <Typography.Paragraph className="txt-center large-para-regular">
              Tap ‘Connect Now’ to continue.
            </Typography.Paragraph>
          </Flex>
          <Flex style={{ padding: "0px 16px" }} justify="center">
            <button
              onClick={handleOk}
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: "8px",
                backgroundColor: "#692DF6",
                color: "#fff",
                width: "100%",
                fontSize: "18px",
              }}
            >
              Got it
            </button>
          </Flex>
        </Flex>
      </Modal>
      <OnboardingScreen
        stepNumber={stepNumber}
        stepName={stepName}
        stepDescription={stepDescription}
        buttons={buttons}
        image={<ConnectWalletSvg />}
      />
    </>
  );
};

export default ConnectWallet;

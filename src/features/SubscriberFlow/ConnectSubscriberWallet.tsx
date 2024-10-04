import { Flex, Typography } from "antd";
import "./index.css";
import Button from "src/Component/Button/Button";
import { useTonConnectModal } from "@tonconnect/ui-react";
import { SubscriptionDetails } from "src/api";
import getAmountDetails from "src/utils/getAmountDetails";

interface ConnectSubscriberWalletProps {
  subscriptionDetails: SubscriptionDetails;
}

const ConnectSubscriberWallet = ({
  subscriptionDetails,
}: ConnectSubscriberWalletProps) => {
  const { open } = useTonConnectModal();

  const groupName = subscriptionDetails?.group?.name;

  const amountDetails = getAmountDetails(subscriptionDetails);

  return (
    <Flex vertical className="payment-container" justify="center">
      <Flex className="payment-details" vertical gap={50} style={{padding: "0px 16px"}}>
        <Flex className="payment-card">
          <Flex className="payment-card-header-container">
            <Typography.Paragraph>YOU RECEIVED AN INVITE</Typography.Paragraph>
          </Flex>
          <Flex className="icon-container" justify="flex-end" align="center">
            <Flex className="icon" justify="center" align="center">
              <Typography.Paragraph
                className="txt"
                style={{ textAlign: "center" }}
              >
                {groupName[0]}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical gap={10}>
            <Typography.Title level={1} style={{ textAlign: "center" }}>
              {groupName}
            </Typography.Title>
            <Typography.Paragraph className="large-para-regular" style={{ textAlign: "center" }}>
              {amountDetails}
            </Typography.Paragraph>
          </Flex>
        </Flex>
        <Flex gap={12} vertical>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Connect Wallet
          </Typography.Title>
          <Typography.Paragraph
            className="large-para-regular"
            style={{ textAlign: "center" }}
          >
            Link your TON Wallet to Hubz and join the on-chain connected
            community!
          </Typography.Paragraph>
        </Flex>
      </Flex>
      {/* <Flex className="payment-btn-container">
        <Button text="Continue" clickHandler={() => open()} />
      </Flex> */}
      <Flex
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#EFEFF4",
          border: "none",
          zIndex: 1,
        }}
      >
        <Flex style={{ padding: "0px 16px 30px 16px", width: "100%" }}>
          <Button
            clickHandler={() => open()}
            text={"Continue"}
            type="contained"
          />
        </Flex>
        </Flex>
    </Flex>
  );
};

export default ConnectSubscriberWallet;

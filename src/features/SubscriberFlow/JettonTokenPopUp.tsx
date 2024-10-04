import { Flex, Modal, Typography } from "antd";
import "./index.css";
import WebApp from "@twa-dev/sdk";

interface JettonTokenPopUpProps {
  isModalOpen: boolean;
  handleModal: (value: boolean) => void;
  groupName: string;
  popUpText: string;
  isNFT: boolean;
}

const JettonTokenPopUp = ({
  isModalOpen,
  handleModal,
  groupName,
  popUpText,
  isNFT,
}: JettonTokenPopUpProps) => {
  const handleCancel = () => {
    if (isNFT) {
      WebApp.openLink("https://getgems.io/");
    } else {
      WebApp.openLink(
        "https://app.ston.fi/swap?chartVisible=false&chartInterval=1w&ft=TON&tt=STON"
      );
    }
    handleModal(false);
  };
  const getButtonText = () => {
    if (isNFT) {
      return "Buy NFT";
    } else {
      return "Buy Tokens";
    }
  };
  return (
    <Modal open={isModalOpen} closeIcon={null} footer={null} centered>
      <Flex vertical style={{ padding: "20px 0px" }}>
        <Flex vertical style={{ padding: "20px 0px" }} gap={12}>
          <Flex style={{ padding: "0px 12px" }} justify="center">
            <Flex
              className="group-name-icon-container"
              justify="flex-end"
              align="center"
            >
              <Flex
                className="group-name-icon"
                justify="center"
                align="center"
                style={{ width: "32px", height: "32px" }}
              >
                <Typography.Paragraph className="txt">
                  {groupName[0]}
                </Typography.Paragraph>
              </Flex>
            </Flex>
            <Typography.Title
              level={4}
              className="txt-center title-bold"
              style={{
                lineHeight: "22px",
                letterSpacing: "-0.45px",
                margin: 0,
                color: "#181827",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center'
              }}
            >
              {groupName}
            </Typography.Title>
          </Flex>
          <Flex style={{ padding: "0px 12px" }}>
            <Typography.Paragraph
              className="txt-center large-para-regular"
              style={{
                color: "#333",
                lineHeight: "21px",
                letterSpacing: "-0.4px",
              }}
            >
              {popUpText}
            </Typography.Paragraph>
          </Flex>
        </Flex>
        <Flex style={{ padding: "0px 16px" }} justify="center">
          <button
            onClick={handleCancel}
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
              fontWeight: 400,
              lineHeight: "25.2px",
              border: "none",
            }}
          >
            <Flex gap={4} align="center">
              {getButtonText()}
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 15.5L15.5 5.5M15.5 5.5H8M15.5 5.5V13"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Flex>
          </button>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default JettonTokenPopUp;

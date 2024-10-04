import { Card, Flex, Typography } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "src/Component/Button/Button";
import Widget from "src/Component/Widget/Widget";
import { ACCESS_PASS } from "src/constants/pages";

const ChangeChatType = () => {
  const [searchParams] = useSearchParams();
  const chatTypeParam = searchParams.get("chat-type");
  const [selectedChainLinkType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const groupId = searchParams.get("group-id");
  const subscriptionId = searchParams.get("subscription-id");
  const groupName = searchParams.get("group-name");

  const chainLinkType = [
    {
      type: "ChainSync",
      description: "On-chain data integration.",
    },
    {
      type: "GateKeeper",
      description: "Token gated access control.",
    },
    {
      type: "AccessPass",
      description: "Paid Chat access.",
    },
  ];

  const filteredChatType = chainLinkType.filter(
    ({ type }) => type !== chatTypeParam
  );

  const handleChainLinkType = (type: string) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedChainLinkType === "GateKeeper") {
      navigate(
        `/create-gate-keeper-link?groupId=${groupId}&groupName=${groupName}&chatType=tokengated&subscription-id=${subscriptionId}`
      );
      return;
    }
    if (selectedChainLinkType === "AccessPass") {
      navigate(
        `${ACCESS_PASS}?chat-type=AccessPass&group-name=${groupName}&group-id=${groupId}&subscription-id=${subscriptionId}`
      );
      return;
    }
    navigate(
      `/add-invite-details?groupId=${groupId}&groupName=${groupName}&chatType=chainsync&subscription-id=${subscriptionId}`
    );
  };

  return (
    <Flex
      style={{ height: "100vh", overflow: "scroll" }}
      vertical
      justify="space-between"
    >
      <Flex vertical style={{ padding: "32px 16px" }}>
        <Flex vertical gap={24}>
          <Typography.Title level={3} style={{ lineHeight: "25px" }}>
            Change Type
          </Typography.Title>
          <Widget title="CHAINLINK TYPE">
            <Flex gap={16} vertical>
              {filteredChatType?.map(({ type, description }) => (
                <Card
                  className="select-chat-type-card"
                  key={type}
                  bodyStyle={{
                    boxShadow: " 0px 4px 25px 0px rgba(0, 0, 0, 0.05)",
                    ...(selectedChainLinkType === type && {
                      border: "1px solid #692DF6",
                    }),
                    borderRadius: "6px",
                  }}
                  onClick={() => handleChainLinkType(type)}
                >
                  <Flex justify="space-between">
                    <Flex vertical gap={8}>
                      <Typography.Title
                        level={3}
                        style={{
                          lineHeight: "25px",
                          letterSpacing: "-0.45px",
                        }}
                      >
                        {type}
                      </Typography.Title>
                      <Typography.Paragraph
                        className="large-para-regular"
                        style={{
                          color: "rgba(60, 60, 67, 0.60)",
                          lineHeight: "21px",
                        }}
                      >
                        {description}
                      </Typography.Paragraph>
                    </Flex>
                    <Flex justify="center" align="center">
                      {selectedChainLinkType === type ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M23 12C23 14.9174 21.8411 17.7153 19.7782 19.7782C17.7153 21.8411 14.9174 23 12 23C9.08262 23 6.28473 21.8411 4.22183 19.7782C2.15893 17.7153 1 14.9174 1 12C1 9.08262 2.15893 6.28473 4.22183 4.22183C6.28473 2.15893 9.08262 1 12 1C14.9174 1 17.7153 2.15893 19.7782 4.22183C21.8411 6.28473 23 9.08262 23 12ZM17.5413 7.83375C17.443 7.73588 17.3261 7.65881 17.1974 7.60717C17.0687 7.55553 16.9309 7.53037 16.7923 7.53319C16.6537 7.53602 16.5171 7.56677 16.3906 7.62361C16.2641 7.68045 16.1504 7.76221 16.0562 7.864L11.2809 13.9484L8.403 11.0691C8.20751 10.887 7.94895 10.7878 7.68178 10.7925C7.41462 10.7972 7.15971 10.9055 6.97077 11.0944C6.78183 11.2833 6.6736 11.5382 6.66888 11.8054C6.66417 12.0726 6.76334 12.3311 6.9455 12.5266L10.5837 16.1662C10.6818 16.2641 10.7985 16.3412 10.9269 16.3929C11.0554 16.4447 11.1929 16.47 11.3314 16.4675C11.4699 16.4649 11.6064 16.4345 11.7328 16.378C11.8593 16.3215 11.9731 16.2401 12.0674 16.1388L17.5564 9.2775C17.7435 9.08294 17.8469 8.82275 17.8443 8.55282C17.8417 8.28288 17.7334 8.02471 17.5426 7.83375H17.5413Z"
                            fill="#692DF6"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C9.34783 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34783 22 12Z"
                            stroke="#F7ECFC"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Widget>
        </Flex>
      </Flex>
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
            clickHandler={handleContinue}
            text={"Continue"}
            type="contained"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChangeChatType;

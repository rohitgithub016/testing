import { Flex, Typography } from "antd";
import Button from "../Button/Button";
import WebApp from "@twa-dev/sdk";

const SameUserWarning = () => {
  return (
    <Flex
      justify="space-between"
      align="center"
      vertical
      style={{ height: "calc(100vh - 140px)", padding: "24px 16px" }}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ flex: 1 }}
        gap={40}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="152"
          height="152"
          viewBox="0 0 152 152"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M76 152C117.974 152 152 117.974 152 76C152 34.0264 117.974 0 76 0C34.0264 0 0 34.0264 0 76C0 117.974 34.0264 152 76 152Z"
            fill="#F72D4E"
          />
          <path
            d="M70.6992 78.289C70.8164 81.5701 72.4572 83.2107 75.6216 83.2107C78.7072 83.2107 80.3086 81.5701 80.4258 78.289L81.3048 52.5664C81.344 50.9648 80.807 49.6367 79.6938 48.582C78.5802 47.5273 77.2032 47 75.5628 47C73.8832 47 72.5062 47.5176 71.4318 48.5527C70.3578 49.5879 69.8598 50.9063 69.9378 52.5078L70.6992 78.289Z"
            fill="white"
          />
          <path
            d="M71.022 103.015C72.3696 104.227 73.8832 104.832 75.5628 104.832C77.2424 104.832 78.756 104.236 80.1036 103.045C81.4512 101.854 82.125 100.34 82.125 98.5041C82.125 96.6681 81.461 95.1543 80.133 93.9627C78.805 92.7715 77.2816 92.1759 75.5628 92.1759C73.844 92.1759 72.3206 92.7715 70.9926 93.9627C69.6642 95.1543 69 96.6681 69 98.5041C69 100.301 69.674 101.805 71.022 103.015Z"
            fill="white"
          />
          <path
            d="M76.25 134.5C108.421 134.5 134.5 108.197 134.5 75.75C134.5 43.303 108.421 17 76.25 17C44.079 17 18 43.303 18 75.75C18 108.197 44.079 134.5 76.25 134.5Z"
            stroke="white"
            stroke-width="6"
            stroke-linecap="round"
          />
        </svg>
        <Flex vertical gap={10}>
        <Typography.Title
          level={2}
          className="txt-center"
        >
          Error: Unable to Join Chain-Linked Chat
        </Typography.Title>
        <Typography.Paragraph className="large-para-regular txt-center" >
          You cannot join this chain-linked chat because you are the owner of
          the chat group. Please go to the Hubz Bot and refer to the Admin
          Dashboard to manage this chat group.
        </Typography.Paragraph>
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
            text="Go to Hubz bot"
            clickHandler={() => {
              WebApp?.close();
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SameUserWarning;

import { Flex, Typography } from "antd";
import ProgressSteps from "src/Component/ProgressStep/ProgressSteps";
import "./index.css";

const SelectChatType = () => {
  return (
    <Flex className="select-chat-type-page" vertical>
      <Flex className="select-chat-type-container" vertical gap={32}>
        <Flex className="select-chat-type-progress-container" vertical>
          <ProgressSteps completedPercentage={[50, 0, 0]} />
        </Flex>
        <Typography.Title
          level={2}
          className="txt-center txt-bold select-chat-type-header"
        >
          Select chat type
        </Typography.Title>
        <Flex gap={24} vertical>
          <Flex vertical>
            <Flex className="select-chat-type-label" vertical>
              <Typography.Paragraph className="small-para-medium">
                GROUP CHAT
              </Typography.Paragraph>
            </Flex>
            {/* <Select/> */}
          </Flex>
          <Flex>chainlink type</Flex>
        </Flex>
      </Flex>
      <Flex>button</Flex>
    </Flex>
  );
};

export default SelectChatType;

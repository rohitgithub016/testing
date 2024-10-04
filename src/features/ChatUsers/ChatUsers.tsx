import { Card, Flex, Typography } from "antd";
import "./index.css";

interface ChatUsersProps {
  subscibersList: string[];
}

const ChatUsers = ({ subscibersList }: ChatUsersProps) => {
  return (
    <Card className="chat-users-card">
      {subscibersList?.map((subscribers) => (
        <Flex className="chat-user-list" key={subscribers} align="center">
          <Flex className="chat-user-content" align=" center">
            <Flex
              className="chat-user-avatar"
              justify="flex-end"
              align="center"
              gap={10}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle
                  cx="20"
                  cy="15"
                  r="5"
                  fill="white"
                  stroke="#27B5FE"
                  strokeWidth="1.5"
                />
                <circle
                  cx="19.9999"
                  cy="20"
                  r="16.6667"
                  fill="#27B5FE"
                  stroke="#27B5FE"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="15" r="5" fill="white" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.8216 31.8837C29.3067 27.8255 27.3599 25 20 25C12.6402 25 10.6934 27.8255 10.1785 31.8837C12.8456 34.0905 16.2679 35.4167 20 35.4167C23.7321 35.4167 27.1545 34.0905 29.8216 31.8837Z"
                  fill="white"
                />
              </svg>
            </Flex>
            <Flex className="chat-user-main" vertical align="flex-start">
              <Typography.Paragraph className="chat-user-name">
                {subscribers}
              </Typography.Paragraph>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Card>
  );
};

export default ChatUsers;

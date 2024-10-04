import { Drawer, Flex, Input, Typography } from "antd";
import ChainLinkedChats from "./ChainLinkedChats";
import { SearchOutlined } from '@ant-design/icons';

interface ContactUsDrawerProp {
  onClose: () => void;
  openDrawer: boolean;
}

const ChainLinkedDrawer = ({ onClose, openDrawer }: ContactUsDrawerProp) => {
  return (
    <Drawer
      height={"70vh"}
      placement={"bottom"}
      width={500}
      onClose={onClose}
      open={openDrawer}
      closable={false}
    >
      <Flex
        className="chainlinked-chats-drawer-container"
        vertical
        gap={12}
        align="center"
      >
        <Flex className="header" justify="space-between" align="center">
          <Typography.Title level={3}>Chainlinked Chats</Typography.Title>
          <div onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6.00005L6 18M5.99995 6L17.9999 18"
                stroke="#4D4E57"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Flex>
        <Input addonBefore={<SearchOutlined />} placeholder="Search" />
        <ChainLinkedChats />
      </Flex>
    </Drawer>
  );
};

export default ChainLinkedDrawer;

import { Card, Flex, Typography } from "antd";
import AddCircleSVG from "src/assets/svg/AddCircleSVG";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { SELECT_CHAT_LINK_TYPE } from "src/constants/pages";

const AddNewChat = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(SELECT_CHAT_LINK_TYPE);
  };
  return (
    <Card onClick={handleClick}>
      <Flex
        className="add-chain-link-container"
        align="center"
        style={{
          justifyContent: "normal",
          gap: "12px",
        }}
      >
        <AddCircleSVG />
        <Typography.Paragraph className="large-para-medium" style={{color: '#525260'}}>
          Add Telegram group
        </Typography.Paragraph>
      </Flex>
    </Card>
  );
};

export default AddNewChat;

import { Card, Flex, Typography } from "antd";
import AddCircleSVG from "src/assets/svg/AddCircleSVG";
import './index.css'

interface AddNewButtonProps {
    text: string;
    handleClick: () => void;
}

const AddNewButton = ({text, handleClick}: AddNewButtonProps) => {
  return (
    <Card onClick={handleClick}>
      <Flex
        justify="space-between"
        className="add-chain-link-container"
        align="center"
      >
        <Typography.Paragraph className="large-para-regular">
          {text}
        </Typography.Paragraph>
        <AddCircleSVG />
      </Flex>
    </Card>
  );
};

export default AddNewButton;

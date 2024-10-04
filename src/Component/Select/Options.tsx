import { Flex, Typography } from "antd";
import { OptionsProp } from "./type";
import "./index.css";

const Options = ({ options, handleSelectedOption, handleClose }: OptionsProp) => {
  return (
    <Flex vertical gap={10} style={{ width: "100%" }}>
      {options?.map((option) => (
        <Flex
          onClick={() => {
            handleSelectedOption(option);
            handleClose();
          }}
          align="center"
          gap={10}
          style={{ overflowY: "scroll" }}
        >
          <span className="option-icon">{option?.label[0]}</span>
          <Typography.Paragraph className="label">
            {option?.label}
          </Typography.Paragraph>
        </Flex>
      ))}
    </Flex>
  );
};

export default Options;

import { Flex, Popover, Typography } from "antd";
import Options from "./Options";
import { useState } from "react";
import DownArrowSVG from "src/assets/svg/Arrows/DownArrowSVG";
import { Option } from "./type";
import "./index.css";

interface SelectProps {
  options: Option[];
  handleSelectedOption: (option: Option) => void;
  selectedOption: Option;
}

const Select = ({
  options,
  handleSelectedOption,
  selectedOption,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Popover
      className="select-dropdown"
      placement="bottom"
      content={
        <Options
          options={options}
          handleSelectedOption={handleSelectedOption}
          handleClose={handleClose}
        />
      }
      trigger="click"
      arrow={false}
      open={open}
    >
      <Flex className="dropdown-selector" onClick={handleOpen}>
        <Flex className="dropdown-input">
        <span className="option-icon">{selectedOption?.label[0]}</span>
          <Flex className="flex">
            <Typography.Paragraph className="label">
              {selectedOption?.label}
            </Typography.Paragraph>
          </Flex>
          <Flex style={{ flexShrink: 0 }}>
            <DownArrowSVG />
          </Flex>
        </Flex>
      </Flex>
    </Popover>
  );
};

export default Select;

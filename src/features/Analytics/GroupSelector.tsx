import Select from "src/Component/Select/Select";
import { Option } from "src/Component/Select/type";

interface GroupSelectorProps {
  selectedOption: Option;
  handleSelectedOption: (option: Option) => void;
  options: Option[];
}

const GroupSelector = ({
  selectedOption,
  handleSelectedOption,
  options,
}: GroupSelectorProps) => {
  return (
    <Select
      selectedOption={selectedOption}
      handleSelectedOption={handleSelectedOption}
      options={options}
    />
  );
};

export default GroupSelector;

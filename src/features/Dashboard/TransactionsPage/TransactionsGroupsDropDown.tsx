import { Flex, Popover, Typography } from "antd";
import { useSelector } from "react-redux";
import { useGetGroupsQuery } from "src/api";
import { selectUserName } from "src/appSlice";
import DownArrowSVG from "src/assets/svg/Arrows/DownArrowSVG";
import "./index.css"

interface TransactionsGroupsDropDownProps {
  open: boolean;
  selectedGroup: {
    groupName: string;
    totalSubscribers?: number;
    _id: string;
  };
  handleSelectGroup: (group: {
    groupName: string;
    totalSubscribers?: number;
    _id: string;
  }) => void;
  handleOpen: () => void;
}

const TransactionsGroupsDropDown = ({
  open,
  selectedGroup,
  handleSelectGroup,
  handleOpen,
}: TransactionsGroupsDropDownProps) => {
  const userName = useSelector(selectUserName);
  const { data: groupsData = [] } = useGetGroupsQuery(userName);

  const groupsList = [
    {
      groupName: "All Chainlinked Chats",
      _id: "All Chainlinked Chats",
    },
    ...(groupsData || []),
  ];

  const GroupsOption = () => {
    return (
      <Flex vertical gap={10}>
        {groupsList?.map((group) => (
          <Flex
            onClick={() => handleSelectGroup(group)}
            align="center"
            gap={10}
            style={{ overflowY: "scroll" }}
          >
            <Typography.Paragraph className="txt">
              {group?.groupName}
            </Typography.Paragraph>
          </Flex>
        ))}
      </Flex>
    );
  };

  return (
    <Popover
      className="transaction-group-dropdown"
      placement="bottom"
      content={GroupsOption}
      trigger="click"
      arrow={false}
      open={open}
    >
      <Flex className="access-pass-currency-selector" onClick={handleOpen}>
        <Flex className="access-pass-curreny-selector-input">
          <Flex className="cu">
            <Typography.Paragraph className="txt">
              {selectedGroup?.groupName}
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

export default TransactionsGroupsDropDown;

import { Flex, Typography } from "antd";
import { useState } from "react";
import "./index.css";
import Transactions from "src/features/Common/Transactions/Transactions";
import TransactionsGroupsDropDown from "./TransactionsGroupsDropDown";

interface SelectedGroup {
  groupName: string;
  totalSubscribers?: number;
  _id: string;
}

const TransactionPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedGroup, selectSelectedGroup] = useState<SelectedGroup>({
    groupName: "All Chainlinked Chats",
    _id: "All Chainlinked Chats",
  });

  const handleSelectGroup = (group: SelectedGroup) => {
    selectSelectedGroup(group);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const transactionsFilter = [
    { label: "1D", value: 1 },
    { label: "7D", value: 7 },
    { label: "1M", value: 30 },
    { label: "ALL", value: 0 },
  ];

  const [filterSelected, setFilterSelected] = useState({
    label: "ALL",
    value: 0,
  });

  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Flex className="transaction_container">
      <TransactionsGroupsDropDown
        open={open}
        selectedGroup={selectedGroup}
        handleOpen={handleOpen}
        handleSelectGroup={handleSelectGroup}
      />
      {/* {transactionsFilter?.map({label})=><Flex key={label}></Flex>} */}
      <Flex className="transactions-filter" align="center">
        {transactionsFilter?.map((filter) => (
          <Flex
            key={filter?.label}
            className={`filter ${
              filterSelected?.label === filter?.label &&
              "selected-transaction-filter"
            }`}
            onClick={() => {
              setPage(1);
              setFilterSelected(filter);
            }}
          >
            <Typography.Paragraph className="filter-txt">
              {filter?.label}
            </Typography.Paragraph>
          </Flex>
        ))}
      </Flex>

      <Transactions
        page={page}
        days={filterSelected?.value}
        groupId={
          selectedGroup?._id === "All Chainlinked Chats"
            ? undefined
            : selectedGroup?._id
        }
        handlePageChange={handlePageChange}
      />
    </Flex>
  );
};

export default TransactionPage;

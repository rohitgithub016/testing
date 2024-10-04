import Widget from "src/Component/Widget/Widget";
import Transactions from "./Transactions";
import { useNavigate } from "react-router-dom";
import { TRANSACTION_PAGE } from "src/constants/pages";
import { useState } from "react";

const TransactionWidget = () => {
  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate(TRANSACTION_PAGE);
  };
  const [transactionsPresent, setTransctions] = useState(false);
  const handleTransactionPresent = (value: number) => {
    if (value) {
      setTransctions(true);
    } else {
      setTransctions(false);
    }
  };
  return (
    <Widget title="Transactions" clickHandler={transactionsPresent ? handleSeeAll : undefined}>
      <Transactions transactionPresent={handleTransactionPresent}/>
    </Widget>
  );
};

export default TransactionWidget;

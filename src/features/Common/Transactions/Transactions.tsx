import { Card, Flex, Typography } from "antd";
import "./index.css";
import Avatar from "src/assets/svg/Transactions/Avatar";
import { useGetTransactionDataQuery } from "src/api";
import { useSelector } from "react-redux";
import { selectTokenPriceInUSD, selectUserName } from "src/appSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CHATLINKED_CHAT_DETAILS, DASHBOARD } from "src/constants/pages";
import NoData from "src/Component/NoData/NoData";
import getGroupName from "src/utils/getGroupName";

// we will only show transactions for access pass
interface TransactionsProps {
  page?: number;
  days?: number;
  groupId?: string;
  handlePageChange?: (newPage: number) => void;
  transactionPresent?: (value: number) => void;
}

interface TransactionData {
  groupName: string;
  subscriptionName: string;
  transactionHash: string;
  transactionTime: string;
  subscriptionAmount: number;
  subscriptionCurrency: string;
  subscriberUsername: string;
}
const Transactions = ({
  page = 1,
  days = 0,
  groupId,
  handlePageChange,
  transactionPresent,
}: TransactionsProps) => {
  const avatarColor = ["#27B5FE", "#8E8E93", "#54CB68"];
  const tokenPriceInUSD = useSelector(selectTokenPriceInUSD);

  const userName = useSelector(selectUserName);
  const {
    data: transactions,
    isSuccess,
    isFetching,
  } = useGetTransactionDataQuery(
    {
      userName,
      page,
      days,
      groupId,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [transactionsData, setData] = useState<TransactionData[]>([]);

  useEffect(() => {
    setData([]);
  }, []);

  useEffect(() => {
    setData([]);
    if (handlePageChange) {
      handlePageChange(1);
    }
  }, [days, groupId]);

  useEffect(() => {
    if (isSuccess && transactions?.results?.length) {
      if (transactionPresent) {
        transactionPresent(transactions?.results?.length);
      }
      const data = transactions?.results?.filter(
        ({ subscriptionAmount }) => subscriptionAmount > 0
      );
      setData((prev) => [...prev, ...data]);
      if (page === 1 && transactions?.totalPages > 1 && handlePageChange) {
        handlePageChange(page + 1);
      }
    } else {
      if (transactionPresent) {
        transactionPresent(0);
      }
    }
  }, [transactions]);

  const fetchMore = () => {
    if (page < (transactions?.totalPages || 0) && handlePageChange) {
      handlePageChange(page + 1);
    }
  };

  const Loading = () => {
    return (
      <Flex justify="center" align="center">
        {isFetching && (
          <Typography.Paragraph
            style={{
              margin: 0,
              fontFamily: "Scandia-Regular",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "22px",
              textAlign: "center",
            }}
          >
            Loading more transactions...
          </Typography.Paragraph>
        )}
      </Flex>
    );
  };

  const location = useLocation();

  let slicedData = [...transactionsData];

  if (
    location?.pathname === DASHBOARD ||
    location?.pathname === CHATLINKED_CHAT_DETAILS
  ) {
    slicedData = slicedData.splice(0, 5);
  }

  const getSubscriptionDollarAmount = (
    subscriptionAmount: number,
    subscriptionCurrency: string
  ) => {
    if (subscriptionCurrency === "TON") {
      return `$${(subscriptionAmount * tokenPriceInUSD.TON).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`;
    }
    return `$${(subscriptionAmount * tokenPriceInUSD.USDT).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  return (
    <>
      {transactionsData?.length ? (
        <InfiniteScroll
          dataLength={transactionsData?.length || 0}
          next={fetchMore}
          hasMore={true}
          loader={<Loading />}
        >
          <Card>
            {slicedData?.map(
              ({
                groupName,
                subscriptionAmount,
                subscriptionCurrency,
                transactionHash,
                subscriberUsername,
              }) => (
                <Flex
                  align="center"
                  className="transaction-list"
                  key={transactionHash}
                >
                  <Flex align="center" className="transaction-content">
                    <Flex
                      className="transaction-avatar-container"
                      justify="flex-end"
                      align="center"
                    >
                      <Avatar
                        color={avatarColor[Math.floor(Math.random() * 3)]}
                      />
                    </Flex>
                    <Flex
                      className="transaction-main"
                      justify="space-between"
                      align="center"
                    >
                      <Flex vertical align="flex-start">
                        <Typography.Paragraph className="large-para-regular name">
                          {getGroupName(subscriberUsername)}
                        </Typography.Paragraph>
                        <Typography.Paragraph className="xsmall-para-regular">
                          {getGroupName(groupName)}
                        </Typography.Paragraph>
                      </Flex>
                      <Flex justify="flex-end" align="center">
                        <Flex vertical>
                          <Flex className="value1-container" vertical>
                            <Typography.Paragraph className="small-para-regular value1">
                              {getSubscriptionDollarAmount(
                                subscriptionAmount,
                                subscriptionCurrency
                              )}
                            </Typography.Paragraph>
                          </Flex>
                          <Flex className="value2-container" vertical>
                            <Typography.Paragraph className="tags-regular value2">
                              {`${subscriptionAmount} ${subscriptionCurrency}`}
                            </Typography.Paragraph>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              )
            )}
          </Card>
        </InfiniteScroll>
      ) : (
        <NoData text="No transactions yet" />
      )}
    </>
  );
};

export default Transactions;

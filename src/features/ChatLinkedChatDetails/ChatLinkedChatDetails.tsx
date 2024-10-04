import { Card, Flex, Typography } from "antd";
import "./index.css";
import UserSVG from "src/assets/svg/UserSVG";
import EditSVG from "src/assets/svg/EditSVG";
import Widget from "src/Component/Widget/Widget";
import AddNewButton from "src/Component/AddNewButton/AddNewButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ACCESS_PASS,
  CHANGE_CHAT_TYPE,
  TRANSACTION_PAGE,
} from "src/constants/pages";
import Transactions from "../Common/Transactions/Transactions";
import ChatUsers from "../ChatUsers/ChatUsers";
import InviteUserDrawer from "./InviteUserDrawer.tsx/InviteUserDrawer";
import { useState } from "react";
import { useGetGroupsQuery, useGetGroupsSubscribersQuery } from "src/api";
import { useSelector } from "react-redux";
import { selectTokenPriceInUSD, selectUserName } from "src/appSlice";
import Earnings from "./Earnings";
import NoData from "src/Component/NoData/NoData";
import useNoticeBar from "src/hooks/useNoticeBar";

const ChatLinkedChatDetails = () => {
  const navigate = useNavigate();
  const [openInviteDrawer, setOpenInviteDrawer] = useState(false);
  const [searchParams] = useSearchParams();
  const userName = useSelector(selectUserName);
  const chatType = searchParams.get("chat-type");
  const groupName = searchParams.get("group-name");
  const groupId = searchParams.get("group-id") || "";
  const description = searchParams.get("description") || "";
  const gatedTokenQueryParams = searchParams.get("gated-token") || null;
  const inviteUrl = searchParams.get("invite-url") || "";
  const [selectedPlan, setPlan] = useState<string | null>(null);
  const { showError, contextHolder } = useNoticeBar();
  const subscriptionId = searchParams.get("subscription-id");
  const [transactionsPresent, setTransctions] = useState(false);

  let gatedToken = null;

  const tokenPriceInUSD = useSelector(selectTokenPriceInUSD);

  if (gatedTokenQueryParams) {
    gatedToken = JSON.parse(gatedTokenQueryParams);
  }

  const handleAddNewAccessPass = () => {
    navigate(
      `${ACCESS_PASS}?chat-type=${chatType}&group-name=${groupName}&group-id=${groupId}`
    );
  };

  const handleSeeAllTransactions = () => {
    navigate(TRANSACTION_PAGE);
  };

  const handleOpenInviteDrawer = () => {
    setOpenInviteDrawer(true);
  };

  const handleCloseInviteDrawer = () => {
    setOpenInviteDrawer(false);
  };

  const { data: subscribers = [] } = useGetGroupsSubscribersQuery(groupId, {
    skip: !groupId,
    refetchOnMountOrArgChange: true,
  });

  const { data: groupsData = [] } = useGetGroupsQuery(userName, {
    refetchOnMountOrArgChange: true,
  });

  const currentGroup = groupsData?.find((group) => group?._id === groupId);

  const monthlyTonEarnings = currentGroup?.monthlyEarningsTON || 0;
  const monthlyUsdtEarnings = currentGroup?.monthlyEarningsUSDT || 0;
  const monthlyAverageEarnings = `$${(
    monthlyTonEarnings * tokenPriceInUSD.TON +
    monthlyUsdtEarnings * tokenPriceInUSD.USDT
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const totalTONEarnings = currentGroup?.totalEarningsTON || 0;
  const totalUSDTEarnings = currentGroup?.totalEarningsUSDT || 0;
  const totalEarnings = `$${(
    totalTONEarnings * tokenPriceInUSD.TON +
    totalUSDTEarnings * tokenPriceInUSD.USDT
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const subscibersList = subscribers?.map(
    (subscribers) => subscribers?.subscribers?.username
  );

  const accessPassPlans = currentGroup?.subscriptions.map((plans, index) => {
    return {
      title: `AccessPass ${index + 1}`,
      value: ` ${plans?.price?.amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} ${plans?.price?.currency} / ${plans?.period}`,
      _id: plans._id,
    };
  });

  const getTypeText = (type: string) => {
    if (type === "entry") {
      return "One-Time Verification";
    } else {
      return "Ongoing Verification";
    }
    return type;
  };

  const handleChangeType = () => {
    if (chatType === "AccessPass" && !selectedPlan) {
      showError("Please select an access pass plan to change its type.");
      return;
    }
    navigate(
      `${CHANGE_CHAT_TYPE}?chat-type=${chatType}&group-id=${groupId}&group-name=${groupName}${
        selectedPlan ? `&subscription-id=${selectedPlan}` : ""
      }${subscriptionId ? `&subscription-id=${subscriptionId}` : ""}`
    );
  };

  const handleSelectPlan = (id: string) => {
    setPlan(id);
  };

  const handleTransactionPresent = (value: number) => {
    if (value) {
      setTransctions(true);
    } else {
      setTransctions(false);
    }
  };
  return (
    <>
      {contextHolder}
      <InviteUserDrawer
        openDrawer={openInviteDrawer}
        handleClose={handleCloseInviteDrawer}
        inviteUrl={inviteUrl}
      />
      <Flex className={"chatlinked-chat-details-container"} vertical gap={24}>
        <Flex align="center" gap={11}>
          <Flex className="icon" justify="center" align="center">
            <Typography.Paragraph className="txt">{groupName?.length ? groupName[0] : ''}</Typography.Paragraph>
          </Flex>
          <Flex vertical align="flex-start" gap={4}>
            <Typography.Title level={4} className="group-name">
              {groupName}
            </Typography.Title>
            <Typography.Paragraph className="small-para-regular">
              {chatType}
            </Typography.Paragraph>
          </Flex>
        </Flex>
        <Flex gap={12} className="btn-container" align="center">
          <Card onClick={handleOpenInviteDrawer}>
            <UserSVG />
            <Typography.Paragraph className="small-para-regular">
              Invite Users
            </Typography.Paragraph>
          </Card>
          <Card onClick={handleChangeType}>
            <EditSVG />
            <Typography.Paragraph className="small-para-regular">
              Change Type
            </Typography.Paragraph>
          </Card>
        </Flex>
        {
          <Widget title="Description">
            <Card style={{ padding: "12px 12px 12px 16px" }}>
              <Typography.Paragraph className="large-para-regular description-txt">
                {description ? description : "No description"}
              </Typography.Paragraph>
            </Card>
          </Widget>
        }
        {gatedToken && (
          <Widget title="Token Gate">
            <Card style={{ padding: "12px 12px 12px 16px" }}>
              <Typography.Paragraph className="large-para-regular description-txt">
                {`${gatedToken?.amount} ${
                  gatedToken?.jettonSymbol
                }. ${getTypeText(gatedToken?.type)}`}
              </Typography.Paragraph>
            </Card>
          </Widget>
        )}
        {chatType === "AccessPass" && (
          <>
            <Widget title="AccessPass Plans">
              <Flex gap={12} className="accesspass" vertical>
                <Card>
                  {accessPassPlans?.map(({ title, value, _id }) => (
                    <Flex
                      className="access-pass-plan-list"
                      align="center"
                      onClick={() => handleSelectPlan(_id)}
                    >
                      <Flex className="access-pass-plan-content" align="center">
                        <Flex
                          className="access-pass-plan-main"
                          vertical
                          align="flex-start"
                        >
                          <Typography.Paragraph className="xsmall-para-regular">
                            {title}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="large-para-regular amount-section">
                            {/* 180.00 USDT / Year (7-Day Free Trial)
                             */}
                            {value}
                          </Typography.Paragraph>
                        </Flex>
                        {selectedPlan === _id ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M23 12C23 14.9174 21.8411 17.7153 19.7782 19.7782C17.7153 21.8411 14.9174 23 12 23C9.08262 23 6.28473 21.8411 4.22183 19.7782C2.15893 17.7153 1 14.9174 1 12C1 9.08262 2.15893 6.28473 4.22183 4.22183C6.28473 2.15893 9.08262 1 12 1C14.9174 1 17.7153 2.15893 19.7782 4.22183C21.8411 6.28473 23 9.08262 23 12ZM17.5413 7.83375C17.443 7.73588 17.3261 7.65881 17.1974 7.60717C17.0687 7.55553 16.9309 7.53037 16.7923 7.53319C16.6537 7.53602 16.5171 7.56677 16.3906 7.62361C16.2641 7.68045 16.1504 7.76221 16.0562 7.864L11.2809 13.9484L8.403 11.0691C8.20751 10.887 7.94895 10.7878 7.68178 10.7925C7.41462 10.7972 7.15971 10.9055 6.97077 11.0944C6.78183 11.2833 6.6736 11.5382 6.66888 11.8054C6.66417 12.0726 6.76334 12.3311 6.9455 12.5266L10.5837 16.1662C10.6818 16.2641 10.7985 16.3412 10.9269 16.3929C11.0554 16.4447 11.1929 16.47 11.3314 16.4675C11.4699 16.4649 11.6064 16.4345 11.7328 16.378C11.8593 16.3215 11.9731 16.2401 12.0674 16.1388L17.5564 9.2775C17.7435 9.08294 17.8469 8.82275 17.8443 8.55282C17.8417 8.28288 17.7334 8.02471 17.5426 7.83375H17.5413Z"
                              fill="#692DF6"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C9.34783 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34783 22 12Z"
                              stroke="#F7ECFC"
                              strokeWidth="2"
                            />
                          </svg>
                        )}
                      </Flex>
                    </Flex>
                  ))}
                </Card>
                <AddNewButton
                  text="Add new AccessPass plan"
                  handleClick={handleAddNewAccessPass}
                />
              </Flex>
            </Widget>
            <Widget title={"Earnings"}>
              <Earnings
                totalEarnings={totalEarnings}
                monthlyAverageEarnings={monthlyAverageEarnings}
              />
            </Widget>
            <Widget
              title={"Transactions"}
              clickHandler={
                transactionsPresent ? handleSeeAllTransactions : undefined
              }
            >
              <Transactions
                groupId={groupId}
                transactionPresent={handleTransactionPresent}
              />
            </Widget>
          </>
        )}
        {
          <Widget title={`Chat Users(${subscibersList?.length || 0})`}>
            {subscibersList?.length ? (
              <ChatUsers subscibersList={subscibersList} />
            ) : (
              <NoData text={"No users yet"} />
            )}
          </Widget>
        }
        <div style={{ marginBottom: "30px" }}></div>
      </Flex>
    </>
  );
};

export default ChatLinkedChatDetails;

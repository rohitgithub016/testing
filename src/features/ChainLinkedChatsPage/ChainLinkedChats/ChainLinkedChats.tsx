import { Card, Flex, Typography } from "antd";
import "./index.css";
import ArrorRightSVG from "src/assets/svg/Arrows/ArrorRightSVG";
import { useSelector } from "react-redux";
import { selectTokenPriceInUSD, selectUserName } from "src/appSlice";
import { Groups, useGetGroupsQuery } from "src/api";
import { useLocation, useNavigate } from "react-router-dom";
import { CHATLINKED_CHAT_DETAILS, DASHBOARD } from "src/constants/pages";
import getGroupName from "src/utils/getGroupName";

interface GatedToken {
  amount: number;
  jettonSymbol: string;
  isTon: boolean;
  type: string;
  jettonAddress: string;
}
interface Subscriptions {
  type: string;
  gatedToken: GatedToken;
  description: string;
  url: {
    inviteUrl: string;
  };
  _id: string
}
interface ChainLinkedChatsData {
  groupName?: string;
  _id?: string;
  type?: string;
  subscriptions?: Subscriptions[];
  jetTon?: string;
  subscriptionAmount?: { amount?: string; change?: string };
  oneDayEarningsTON?: number;
  oneDayEarningsUSDT?: number;
  totalEarningsTON?: number;
  totalEarningsUSDT?: number;
  description: string;
  gatedToken: GatedToken;
  inviteUrl: string;
  subscriptionId: string;
}

interface ChatLinkedChatsProps {
  searchText?: string;
}

const ChainLinkedChats = ({ searchText = "" }: ChatLinkedChatsProps) => {
  const navigate = useNavigate();

  const tokenPriceInUSD = useSelector(selectTokenPriceInUSD);

  const userName = useSelector(selectUserName);
  const { data: groupsData } = useGetGroupsQuery(userName, {refetchOnMountOrArgChange: true});
  const location = useLocation();

  let reversedGroupsData: Groups[] = []

  if(groupsData?.length){
    reversedGroupsData = [...groupsData].reverse();
  }
  const filterGroupsWithSubscription = reversedGroupsData?.filter(
    ({ subscriptions }) => subscriptions?.length
  );
  const getJetTon = (subscriptions: Subscriptions) => {
    if (subscriptions?.type === "gateKeeper") {
      return subscriptions?.gatedToken?.jettonSymbol;
    }
    return "";
  };

  const getType = (type: string) => {
    switch (type) {
      case "accessPass":
        return "AccessPass";
      case "gateKeeper":
        return "GateKeeper";
      case "chainSync":
        return "ChainSync";
    }
    return type;
  };

  const getEarnings = (
    oneDayEarningsTON: number,
    oneDayEarningsUSDT: number,
    totalEarningsTON: number,
    totalEarningsUSDT: number
  ) => {
    const oneDayEarnings = `+$${(
      oneDayEarningsTON * tokenPriceInUSD.TON +
      oneDayEarningsUSDT * tokenPriceInUSD.USDT
    ).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    const totalEarnings = `$${(
      totalEarningsTON * tokenPriceInUSD.TON +
      totalEarningsUSDT * tokenPriceInUSD.USDT
    ).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
    return { amount: totalEarnings, change: oneDayEarnings };
  };

  let chainLinkedChatsData: ChainLinkedChatsData[] =
    filterGroupsWithSubscription?.map(
      ({
        groupName,
        _id,
        subscriptions,
        oneDayEarningsTON,
        oneDayEarningsUSDT,
        totalEarningsTON,
        totalEarningsUSDT,
      }) => {
        return {
          groupName,
          _id,
          type: getType(subscriptions[0]?.type),
          jetTon: getJetTon(subscriptions[0]),
          ...(subscriptions[0]?.type === "accessPass" && {
            subscriptionAmount: getEarnings(
              oneDayEarningsTON,
              oneDayEarningsUSDT,
              totalEarningsTON,
              totalEarningsUSDT
            ),
          }),
          description: subscriptions[0]?.description,
          gatedToken: subscriptions[0]?.gatedToken,
          inviteUrl: subscriptions[0]?.url?.inviteUrl,
          subscriptionId: subscriptions[0]?._id
        };
      }
    ) || [];

  if (location?.pathname === DASHBOARD) {
    chainLinkedChatsData = chainLinkedChatsData.splice(0, 5);
  }
  if (searchText) {
    chainLinkedChatsData = chainLinkedChatsData?.filter(({ groupName }) =>
      groupName?.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const handleClick = (
    type: string,
    groupName: string,
    groupId: string,
    description: string,
    gatedToken: GatedToken,
    inviteUrl: string,
    subscriptionId: string
  ) => {
    if (gatedToken) {
      const gatedTokenStringify = JSON.stringify(gatedToken);
      navigate(
        `${CHATLINKED_CHAT_DETAILS}?chat-type=${type}&group-name=${groupName}&group-id=${groupId}${
          description ? `&description=${description}` : ""
        }&gated-token=${gatedTokenStringify}&invite-url=${inviteUrl}&subscription-id=${subscriptionId}`
      );
    } else {
      navigate(
        `${CHATLINKED_CHAT_DETAILS}?chat-type=${type}&group-name=${groupName}&group-id=${groupId}${
          description ? `&description=${description}` : ""
        }&invite-url=${inviteUrl}&subscription-id=${subscriptionId}`
      );
    }
  };

  return (
    <Card>
      {chainLinkedChatsData?.map(
        ({
          groupName,
          type,
          jetTon = "",
          subscriptionAmount = undefined,
          _id,
          description,
          gatedToken,
          inviteUrl,
          subscriptionId
        }) => (
          <Flex
            align="center"
            className="list"
            key={_id}
            onClick={() => {
              handleClick(
                type as string,
                groupName as string,
                _id as string,
                description as string,
                gatedToken,
                inviteUrl as string,
                subscriptionId as string
              );
            }}
          >
            <Flex align="center" className="content">
              <Flex
                className="icon-container"
                justify="flex-end"
                align="center"
              >
                <Flex className="icon" justify="center" align="center">
                  <Typography.Paragraph className="txt">
                    {groupName && groupName[0]}
                  </Typography.Paragraph>
                </Flex>
              </Flex>
              <Flex className="main" justify="space-between" align="center">
                <Flex vertical align="flex-start">
                  <Typography.Paragraph className="large-para-regular name">
                    {getGroupName(groupName as string)}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="xsmall-para-regular">
                    {type}
                  </Typography.Paragraph>
                </Flex>
                <Flex justify="flex-end" align="center">
                  {jetTon && (
                    <Flex justify="flex-end" align="center">
                      <Typography.Paragraph className="small-para-regular jetton">
                        {jetTon}
                      </Typography.Paragraph>
                    </Flex>
                  )}
                  {subscriptionAmount && (
                    <Flex vertical>
                      <Typography.Paragraph className="small-para-regular jetton">
                        {subscriptionAmount?.amount}
                      </Typography.Paragraph>
                      <Typography.Paragraph className="tags-regular change">
                        {subscriptionAmount?.change}
                      </Typography.Paragraph>
                    </Flex>
                  )}
                  <Flex
                    gap={10}
                    justify="flex-end"
                    align="center"
                    className="arrow-container"
                  >
                    <ArrorRightSVG />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )
      )}
    </Card>
  );
};

export default ChainLinkedChats;

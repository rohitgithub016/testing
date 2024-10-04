import React from "react";
import { Carousel, Flex, Typography } from "antd";
import "./index.css";
import TonSVG from "src/assets/svg/Coins/TonSVG";
import UsdtSVG from "src/assets/svg/Coins/UsdtSVG";
import IncreaseSVG from "src/assets/svg/Arrows/IncreaseSVG";
import { useSelector } from "react-redux";
import { selectTokenPriceInUSD, selectUserName } from "src/appSlice";
import { useGetCommunityStatsQuery, useGetEarningsDetailsQuery } from "src/api";

const EarningCarousel: React.FC = () => {
  const userName = useSelector(selectUserName);
  const tokenPriceInUSD = useSelector(selectTokenPriceInUSD);
  const { data: earningsData = [] } = useGetEarningsDetailsQuery(userName, {refetchOnMountOrArgChange: true});
  const { data: communityStats } = useGetCommunityStatsQuery(userName, {refetchOnMountOrArgChange: true});

  let earningsTON = 0;
  let earningsUSDT = 0;
  let totalMonthlyAverageBalance = 0;

  if (earningsData?.length) {
    earningsTON = earningsData[0]?.earningsTON || 0;
    earningsUSDT = earningsData[0]?.earningsUSDT || 0;
    totalMonthlyAverageBalance = earningsData[0].totalMonthlyAverageBalance || 0;
  }

  const totalEarnings = `$${(
    earningsTON * tokenPriceInUSD.TON +
    earningsUSDT * tokenPriceInUSD.USDT
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const totalCommunityBalance = `$${(
    communityStats?.communityBalance?.totalUsdBalance || 0
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const totalCommunityTonBalance = `$${(
   ( communityStats?.communityBalance?.ton ||
    0) * tokenPriceInUSD?.TON ||
    0 * tokenPriceInUSD?.TON
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const totalCommunityUSDTBalance = `$${(
    (communityStats?.communityBalance?.usdt ||
    0 )* tokenPriceInUSD?.USDT ||
    0 * tokenPriceInUSD?.USDT
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  // earningsData
  const data = [
    {
      title: "Total Community Balance",
      value: totalCommunityBalance,
      earnings: {
        TON: { value: totalCommunityTonBalance, icon: <TonSVG /> },
        USDT: { value: totalCommunityUSDTBalance, icon: <UsdtSVG /> },
      },
    },
    {
      title: "Total Earnings",
      value: totalEarnings,
      subSection: {
        title: "Monthly Average",
        value: `$${totalMonthlyAverageBalance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      },
    },
    {
      title: "Community Activity Level",
      value: communityStats?.swapsAllTime,
      subSection: {
        title: "This Week",
        value: `${communityStats?.percentageChangeSwaps}%`, //logic for showing red or green
        percentage: true,
      },
    },
  ];

  const getValue = (title: string, value: string | number) => {
    if (title === "Total Earnings") {
      return (
        <>
          {(value as string)?.slice(0, -3)}
          <span style={{ fontSize: "20px", lineHeight: "24px" }}>
            {(value as string)?.slice(-3)}
          </span>
        </>
      );
    }
    if (title === "Community Activity Level") {
      return (
        <Flex>
          {value}
          <div
            className="small-para-regular"
            style={{
              padding: "6px 4px 6px 4px",
              alignItems: "end",
              marginBottom: 1,
              display: 'flex'
            }}
          >
            SWAPS
          </div>
        </Flex>
      );
    }
    return value;
  };

  return (
    <Carousel>
      {data?.map(({ title, value, earnings, subSection }) => (
        <div key={title}>
          <Flex
            key={title}
            className="carousel-card"
            vertical
            justify="center"
            align="flex-start"
            gap={8}
          >
            <Typography.Paragraph
              className={`${
                title === "Community Activity Level"
                  ? "tags-regular community-stats-title "
                  : "tags-regular"
              }`}
            >
              {title}
            </Typography.Paragraph>
            <Flex>
              <Typography.Title
                level={1}
                className={`${
                  title === "Total Earnings" ||
                  title === "Community Activity Level"
                    ? "total-earnings"
                    : ""
                }`}
              >
                {getValue(title, (value as string | number))}
              </Typography.Title>
            </Flex>
            {earnings && (
              <Flex className="carousel-bottom-section" align="center" gap={12}>
                {["TON", "USDT"]?.map((coin) => (
                  <Flex align="center" gap={8} key={coin}>
                    <Flex gap={5} key={coin}>
                      {earnings[coin as "TON" | "USDT"]?.icon}
                      <Typography.Paragraph className="small-para-regular">
                        {coin}
                      </Typography.Paragraph>
                    </Flex>
                    <Typography.Paragraph className="small-para-regular">
                      {earnings[coin as "TON" | "USDT"]?.value}
                    </Typography.Paragraph>
                  </Flex>
                ))}
              </Flex>
            )}
            {subSection && (
              <Flex className="carousel-bottom-section" align="center" gap={12}>
                <Typography.Paragraph className="small-para-regular">
                  {subSection?.title}
                </Typography.Paragraph>
                <Flex justify="flex-end" align="center">
                  {subSection?.percentage && <IncreaseSVG />}
                  <Typography.Paragraph
                    className={`small-para-regular sub-section-value ${
                      subSection?.percentage && "percentage-change"
                    }`}
                  >
                    {subSection?.value}
                  </Typography.Paragraph>
                </Flex>
              </Flex>
            )}
          </Flex>
        </div>
      ))}
    </Carousel>
  );
};

export default EarningCarousel;

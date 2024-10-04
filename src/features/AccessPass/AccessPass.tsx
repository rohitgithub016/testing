import { Divider, Flex, Popover, Switch, Typography } from "antd";
import "./index.css";
import Widget from "src/Component/Widget/Widget";
import { ReactElement, useState } from "react";
import UsdtSVG from "src/assets/svg/Coins/UsdtSVG";
import TonSVG from "src/assets/svg/Coins/TonSVG";
import DownArrowSVG from "src/assets/svg/Arrows/DownArrowSVG";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "src/Component/Button/Button";
import { ADD_INVITE_DETAILS } from "src/constants/pages";
import ProgressSteps from "src/Component/ProgressStep/ProgressSteps";
import { useSelector } from "react-redux";
import { selectTokenPriceInUSD } from "src/appSlice";

const intervalOptions = [
  { label: "1 Month", value: "monthly" },
  { label: "6 Months", value: "halfYearly" },
  { label: "12 Months", value: "yearly" },
];

const freeTrialOptions = [
  { label: "3-Day", value: "3" },
  { label: "7-Day", value: "7" },
  { label: "30-Day", value: "30" },
];

const currencyOptions = [
  { label: "TON", icon: <TonSVG /> },
  { label: "USDT", icon: <UsdtSVG /> },
];

const AccessPass = () => {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(intervalOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [freeTrial, setFreeTrial] = useState(false);
  const [freeTrialInterval, setFreeTrialInterval] = useState(
    freeTrialOptions[0]
  );
  const [amount, setAmount] = useState<number>(0);
  const tokenPriceInUSD = useSelector(selectTokenPriceInUSD);

  const navigate = useNavigate();

  const chatType = searchParams.get("chat-type");
  const groupName = searchParams.get("group-name");
  const groupId = searchParams.get("group-id") || "";
  const subscriptionId = searchParams.get("subscription-id");

  const handleSelectInterval = (interval: { label: string; value: string }) => {
    setSelectedInterval(interval);
  };

  const getConvertedPrice = () => {
    if (selectedCurrency?.label === "TON") {
      return `≈$${(tokenPriceInUSD?.TON * Number(amount)).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`;
    } else if (selectedCurrency?.label === "USDT") {
      return `≈$${(tokenPriceInUSD?.USDT * Number(amount)).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`;
    }
  };

  const handleSelectCurrency = (currency: {
    label: string;
    icon: ReactElement;
  }) => {
    setSelectedCurrency(currency);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event?.target?.value));
  };

  const CurrencyOptions = () => {
    return (
      <Flex vertical gap={10}>
        {currencyOptions.map((currency) => (
          <Flex
            onClick={() => handleSelectCurrency(currency)}
            align="center"
            gap={10}
          >
            {currency.icon}
            <Typography.Paragraph className="txt">
              {currency?.label}
            </Typography.Paragraph>
          </Flex>
        ))}
      </Flex>
    );
  };

  const handleFreeTrial = (checked: boolean) => {
    setFreeTrial(checked);
  };

  const handleContinue = () => {
    if (amount > 0) {
      navigate(
        `${ADD_INVITE_DETAILS}?period=${selectedInterval?.value}&token=${
          selectedCurrency?.label
        }&amount=${amount}&chatType=${chatType}&groupId=${groupId}&groupName=${groupName}${
          freeTrial ? `&freetrial-period=${freeTrialInterval?.value}` : ""
        }${subscriptionId ? `&subscription-id=${subscriptionId}` : ""}`
      );
    }
  };

  const onboardingCompleted = localStorage.getItem("onboardingCompleted");

  let progessPercentage = [100, 100, 75];

  if (onboardingCompleted === "true") {
    progessPercentage = [50, 0, 0];
  }

  return (
    <Flex
      className="access-pass-content"
      vertical
      align="center"
      gap={24}
      style={{ height: "100vh", overflow: "auto" }}
    >
      <Flex style={{ width: "100%" }} vertical>
        <ProgressSteps completedPercentage={progessPercentage} />
      </Flex>
      <Flex
        className="access-pass-content-header"
        vertical
        align="center"
        gap={12}
      >
        <Typography.Title className="txt-bold" level={2}>
          Set up the AccessPass
        </Typography.Title>
        <Flex gap={4} justify="center" align="center">
          <div className="access-pass-group-icon">
            {groupName?.length ? groupName[0] : ""}
          </div>
          <Typography.Paragraph className="small-para-regular">
            {groupName}
          </Typography.Paragraph>
        </Flex>
      </Flex>
      <Widget title="RENEW EVERY *">
        <Flex
          className="access-pass-renew-buttons"
          justify={"space-between"}
          align="center"
          gap={10}
        >
          {intervalOptions?.map((interval) => (
            <Flex
              className={`renew-button ${
                selectedInterval?.label === interval?.label && "selected-border"
              }`}
              vertical
              align="center"
              onClick={() => handleSelectInterval(interval)}
              style={{
                ...(window.innerWidth < 375 && { padding: "12px 12px" }),
              }}
            >
              <Typography.Paragraph
                className={`large-para-regular ${
                  selectedInterval?.label === interval?.label &&
                  "selected-interval"
                } `}
              >
                {interval?.label}
              </Typography.Paragraph>
              {selectedInterval?.label === interval?.label && (
                <div className="corner-badge" />
              )}
            </Flex>
          ))}
        </Flex>
      </Widget>
      <Widget title="CURRENCY *">
        <Popover
          placement="bottom"
          content={CurrencyOptions}
          trigger="click"
          arrow={false}
          open={open}
          id={"currency-dropdown"}
        >
          <Flex className="access-pass-currency-selector" onClick={handleOpen}>
            <Flex className="access-pass-curreny-selector-input">
              {selectedCurrency.icon}
              <Flex className="cu">
                <Typography.Paragraph className="txt">
                  {selectedCurrency?.label}
                </Typography.Paragraph>
              </Flex>
              <Flex style={{ flexShrink: 0 }}>
                <DownArrowSVG />
              </Flex>
            </Flex>
          </Flex>
        </Popover>
      </Widget>
      <Widget title="PRICE *" text={getConvertedPrice()}>
        <Flex
          vertical
          align="flex-start"
          className="access-pass-price-input-container"
        >
          <Flex
            className="access-pass-price-input-content"
            vertical
            align="flex-start"
            gap={4}
          >
            <Flex
              className="access-pass-price-input-main"
              align="flex-start"
              gap={4}
              justify="space-between"
            >
              <input
                className="access-pass-price-input"
                placeholder="Enter Amount"
                type="number"
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
                }
                onChange={handleAmount}
              />
              <span className="input-currency-label access-pass-price-input">
                {selectedCurrency?.label}
              </span>
            </Flex>
          </Flex>
        </Flex>
      </Widget>

      <Divider className="access-pass-divider" />

      <Widget
        title="FREE TRIAL"
        tooltipText="Invitees can enjoy your chat for the trial period before deciding to make the subscription payment."
        button={
          <Switch
            onChange={handleFreeTrial}
            style={{ background: freeTrial ? "#692DF6" : "#FFFFFF" }}
          />
        }
      >
        <Flex gap={10} style={{ marginTop: "10px" }}>
          {freeTrial &&
            freeTrialOptions?.map((option) => (
              <Flex
                className={`renew-button ${
                  freeTrialInterval?.label === option?.label &&
                  "selected-border"
                }`}
                vertical
                align="center"
                onClick={() => setFreeTrialInterval(option)}
              >
                <Typography.Paragraph
                  className={`large-para-regular ${
                    freeTrialInterval?.label === option?.label &&
                    "selected-interval"
                  } `}
                >
                  {option?.label}
                </Typography.Paragraph>
                {freeTrialInterval?.label === option?.label && (
                  <div className="corner-badge" />
                )}
              </Flex>
            ))}
        </Flex>
      </Widget>
      <div style={{ marginBottom: "100px" }}></div>
      <Flex
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#EFEFF4",
          border: "none",
          zIndex: 1,
        }}
      >
        <Flex style={{ padding: "0px 16px 30px 16px", width: "100%" }}>
          <Button text="Continue" clickHandler={handleContinue} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccessPass;

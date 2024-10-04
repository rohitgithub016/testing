import { Divider, Flex, Popover, Typography } from "antd";
import "./index.css";
import Button from "src/Component/Button/Button";
import { SubscriptionDetails, usePrepareTransactionMutation } from "src/api";
import getAmountDetails from "src/utils/getAmountDetails";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { toNano, SendMode } from "@ton/core";
import WebApp from "@twa-dev/sdk";
import { useSelector } from "react-redux";
import { selectTokenPriceInUSD } from "src/appSlice";
import DisconnectWallet from "src/Component/DisconnectWallet";
import { useNavigate } from "react-router-dom";
import { PAYMENT_SUCCESS } from "src/constants/pages";

interface Message {
  address: string;
  amount: string;
  payload?: string;
}

interface Transaction {
  validUntil: number;
  sendMode: number;
  messages: Message[];
}

interface ConnectSubscriberWalletProps {
  subscriptionDetails: SubscriptionDetails;
  getInviteUrl: () => void;
  freeTrialConsumed: boolean;
  subscriberTONbalance: number;
  subscriberUSDTbalance: number;
}

const AccessPassPayment = ({
  subscriptionDetails,
  getInviteUrl,
  freeTrialConsumed,
  subscriberTONbalance,
  subscriberUSDTbalance,
}: ConnectSubscriberWalletProps) => {
  const walletAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const groupName = subscriptionDetails?.group?.name;
  const amountDetails = getAmountDetails(subscriptionDetails);
  const amount = subscriptionDetails?.price?.amount;
  const currency = subscriptionDetails?.price?.currency;
  const freeTrial = subscriptionDetails?.freeTrial;
  const freeTrialPeriod = subscriptionDetails?.freeTrialPeriod;
  const tokenPriceInUsd = useSelector(selectTokenPriceInUSD);
  const navigate = useNavigate();
  const [tonConnectUi] = useTonConnectUI();

  const [
    prepareTransaction,
    { data: prepareTransactionData, isSuccess: prepareTransactionDataSuccess },
  ] = usePrepareTransactionMutation();

  const defaultTx: Transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 600,
    sendMode: SendMode.PAY_GAS_SEPARATELY,
    messages: [
      {
        address: "",
        amount: String(amount),
      },
    ],
  };

  async function handleTransaction() {
    if (currency == "TON") {
      defaultTx.messages[0].address = prepareTransactionData?.address as string;
      defaultTx.messages[0].amount = toNano(
        prepareTransactionData?.amount as number
      ).toString();
    } else {
      defaultTx.messages[0].address = prepareTransactionData?.address as string;
      // KJ:- This is not required, as it is a pure jetton transfer and
      // the backend is handling the amount to be transferred in the payload
      // This is a quick fix, @rohit can check and debug better in later stages!!
      defaultTx.sendMode = SendMode.NONE;
      defaultTx.messages[0].amount = toNano(0.05).toString();
      defaultTx.messages[0].payload = prepareTransactionData?.payload;
    }

    const res = await tonConnectUi.sendTransaction(defaultTx);

    if (res.boc) {
      navigate(`${PAYMENT_SUCCESS}?subscription-id=${subscriptionDetails?._id}&group-name=${groupName}`)
      // getInviteUrl();
    } else {
      WebApp.showAlert("Something Went Wrong!!!");
    }
  }

  useEffect(() => {
    if (prepareTransactionDataSuccess) {
      handleTransaction();
    }
  }, [prepareTransactionDataSuccess]);

  function handleClick() {
    if (freeTrial && freeTrialConsumed !== undefined && !freeTrialConsumed) {
      getInviteUrl();
      return;
    }
    prepareTransaction({
      subscriptionId: subscriptionDetails?._id,
      walletAddress: rawAddress,
    });
  }

  const getButtonText = () => {
    if (freeTrial && !freeTrialConsumed) {
      return `Start ${freeTrialPeriod}-Day Free Trial`;
    }
    return `Subscribe for ${amountDetails?.slice(12)}`;
  };

  const getAmount = (amount: number, currency: string) => {
    if (currency === "TON") {
      const tonEarnings = `$${(amount * tokenPriceInUsd?.TON).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`;
      return `${tonEarnings}`;
    }
    const usdtEarnings = `$${(amount * tokenPriceInUsd?.USDT).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
    return `${usdtEarnings}`;
  };

  const getSubscriberBalance = (currency: string) => {
    if (currency === "TON") {
      return subscriberTONbalance;
    } else if (currency === "USDT") {
      return subscriberUSDTbalance;
    }
  };

  return (
    <Flex vertical className="payment-container" style={{ padding: "20px" }}>
      <Flex className="payment-details" vertical gap={50}>
        <Flex className="payment-card">
          <Flex className="payment-card-header-container">
            <Typography.Paragraph>YOU RECEIVED AN INVITE</Typography.Paragraph>
          </Flex>
          <Flex className="icon-container" justify="flex-end" align="center">
            <Flex className="icon" justify="center" align="center">
              <Typography.Paragraph
                className="txt"
                style={{ textAlign: "center" }}
              >
                {groupName[0]}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex vertical gap={10}>
            <Typography.Title level={1} style={{ textAlign: "center" }}>
              {groupName}
            </Typography.Title>
            <Typography.Paragraph
              className="large-para-regular"
              style={{ textAlign: "center" }}
            >
              {amountDetails}
            </Typography.Paragraph>
          </Flex>
        </Flex>
        <Flex vertical>
          <Flex vertical gap={8}>
            <Flex vertical>
              <Flex justify="space-between" align="center">
                <Typography.Paragraph
                  className="large-para-regular"
                  style={{ color: "#181827" }}
                >
                  Subscription Price
                </Typography.Paragraph>
                <Typography.Paragraph
                  className="large-para-regular"
                  style={{ color: "#181827" }}
                >
                  {getAmount(amount, currency)}
                </Typography.Paragraph>
              </Flex>
              <Flex justify="flex-end">
                <Typography.Paragraph className="xsmall-para-regular">
                  {`${amount} ${currency}`}
                </Typography.Paragraph>
              </Flex>
            </Flex>
            <Flex vertical>
              <Flex justify="space-between" align="center">
                <Typography.Paragraph
                  className="large-para-regular"
                  style={{ color: "#181827" }}
                >
                  Network Fee
                </Typography.Paragraph>
                <Typography.Paragraph
                  className="large-para-regular"
                  style={{ color: "#181827" }}
                >
                  $0
                </Typography.Paragraph>
              </Flex>
              <Flex justify="flex-end">
                <Typography.Paragraph className="xsmall-para-regular">
                  0 TON
                </Typography.Paragraph>
              </Flex>
            </Flex>
          </Flex>
          <Divider style={{ margin: 12 }} />
          <Flex vertical>
            <Flex justify="space-between" align="center">
              <Typography.Paragraph
                className="large-para-regular"
                style={{ color: "#181827" }}
              >
                Total Payment
              </Typography.Paragraph>
              <Typography.Paragraph className="large-para-regular txt-bold">
                {getAmount(amount, currency)}
              </Typography.Paragraph>
            </Flex>
            <Flex justify="flex-end">
              <Typography.Paragraph className="xsmall-para-regular">
                {`${amount} ${currency}`}
              </Typography.Paragraph>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="access-payment-btn-container">
        <Flex vertical style={{ paddingBottom: 6 }}>
          <Typography.Paragraph
            className="small-para-medium"
            style={{ paddingBottom: 8, color: "#000000" }}
          >
            Payment via
          </Typography.Paragraph>

          <Typography.Paragraph
            className="small-para-regular"
            style={{ color: "#3C3C4399" }}
          >
            {`Available balance: ${getSubscriberBalance(
              currency
            )?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} ${currency} (${getAmount(
              getSubscriberBalance(currency) as number,
              currency
            )})`}
          </Typography.Paragraph>
        </Flex>
        <Flex gap={12} style={{ marginBottom: "10px" }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6667 25L11.6667 15"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M34.7222 15H30.3846C27.4108 15 25 17.2386 25 20C25 22.7614 27.4108 25 30.3846 25H34.7222C34.8611 25 34.9306 25 34.9892 24.9964C35.888 24.9417 36.6039 24.2769 36.6628 23.4423C36.6667 23.3879 36.6667 23.3234 36.6667 23.1944V16.8056C36.6667 16.6766 36.6667 16.6121 36.6628 16.5577C36.6039 15.7231 35.888 15.0583 34.9892 15.0036C34.9306 15 34.8611 15 34.7222 15Z"
              stroke="black"
              stroke-width="1.5"
            />
            <path
              d="M34.9416 15.0003C34.8121 11.8798 34.3943 9.96657 33.0473 8.61961C31.0947 6.66699 27.952 6.66699 21.6666 6.66699L16.6666 6.66699C10.3812 6.66699 7.23849 6.66699 5.28587 8.61961C3.33325 10.5722 3.33325 13.7149 3.33325 20.0003C3.33325 26.2857 3.33325 29.4284 5.28587 31.381C7.2385 33.3337 10.3812 33.3337 16.6666 33.3337H21.6666C27.952 33.3337 31.0947 33.3337 33.0473 31.381C34.3943 30.0341 34.8121 28.1208 34.9416 25.0003"
              stroke="black"
              stroke-width="1.5"
            />
            <path
              d="M29.9854 20H30.0004"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Flex
            gap={41}
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Typography.Paragraph
              className="large-para-regular"
              style={{ color: "#000000" }}
            >
              {walletAddress.slice(0, 22)}
            </Typography.Paragraph>
            <Popover
              content={<DisconnectWallet />}
              trigger="click"
              placement="topRight"
              arrow={false}
              id="subscriber-wallet"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.42187 17.5H4.08854C3.64651 17.5 3.22259 17.3244 2.91003 17.0118C2.59747 16.6993 2.42188 16.2754 2.42188 15.8333V4.16667C2.42188 3.72464 2.59747 3.30072 2.91003 2.98816C3.22259 2.67559 3.64651 2.5 4.08854 2.5H7.42187"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.2559 14.1663L17.4225 9.99967L13.2559 5.83301"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.4219 10H7.42188"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Popover>
          </Flex>
        </Flex>
        <Flex vertical gap={14}>
          <Button text={getButtonText()} clickHandler={handleClick} />
          {freeTrial && !freeTrialConsumed && (
            <Typography.Paragraph className="large-para-regular txt-center">
              {`then ${amountDetails?.slice(12)}`}
            </Typography.Paragraph>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccessPassPayment;

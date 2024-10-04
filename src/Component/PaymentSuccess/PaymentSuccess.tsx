import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { usePaymentSuccessMutation } from "src/api";
import { selectUserName } from "src/appSlice";
import Page from "../Page/Page";
import WebApp from "@twa-dev/sdk";

const PaymentSuccess = () => {
  const [timer, setTimer] = useState(3);

  const userName = useSelector(selectUserName);
  const [searchParams] = useSearchParams();
  const groupName = searchParams?.get("group-name");
  const subscriptionId = searchParams?.get("subscription-id");
  const [loading, setLoading] = useState(true);

  const [
    getInviteUrlApi,
    { isSuccess: inviteLinkSuccess, data: inviteLink, isError },
  ] = usePaymentSuccessMutation();

  useEffect(() => {
    if (subscriptionId && userName) {
      getInviteUrlApi({
        subscriptionId: subscriptionId as string,
        username: userName,
      });
    }
  }, []);

  useEffect(() => {
    if (inviteLinkSuccess || isError) {
      setLoading(false);
    }
  }, [inviteLinkSuccess, isError]);

  useEffect(() => {
    if (timer >= 1 && inviteLinkSuccess) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else if (inviteLinkSuccess) {
      if (WebApp?.platform === "android") {
        window?.open(inviteLink, "_self");
        WebApp?.close();
      } else {
        WebApp.openTelegramLink(inviteLink);
        WebApp?.close();
      }
    }
  }, [timer, inviteLinkSuccess]);

  return (
    <Page loading={loading}>
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ height: "100vh" }}
      >
        <Flex vertical>
          <Flex
            vertical
            style={{ paddingTop: "36px", paddingBottom: "26px" }}
            justify="center"
            align="center"
          >
            <svg
              width="152"
              height="152"
              viewBox="0 0 152 152"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M76 152C117.974 152 152 117.974 152 76C152 34.0264 117.974 0 76 0C34.0264 0 0 34.0264 0 76C0 117.974 34.0264 152 76 152Z"
                fill="#54CB68"
              />
              <path
                d="M76.25 134.5C108.421 134.5 134.5 108.197 134.5 75.75C134.5 43.303 108.421 17 76.25 17C44.079 17 18 43.303 18 75.75C18 108.197 44.079 134.5 76.25 134.5Z"
                fill="#54CB68"
                stroke="white"
                stroke-width="6"
                stroke-linecap="round"
              />
              <path
                d="M52.625 78.8753L67.125 93.3753C67.125 93.3753 91.483 68.3233 99.631 59.9443"
                fill="#54CB68"
              />
              <path
                d="M52.625 78.8753L67.125 93.3753C67.125 93.3753 91.483 68.3233 99.631 59.9443"
                stroke="white"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Flex>
          <Flex vertical gap={4} justify="center" align="center">
            <Typography.Title
              level={2}
              style={{ letterSpacing: "-0.1px", lineHeight: "30px" }}
            >
              Payment Successful
            </Typography.Title>
            <Typography.Paragraph
              className="large-para-regular"
              style={{ color: "#181827" }}
            >
              Redirecting you to{" "}
              <span
                style={{
                  fontFamily: "Scandia-Medium",
                  fontWeight: 400,
                  letterSpacing: "-0.43px",
                  lineHeight: "22px",
                }}
              >
                {`${groupName} in ${timer}s`}
              </span>
            </Typography.Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default PaymentSuccess;

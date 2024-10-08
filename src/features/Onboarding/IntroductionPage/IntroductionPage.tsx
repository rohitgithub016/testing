import { Checkbox, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import AccessPass from "src/assets/svg/IntroductionPage/AccessPass";
import AnalyticsDashboard from "src/assets/svg/IntroductionPage/AnalyticsDashboard";
import ChainSync from "src/assets/svg/IntroductionPage/ChainSync";
import { useEffect, useRef, useState } from "react";
import WebApp from "@twa-dev/sdk";
import Button from "src/Component/Button/Button";
import { ACCEPTED_TERMS } from "src/constants/localStorage";
import { CONNECT_WALLET } from "src/constants/pages";
import "./index.css";
import { useAcceptTermsMutation } from "src/api";
import { useSelector } from "react-redux";
import { selectUserName } from "src/appSlice";

const IntroductionPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [isTermsAccepted, setTermsAccepted] = useState(false);
  const userName = useSelector(selectUserName);
  const [acceptTerms, { isSuccess }] = useAcceptTermsMutation();

  const navigate = useNavigate();

  useEffect(() => {
    WebApp?.setBackgroundColor("#fff");
  }, []);

  useEffect(()=>{
    if(ref?.current?.clientHeight){
      setHeight(ref?.current?.clientHeight)
    }
  },[])

  useEffect(() => {
    if (isSuccess) {
      navigate(CONNECT_WALLET);
    }
  }, [isSuccess]);

  const steps = [
    {
      step: "ChainSync",
      description:
        "Connect your chat on-chain to unlock community analytics and insights.",
      Svg: ChainSync,
    },
    {
      step: "GateKeeper",
      description:
        "Enable token gating to offer a secure and exclusive environment for token holders.",
      Svg: AnalyticsDashboard,
    },
    {
      step: "AccessPass",
      description:
        "Offer paid chats with exclusive benefits to boost user engagement and drive revenue",
      Svg: AccessPass,
    },
    {
      step: "Analytics Dashboard",
      description:
        "Access a  dashboard with all the analytics to monitor and optimize community performance.",
      Svg: AnalyticsDashboard,
    },
  ];

  const acceptTermsAndPolicy = () => {
    setTermsAccepted(!isTermsAccepted);
  };

  const redirectToTermsPage = () => {
    WebApp.openLink("https://telegram.org/tos/mini-apps");
  };

  const handleGetStarted = () => {
    navigate(CONNECT_WALLET);

    if (isTermsAccepted) {
      localStorage.setItem(ACCEPTED_TERMS, "true");
      acceptTerms({ username: userName, acceptedTerms: true });
    }
  };

  return (
    <Flex vertical className="introduction-page" style={{height: `calc(100vh - ${height}px)`}}>
      <Flex className="introduction-container" gap={20} vertical>
        <Flex gap={12} vertical className="introduction-header">
          <Typography.Title
            level={2}
            className="txt-bold heading2 header-description"
          >
            Take Your Chats Onchain
          </Typography.Title>
          <Typography.Paragraph className="large-para-regular">
            Elevate your Telegram chats with on-chain connectivity on the TON
            blockchain.
          </Typography.Paragraph>
        </Flex>
        <Flex vertical className="introduction-content">
          {steps.map(({ step, description, Svg }) => (
            <Flex key={step} className="introduction-content">
              <Flex className="svg-container">
                <Svg />
              </Flex>
              <Flex className="introduction-content-outer-container">
                <Flex className="introduction-content-inner-container" vertical>
                  <Typography.Paragraph className="large-para-medium">
                    {step}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="xsmall-para-regular">
                    {description}
                  </Typography.Paragraph>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex className="checkbox-btn-container" ref={ref}>
        <Flex
          vertical
          style={{ padding: "0px 32px" }}
          justify="center"
          align="center"
          gap={12}
        >
          <Flex align="center" gap={10}>
            <Checkbox
              checked={isTermsAccepted}
              onChange={acceptTermsAndPolicy}
            />
            <Typography.Paragraph
              className="xsmall-para-regular"
              style={{ color: "#000", lineHeight: "18px" }}
            >
              I agree to the{" "}
              <span
                style={{ textDecorationLine: "underline" }}
                onClick={redirectToTermsPage}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span style={{ textDecorationLine: "underline" }}>
                Privacy Policy
              </span>
              .
            </Typography.Paragraph>
          </Flex>
          <Flex
            vertical
            className="introduction-btn-container"
            justify="center"
            align="flex-start"
          >
            <Button
              clickHandler={handleGetStarted}
              text="Get Started"
              disabled={!isTermsAccepted}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default IntroductionPage;

import { useTonAddress } from "@tonconnect/ui-react";
import { Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetGroupsQuery, useGetCreatorSubscriptionsQuery } from "src/api";
import { selectUserName } from "src/appSlice";
import { ONBOARDING_COMPLETED } from "src/constants/localStorage";
import {
  CHAINLINK_CHAT,
  CONNECT_WALLET,
  ENABLE_HUBZ_BOT,
} from "src/constants/pages";
import getShortenedAddress from "src/utils/getShortenedAddress";

const OnboardingSteps = () => {
  const navigate = useNavigate();
  const walletAddress = useTonAddress(false);
  const userFriendlyAddress = useTonAddress();
  const [isGroupPresent, setIsGroupPresent] = useState(false);
  const [firstGroupName, setGroupName] = useState("");
  const [isSubcriptionAvailable, setIsSubcriptionAvailable] = useState(false);
  let disableSubscriptionButton = true;
  const userName = useSelector(selectUserName);

  if (walletAddress && isGroupPresent) {
    disableSubscriptionButton = false;
  }

  const { data: groupsData } = useGetGroupsQuery(userName);
  const { data: subscriptionsList } = useGetCreatorSubscriptionsQuery(userName);

  useEffect(() => {
    if (groupsData?.length) {
      setGroupName(groupsData[0]?.groupName);
      setIsGroupPresent(true);
    }
  }, [groupsData]);

  useEffect(() => {
    if (subscriptionsList?.length) {
      setIsSubcriptionAvailable(true);
    }
  }, [subscriptionsList]);

  const enableHunbzBotDisabled = !walletAddress && !isGroupPresent;

  const handleClickConnect = () => {
    navigate(CONNECT_WALLET);
  };

  const handleAdmin = () => {
    if (enableHunbzBotDisabled) {
      return;
    } else {
      navigate(ENABLE_HUBZ_BOT);
    }
  };

  useEffect(() => {
    if (walletAddress && isGroupPresent && isSubcriptionAvailable) {
      localStorage.setItem(ONBOARDING_COMPLETED, "true");
    }
  }, [walletAddress, isGroupPresent, isSubcriptionAvailable]);

  const completed = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.6629 7.5553L11.2358 13.196L8.75664 10.7157L8.75036 10.7094L8.74386 10.7033C8.45359 10.4328 8.06966 10.2856 7.67296 10.2926C7.27626 10.2996 6.89777 10.4603 6.61722 10.7408C6.33666 11.0214 6.17596 11.3999 6.16896 11.7966C6.16196 12.1933 6.30921 12.5772 6.57969 12.8675L6.58568 12.8739L6.59188 12.8801L10.2301 16.5197L10.2305 16.5201C10.3761 16.6654 10.5494 16.7799 10.7401 16.8567C10.9308 16.9335 11.1351 16.9712 11.3407 16.9674C11.5463 16.9636 11.749 16.9184 11.9367 16.8345C12.1245 16.7507 12.2934 16.6299 12.4335 16.4793L12.4462 16.4656L12.4578 16.4511L17.934 9.6059C18.2009 9.31908 18.348 8.94051 18.3443 8.54806C18.3405 8.14724 18.1796 7.7639 17.8963 7.48035L17.7499 7.33375H17.7247C17.6199 7.25609 17.5053 7.19197 17.3836 7.14314C17.1926 7.06646 16.988 7.0291 16.7821 7.03329L16.7923 7.53319L16.7821 7.0333C16.5763 7.03749 16.3734 7.08315 16.1856 7.16755C15.9978 7.25195 15.829 7.37335 15.6892 7.5245L15.6754 7.53937L15.6629 7.5553ZM22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5C9.21523 22.5 6.54451 21.3938 4.57538 19.4246C2.60625 17.4555 1.5 14.7848 1.5 12C1.5 9.21523 2.60625 6.54451 4.57538 4.57538C6.54451 2.60625 9.21523 1.5 12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12Z"
        fill="#54CB68"
        stroke="#54CB68"
      />
    </svg>
  );

  const list = [
    {
      title: "Connect Wallet",
      Icon: walletAddress ? (
        completed
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H13C16.7712 20 18.6569 20 19.8284 18.8284C20.6366 18.0203 20.8873 16.8723 20.965 15V9C20.8873 7.1277 20.6366 5.97975 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"
            fill="#692DF6"
            stroke="#692DF6"
            strokeWidth="1.5"
          />
          <path
            d="M7 15L7 9"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.8333 9H18.2308C16.4465 9 15 10.3431 15 12C15 13.6569 16.4465 15 18.2308 15H20.8333C20.9167 15 20.9583 15 20.9935 14.9979C21.5328 14.965 21.9623 14.5662 21.9977 14.0654C22 14.0327 22 13.994 22 13.9167V10.0833C22 10.006 22 9.96726 21.9977 9.9346C21.9623 9.43384 21.5328 9.03496 20.9935 9.00214C20.9583 9 20.9167 9 20.8333 9Z"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M17.9912 12H18.0002"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      clickHandler: handleClickConnect,
      description: walletAddress
        ? `TON wallet: ${getShortenedAddress(userFriendlyAddress)}`
        : "",
    },
    {
      title: "Enable Hubz bot",
      Icon: isGroupPresent ? (
        completed
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="6"
            r="4"
            fill={enableHunbzBotDisabled ? "#9B9BA3" : "#692DF6"}
            stroke={enableHunbzBotDisabled ? "#9B9BA3" : "#692DF6"}
            strokeWidth="1.5"
          />
          <path
            d="M4 17.5C4 19.9853 4 22 12 22C17.6874 22 19.3315 20.9817 19.8068 19.5V17.5C19.8068 15.1 16.6023 13.7181 15 13.3271C14.0736 13.1162 13.0609 13 12 13C7.58172 13 4 15.0147 4 17.5Z"
            fill={enableHunbzBotDisabled ? "#9B9BA3" : "#692DF6"}
            stroke={enableHunbzBotDisabled ? "#9B9BA3" : "#692DF6"}
            strokeWidth="1.5"
          />
          <circle
            cx="18"
            cy="16"
            r="4"
            fill={enableHunbzBotDisabled ? "#9B9BA3" : "#692DF6"}
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M16.6665 16.0002L17.5 17.0002L19.3332 15.1113"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      clickHandler: handleAdmin,
      description: firstGroupName ? firstGroupName : " ",
      disabled: enableHunbzBotDisabled,
    },
    {
      title: "Chainlink a Chat",
      Icon: isSubcriptionAvailable ? (
        completed
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10.2 21H13.8C17.1941 21 18.8912 21 19.9456 19.9456C21 18.8912 21 17.1941 21 13.8V13.4066C21 11.8275 21 11.0379 20.6886 10.3387C20.3772 9.63948 19.7903 9.11128 18.6165 8.05489L15.0536 4.84828C14.0386 3.93472 13.531 3.47793 12.9083 3.23897C12.2856 3 11.5993 3 10.2268 3C6.81482 3 5.10883 3 4.05442 4.05442C3 5.10883 3 6.80589 3 10.2V13.8C3 17.1941 3 18.8912 4.05442 19.9456C5.10883 21 6.80589 21 10.2 21Z"
            fill={disableSubscriptionButton ? "#3C3C43" : "#692DF6"}
            fill-opacity={disableSubscriptionButton ? "0.4" : "1"}
          />
          <path
            d="M15.0536 4.84828L14.5519 5.40575L15.0536 4.84828ZM18.6165 8.05489L18.1148 8.61236L18.6165 8.05489ZM20.6886 10.3387L20.0035 10.6438V10.6438L20.6886 10.3387ZM4.05442 19.9456L4.58475 19.4153H4.58475L4.05442 19.9456ZM19.9456 19.9456L19.4153 19.4153L19.9456 19.9456ZM13.8 20.25H10.2V21.75H13.8V20.25ZM3.75 13.8V10.2H2.25V13.8H3.75ZM20.25 13.4066V13.8H21.75V13.4066H20.25ZM14.5519 5.40575L18.1148 8.61236L19.1183 7.49742L15.5554 4.29081L14.5519 5.40575ZM21.75 13.4066C21.75 11.8937 21.7651 10.9124 21.3737 10.0336L20.0035 10.6438C20.2349 11.1634 20.25 11.7612 20.25 13.4066H21.75ZM18.1148 8.61236C19.3378 9.71307 19.7721 10.1243 20.0035 10.6438L21.3737 10.0336C20.9823 9.15469 20.2428 8.5095 19.1183 7.49742L18.1148 8.61236ZM10.2268 3.75C11.6561 3.75 12.1768 3.76158 12.6396 3.93918L13.177 2.53875C12.3944 2.23842 11.5425 2.25 10.2268 2.25V3.75ZM15.5554 4.29081C14.5822 3.41492 13.9595 2.83904 13.177 2.53875L12.6396 3.93918C13.1025 4.11683 13.495 4.45451 14.5519 5.40575L15.5554 4.29081ZM10.2 20.25C8.48174 20.25 7.2685 20.2484 6.34976 20.1249C5.45259 20.0043 4.94938 19.7799 4.58475 19.4153L3.52409 20.4759C4.21387 21.1657 5.08639 21.4685 6.14989 21.6115C7.19181 21.7516 8.52415 21.75 10.2 21.75V20.25ZM2.25 13.8C2.25 15.4759 2.24841 16.8082 2.38849 17.8501C2.53147 18.9136 2.8343 19.7861 3.52409 20.4759L4.58475 19.4153C4.22011 19.0506 3.99573 18.5474 3.87511 17.6502C3.75159 16.7315 3.75 15.5183 3.75 13.8H2.25ZM13.8 21.75C15.4759 21.75 16.8082 21.7516 17.8501 21.6115C18.9136 21.4685 19.7861 21.1657 20.4759 20.4759L19.4153 19.4153C19.0506 19.7799 18.5474 20.0043 17.6502 20.1249C16.7315 20.2484 15.5183 20.25 13.8 20.25V21.75ZM20.25 13.8C20.25 15.5183 20.2484 16.7315 20.1249 17.6502C20.0043 18.5474 19.7799 19.0506 19.4153 19.4153L20.4759 20.4759C21.1657 19.7861 21.4685 18.9136 21.6115 17.8501C21.7516 16.8082 21.75 15.4759 21.75 13.8H20.25ZM3.75 10.2C3.75 8.48174 3.75159 7.2685 3.87511 6.34976C3.99573 5.45259 4.22011 4.94938 4.58475 4.58475L3.52409 3.52409C2.8343 4.21387 2.53147 5.08639 2.38849 6.14989C2.24841 7.19181 2.25 8.52415 2.25 10.2H3.75ZM10.2268 2.25C8.54195 2.25 7.20316 2.24842 6.15703 2.38843C5.0899 2.53125 4.21445 2.83372 3.52409 3.52409L4.58475 4.58475C4.94879 4.2207 5.45355 3.99596 6.35601 3.87517C7.27949 3.75158 8.49969 3.75 10.2268 3.75V2.25Z"
            fill={disableSubscriptionButton ? "#3C3C43" : "#692DF6"}
            fill-opacity={disableSubscriptionButton ? "0.4" : "1"}
          />
          <path
            d="M7 14H14"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 17H12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13 3V5.33333C13 7.53322 13 8.63317 13.6509 9.31658C14.3017 10 15.3493 10 17.4444 10H21"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      ),
      clickHandler: () => {
        if (disableSubscriptionButton) {
          return;
        }
        navigate(CHAINLINK_CHAT);
      },
      disabled: disableSubscriptionButton,
    },
  ];

  return (
    <Flex vertical style={{ height: "100%" }}>
      <Flex
        justify="center"
        align="center"
        style={{ margin: "22px 69.8px 33.48px 70px" }}
      >
        <svg
          width="291"
          height="181"
          viewBox="0 0 291 181"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.41406 101.888L29.583 36.4755C29.7823 35.8293 30.2946 35.3275 30.9448 35.1418L103.55 14.3975"
            stroke="#DFE8FF"
          />
          <path
            d="M75.31 168.337L12.282 104.241C11.229 103.17 11.688 101.364 13.1245 100.925L75.31 81.9536"
            stroke="#DFE8FF"
          />
          <path
            d="M74.7539 84.1689L75.8255 165.607C75.8433 166.959 77.1698 167.904 78.4536 167.48L151.17 143.419"
            stroke="#DFE8FF"
          />
          <path d="M75.3086 84.7222H192.148" stroke="#DFE8FF" />
          <path
            d="M75.3086 84.7222L150.545 145.344C151.471 146.09 152.839 145.869 153.482 144.868L192.148 84.7222"
            stroke="#DFE8FF"
          />
          <path
            d="M73.6484 84.1686L100.897 18.9868C101.4 17.7828 102.903 17.3755 103.945 18.1605L191.595 84.1686"
            stroke="#DFE8FF"
          />
          <path
            d="M102.996 17.166H215.252C216.658 17.166 217.625 18.5792 217.116 19.8902L192.148 84.1685"
            stroke="#DFE8FF"
          />
          <path
            d="M153.387 142.865H222.901C224.466 142.865 225.425 141.149 224.605 139.817L191.041 85.2759"
            stroke="#DFE8FF"
          />
          <circle cx="76.4148" cy="167.229" r="13.2898" fill="#DFE8FF" />
          <circle cx="225.925" cy="140.65" r="16.6122" fill="#DFE8FF" />
          <circle cx="102.995" cy="16.6118" r="9.96732" fill="#DFE8FF" />
          <circle cx="149.51" cy="140.65" r="12.1823" fill="#DFE8FF" />
          <circle cx="76.4146" cy="84.1685" r="11.0748" fill="#DFE8FF" />
          <path
            d="M191.594 83.6145L276.746 60.3432C278.361 59.9017 278.751 57.7894 277.4 56.8002L218.727 13.8433"
            stroke="#DFE8FF"
          />
          <circle cx="218.175" cy="16.6122" r="16.6122" fill="#DFE8FF" />
          <circle cx="191.592" cy="84.1685" r="9.96732" fill="#DFE8FF" />
          <circle cx="280.194" cy="58.6963" r="9.96732" fill="#DFE8FF" />
          <circle cx="9.96732" cy="101.888" r="9.96732" fill="#DFE8FF" />
          <circle cx="29.9009" cy="36.5464" r="9.96732" fill="#DFE8FF" />
          <path d="M227.035 142.865L280.748 60.3579" stroke="#DFE8FF" />
          <path
            d="M145.062 41C119.622 41 99 61.3151 99 86.3731C99 111.431 119.622 131.746 145.062 131.746C170.502 131.746 191.123 111.431 191.123 86.3731C191.123 61.3151 170.5 41 145.062 41Z"
            fill="url(#paint0_linear_11255_2248)"
          />
          <path
            d="M151.644 112.57L145.064 116.311L131.904 108.826L118.744 116.311V101.341L112.164 97.6V75.1456L125.324 67.6609V97.6L138.484 105.085V90.1152H151.644V112.57ZM164.804 105.085V75.1456L151.644 67.6609V82.6304H138.484V60.1761L145.064 56.4346L177.966 75.1456V97.6L164.806 105.085H164.804Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_11255_2248"
              x1="105.164"
              y1="63.683"
              x2="184.354"
              y2="110.096"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#08C1FD" />
              <stop offset="0.5" stop-color="#4C79F5" />
              <stop offset="1" stop-color="#8246F5" />
            </linearGradient>
          </defs>
        </svg>
      </Flex>
      <Flex vertical gap={"32px"} style={{ padding: "12px 32px" }}>
        <Flex vertical gap={"8px"}>
          <Typography.Title
            level={2}
            className="txt-bold txt-center"
            style={{ lineHeight: "30px", letterSpacing: "-0.1px" }}
          >
            Get Started
          </Typography.Title>
          <Typography.Paragraph
            className="large-para-regular"
            style={{ lineHeight: "21px", textAlign: "center", letterSpacing: "-0.4px" }}
          >
            Set up your account and get your chats on-chain with these simple
            steps.
          </Typography.Paragraph>
        </Flex>
        <Flex vertical gap={"18px"}>
          {list.map(({ title, Icon, clickHandler, disabled, description }) => (
            <Flex key={title} gap={12} vertical justify="flex-end">
              <Card
                bodyStyle={{ padding: "2px 0px 2px 12px", display: "flex" }}
                style={{ borderRadius: "12px", paddingLeft: "12px" }}
                onClick={clickHandler}
              >
                <Flex style={{ paddingRight: "12px" }} align="center">
                  {Icon}
                </Flex>
                <Flex justify="space-between" style={{ width: "100%" }}>
                  <Flex
                    vertical
                    style={{ padding: "12px 12px 12px 0px", flex: 1 }}
                  >
                    <Typography.Title
                      level={4}
                      className={`heading-regular ${
                        disabled && "disabled-onboarding-btn"
                      }`}
                      style={{
                        lineHeight: "22px",
                        letterSpacing: "-0.45px",
                      }}
                    >
                      {title}
                    </Typography.Title>
                    {description && (
                      <Typography.Paragraph
                        className="xsmall-para-regular"
                        style={{ lineHeight: "18px" }}
                      >
                        {description}
                      </Typography.Paragraph>
                    )}
                  </Flex>
                  {!disabled && (
                    <Flex style={{ paddingRight: "12px" }}>
                      <Flex
                        style={{ paddingLeft: "4px" }}
                        justify="center"
                        align="center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="20"
                          viewBox="0 0 19 20"
                          fill="none"
                        >
                          <path
                            d="M7.125 4.45801L11.875 9.99967L7.125 15.5413"
                            stroke="#9B9BA3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </Card>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OnboardingSteps;

import { useTonAddress } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";
import { Flex, Modal, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetGroupsQuery } from "src/api";
import { selectUserName } from "src/appSlice";
import EnableHubzBotSvg from "src/assets/svg/Onboarding/EnableHubzBotSvg";
import OnboardingScreen from "src/Component/OnboardingScreen/OnboardingStep";
import { CHAINLINK_CHAT } from "src/constants/pages";
import useNoticeBar from "src/hooks/useNoticeBar";
import getShortenedAddress from "src/utils/getShortenedAddress";
const bot = "hubz_dev_v2_bot";

const EnableHubzBot = () => {
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const {
    data: groupsData = [],
    refetch,
    isSuccess,
    isError,
  } = useGetGroupsQuery(userName);
  const { showSuccess, contextHolder } = useNoticeBar();
  const userFriendlyAddress = useTonAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeoutInterval, setTimeoutInterval] = useState(0);
  const [isGroupPresent, setIsGroupPresent] = useState(false);
  const [groupsCount, setGroupsCount] = useState(groupsData?.length || 0);
  const hasPagebeenRendered = useRef(false);

  useEffect(() => {
    return () => clearInterval(timeoutInterval);
  }, []);

  useEffect(() => {
    if (groupsData?.length > groupsCount && hasPagebeenRendered?.current) {
      navigate(CHAINLINK_CHAT);
    }
  }, [groupsData]);

  useEffect(() => {
    if (isSuccess && !hasPagebeenRendered?.current) {
      setGroupsCount(groupsData?.length);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess || isError) {
      hasPagebeenRendered.current = true;
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (userFriendlyAddress) {
      showSuccess(
        `Your TON wallet: ${getShortenedAddress(
          userFriendlyAddress
        )} has been successfully connected with Hubz.`
      );
    }
  }, [userFriendlyAddress]);

  useEffect(() => {
    if (isSuccess) {
      if (groupsData?.length) {
        setIsGroupPresent(true);
      }
    }
  }, [isSuccess]);

  const fetchGroupsDataInInterval = () => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);
    setTimeoutInterval(intervalId);
  };

  const handleClick = () => {
    fetchGroupsDataInInterval();
    if (WebApp?.platform === "ios") {
      WebApp.openTelegramLink(`https://t.me/${bot}?startgroup=true`);
    } else {
      WebApp.openTelegramLink(
        `https://t.me/${bot}?startgroup=true&admin=manage_chat invite_users change_info post_messages edit_messages delete_messages pin_messages restrict_members`
      );
    }
  };

  const handleBotAlreadyAdded = () => {
    if (isGroupPresent) {
      navigate(CHAINLINK_CHAT);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const stepNumber = 2;
  const stepName = "Enable Hubz Bot";
  const stepDescription =
    "Add @hubz_app_bot as an admin to your chat group and assign the necessary permissions.";
  const buttons = [
    { text: "Add Admin", clickHandler: handleClick, type: "contained" },
    {
      text: "I already have Hubz Bot enabled",
      clickHandler: handleBotAlreadyAdded,
      type: "outlined",
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        centered
        open={isModalOpen}
        closeIcon={null}
        footer={null}
        className="no-padding-modal"
      >
        <Flex vertical style={{ padding: "20px 0px" }}>
          <Flex vertical style={{ padding: "20px 0px" }} gap={12}>
            <Typography.Title
              level={4}
              className="txt-center title-bold"
              style={{ lineHeight: "22px", letterSpacing: "-0.45px" }}
            >
              No Hubz Chat Group Available
            </Typography.Title>
            <Typography.Paragraph className="txt-center large-para-regular">
              Tap ‘Search Chat Group’ to continue.
            </Typography.Paragraph>
          </Flex>
          <Flex style={{ padding: "0px 16px" }} justify="center">
            <button
              onClick={handleOk}
              style={{
                display: "flex",
                padding: "12px",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: "8px",
                backgroundColor: "#692DF6",
                color: "#fff",
                width: "100%",
                fontSize: "18px",
              }}
            >
              Got it
            </button>
          </Flex>
        </Flex>
      </Modal>
      <OnboardingScreen
        stepNumber={stepNumber}
        stepName={stepName}
        stepDescription={stepDescription}
        buttons={buttons}
        image={<EnableHubzBotSvg />}
      />
    </>
  );
};

export default EnableHubzBot;

import { Flex, message, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import ProgressSteps from "../ProgressStep/ProgressSteps";
import Button from "../Button/Button";
import CongratulationsSVG from "src/assets/svg/Invite/CongratulationsSVG";
import { DASHBOARD } from "src/constants/pages";
import { ONBOARDING_COMPLETED } from "src/constants/localStorage";
import "./index.css";
import useNoticeBar from "src/hooks/useNoticeBar";
import SendInviteSvg from "src/assets/svg/Invite/SendInviteSvg";
import ShareLinkSVG from "src/assets/svg/Invite/ShareLinkSVG";
import CopyLinkSVG from "src/assets/svg/Invite/CopyLinkSVG";

const Invite = () => {
  const { showSuccess, contextHolder } = useNoticeBar();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const inviteUrl = searchParams?.get("invite-link");
  const groupName = searchParams?.get("group-name");
  const chatType = searchParams?.get("chat-type");

  localStorage.setItem(ONBOARDING_COMPLETED, "true");

  //   const getChatType = (chatType) => {
  //     if (chatType === "chainsync") {
  //       return "ChainSync";
  //     } else if (chatType === "tokengated") {
  //       return "GateKeeper";
  //     }
  //   };

  useEffect(() => {
    if (groupName && chatType) {
      //   showSuccess(
      //     `You’ve successfully set up ${getChatType(
      //       chatType
      //     )} for ${groupName} on Hubz!`
      //   );
    }
  }, []);

  const sendInvite = () => {
    if (inviteUrl) {
      WebApp.openTelegramLink(`https://t.me/share/url?url=${inviteUrl}`);
    }
  };

  const copyLink = () => {
    message?.destroy("success");
    if (inviteUrl) {
      navigator?.clipboard
        ?.writeText(inviteUrl)
        .then(() => {
          showSuccess("Link copied!");
        })
        .catch((err) => {
          console.error("Failed to copy text to clipboard: ", err);
        });
    }
  };

  const shareLink = () => {
    if (inviteUrl) {
      navigator
        .share({
          text: inviteUrl,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Share failed:", error);
        });
    }
  };

  useEffect(() => {
    WebApp.setBackgroundColor("#FFF");
    WebApp.BackButton.hide();
    WebApp.BackButton.isVisible = false;
    return () => {
      WebApp.setBackgroundColor("#efeff4");
      WebApp.BackButton.show();
      WebApp.BackButton.isVisible = true;
    };
  }, []);

  const buttons = [
    {
      text: "Send Invite",
      icon: <SendInviteSvg />,
      clickHandler: sendInvite,
    },
    {
      text: "Share Link",
      icon: <ShareLinkSVG />,
      clickHandler: shareLink,
    },
    {
      text: "Copy Link",
      icon: <CopyLinkSVG />,
      clickHandler: copyLink,
    },
  ];

  const goToDashboard = () => {
    navigate(DASHBOARD);
  };

  let filteredButtons = buttons;

  if (WebApp?.platform === "android") {
    filteredButtons = buttons?.filter(
      (button) => button?.text !== "Share Link"
    );
  }

  let progressPercentage = [100, 100, 100];

  if (chatType === "chainSync") {
    progressPercentage = [100, 100];
  }
  return (
    <>
      {contextHolder}
      <Flex
        vertical
        style={{ height: "100vh", background: "#fff", overflow: "scroll" }}
        justify="space-between"
      >
        <Flex vertical gap={24} style={{ padding: "20px 16px" }}>
          <ProgressSteps completedPercentage={progressPercentage} />
          <Flex vertical gap={12}>
            <Typography.Title
              level={2}
              className="txt-center title-bold"
              style={{
                color: "#101019",
                lineHeight: "30px",
                fontWeight: 700,
                letterSpacing: "-0.1px",
              }}
            >
              Congratulations! You're All Set
            </Typography.Title>
            <Flex gap={4} justify="center" align="center">
              <Typography.Paragraph
                className="small-para-regular txt-center"
                style={{
                  color: "#000",
                  fontSize: "16px",
                  lineHeight: "21px",
                  letterSpacing: "-0.4px",
                }}
              >
                Your Hubz setup is complete. Invite your friends to join the
                chat and start experiencing all the benefits!
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex justify="center" align="center" vertical>
            <CongratulationsSVG />
          </Flex>
        </Flex>
        <Flex
          gap={12}
          justify="center"
          align="center"
          vertical
          style={{ height: "100%" }}
        >
          <Flex justify="center" align="center" vertical gap={12}>
            <Flex justify="center" align="center" gap={24}>
              {filteredButtons?.map(({ text, icon, clickHandler }) => (
                <Flex
                  justify="center"
                  align={"center"}
                  gap={8}
                  vertical
                  onClick={clickHandler}
                >
                  {icon}

                  <Typography.Paragraph className="invite-btn">
                    {text}
                  </Typography.Paragraph>
                </Flex>
              ))}
            </Flex>
            <Flex style={{ width: "100%" }} vertical>
              <Button
                clickHandler={goToDashboard}
                text={"Explore Dashboard"}
                type="outlined"
              />
            </Flex>
          </Flex>
        </Flex>
        <div style={{ marginBottom: "30px" }}></div>
      </Flex>
    </>
  );
};

export default Invite;

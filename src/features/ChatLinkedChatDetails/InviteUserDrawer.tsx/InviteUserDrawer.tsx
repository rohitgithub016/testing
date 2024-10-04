import { Drawer, Flex, message, Typography } from "antd";
import "./index.css";
import SendInviteSvg from "src/assets/svg/Invite/SendInviteSvg";
import ShareLinkSVG from "src/assets/svg/Invite/ShareLinkSVG";
import CopyLinkSVG from "src/assets/svg/Invite/CopyLinkSVG";
import { useSearchParams } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import useNoticeBar from "src/hooks/useNoticeBar";

interface InviteUserDrawerProps {
  openDrawer: boolean;
  handleClose: () => void;
  inviteUrl: string;
}

const InviteUserDrawer = ({
  openDrawer,
  handleClose,
  inviteUrl,
}: InviteUserDrawerProps) => {
  const [searchParams] = useSearchParams();
  const { showSuccess, contextHolder } = useNoticeBar();
  const chatType = searchParams.get("chat-type");
  const groupId = searchParams.get("group-id");

  const getInviterUrl = () => {
    if (chatType === "AccessPass") {
      return `https://t.me/hubz_dev_v2_bot?start=group-${groupId}`;
    }
    return inviteUrl;
  };
  // const [plans, setPlans] = useState([
  //   {
  //     name: "AccessPass 1",
  //     plan: "20.00 USDT / month ",
  //     freeTrial: "7-Day Free Trial",
  //     selected: false,
  //   },
  //   {
  //     name: "AccessPass 2",
  //     plan: "20.00 USDT / month ",
  //     freeTrial: "7-Day Free Trial",
  //     selected: false,
  //   },
  // ]);

  const sendInvite = () => {
    if (inviteUrl) {
      WebApp.openTelegramLink(`https://t.me/share/url?url=${getInviterUrl()}`);
    }
  };

  const shareLink = () => {
    if (inviteUrl) {
      navigator
        .share({
          text: getInviterUrl(),
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Share failed:", error);
        });
    }
  };

  const copyLink = () => {
    message?.destroy("success");
    if (inviteUrl) {
      navigator?.clipboard
        ?.writeText(getInviterUrl())
        .then(() => {
          showSuccess("Link copied!");
        })
        .catch((err) => {
          console.error("Failed to copy text to clipboard: ", err);
        });
    }
  };

  // const handleSelectPlan = (planName: string) => {
  //   const updatedPlans = plans.map((plan) => {
  //     if (plan?.name === planName) {
  //       return { ...plan, selected: !plan?.selected };
  //     }
  //     return plan;
  //   });
  //   setPlans(updatedPlans);
  // };

  const buttons = [
    { label: "Send Invite", icon: <SendInviteSvg />, clickHandler: sendInvite },
    { label: "Share Link", icon: <ShareLinkSVG />, clickHandler: shareLink },
    { label: "Copy Link", icon: <CopyLinkSVG />, clickHandler: copyLink },
  ];

  let filteredButtons = buttons;

  if (WebApp?.platform === "android") {
    filteredButtons = buttons?.filter(
      (button) => button?.label !== "Share Link"
    );
  }

  return (
    <>
      {contextHolder}
      <Drawer
        height={"40vh"}
        placement={"bottom"}
        width={500}
        onClose={handleClose}
        open={openDrawer}
        closable={false}
      >
        <Flex className="invite-user-drawer" vertical align="center" style={{overflow: 'hidden'}}>
          <Typography.Title
            level={2}
            style={{ lineHeight: "30px", letterSpacing: "-0.1px" }}
          >
            Invite chat users
          </Typography.Title>
          <Flex
            className="invite-drawer-buttons"
            justify="space-around"
            align="center"
          >
            {filteredButtons?.map(({ label, icon, clickHandler }) => (
              <Flex
                vertical
                justify="center"
                align="center"
                onClick={clickHandler}
                gap={8}
              >
                {icon}
                <Typography.Paragraph className="small-para-regular label">
                  {label}
                </Typography.Paragraph>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
};

export default InviteUserDrawer;

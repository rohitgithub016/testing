import WebApp from "@twa-dev/sdk";
import { Divider, Drawer, Flex, Modal, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFeedbackMutation } from "src/api";
import { selectUserName } from "src/appSlice";
import useNoticeBar from "src/hooks/useNoticeBar";
const supportBot = import.meta.env.VITE_SUPPORT_BOT;

interface ContactUsDrawerProp {
  onClose: () => void;
  openDrawer: boolean;
}

const ContactUsDrawer = ({ onClose, openDrawer }: ContactUsDrawerProp) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMessage, setFeedBackMessage] = useState("");
  const userName = useSelector(selectUserName);

  const [sendFeedback, { isSuccess, isError, error }] = useFeedbackMutation();
  const { showError, showSuccess, contextHolder } = useNoticeBar();

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      showSuccess(
        <div>
          Thank you for your feedback. Our support team{" "}
          <span style={{ color: "#3B63F6" }}>{supportBot}</span> may follow up
          if additional information is needed.
        </div>
      );
    } else if (isError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      showError(error?.data?.error?.message);
      setIsModalOpen(false);
    }
  }, [isSuccess, isError]);

  const contactUsList = [
    {
      name: "Contact Us",
      clickhandler: () => undefined,
    },
    {
      name: "Support",
      clickhandler: () => WebApp.openTelegramLink(`https://t.me/${supportBot}`),
    },
    {
      name: "Feedback",
      clickhandler: () => {
        onClose();
        setIsModalOpen(true);
      },
    },
  ];

  const handleSend = () => {
    
    if (feedbackMessage?.trim() === "" || feedbackMessage?.length < 4) {
      showError("A minimum of 4 characters is required.");
      return;
    } else if (feedbackMessage?.length === 2048) {
      showError("The maximum limit of 2048 characters has been exceeded.");
      return;
    }
    if (feedbackMessage) {
      sendFeedback({
        message: feedbackMessage,
        username: userName,
        type: "feedback",
      });
      setFeedBackMessage("");
    }
  };

  return (
    <>
    {contextHolder}
    <Drawer
      height={240}
      placement={"bottom"}
      width={500}
      onClose={onClose}
      open={openDrawer}
      closable={false}
    >
      <Modal
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        closeIcon={null}
        footer={null}
        className="feedback-modal"
      >
        <Flex style={{ padding: "24px" }} vertical gap={24}>
          <Flex vertical gap={8}>
            <Typography.Paragraph
              className="large-para-regular"
              style={{ color: "#1E1E1E" }}
            >
              Feedback
            </Typography.Paragraph>
            <Flex vertical gap={10}>
              <TextArea
                id="feed"
                className="large-para-regular feedback-text-area"
                style={{ padding: "12px 16px" }}
                rows={4}
                placeholder="Share your thoughts: your feedback helps us improve."
                onChange={(event) => setFeedBackMessage(event?.target?.value)}
                value={feedbackMessage}
                maxLength={2048}
              />
            </Flex>
          </Flex>
          <button
            onClick={handleSend}
            style={{
              display: "flex",
              padding: "16px 12px",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              borderRadius: "8px",
              backgroundColor: "#692DF6",
              color: "#fff",
              width: "100%",
            }}
          >
            <Typography.Title
              level={4}
              style={{
                color: "#fff",
                width: "100%",
                letterSpacing: "-0.45",
              }}
            >
              Submit
            </Typography.Title>
          </button>
        </Flex>
      </Modal>
      <Flex vertical gap={8} style={{ background: "#EEEEEE" }}>
        <Flex vertical>
          {contactUsList.map(({ name, clickhandler }) => (
            <Flex
              key={name}
              vertical
              onClick={clickhandler}
              style={{ background: "#fff" }}
            >
              <Flex
                style={{
                  padding: name === "Contact Us" ? "18px 12px" : "16px",
                }}
                justify="center"
              >
                <Typography.Paragraph
                  className={
                    name === "Contact Us"
                      ? "contactus-txt"
                      : "contactus-list-txt"
                  }
                >
                  {name}
                </Typography.Paragraph>
              </Flex>
              <Divider style={{ margin: 0 }} />
            </Flex>
          ))}
        </Flex>
        <Flex
          style={{
            padding: "16px",
            background: "#fff",
          }}
          justify="center"
          onClick={() => onClose()}
        >
          <Typography.Paragraph className={"contactus-list-cancel-btn"}>
            {"Cancel"}
          </Typography.Paragraph>
        </Flex>
      </Flex>
    </Drawer>
    </>
  );
};

export default ContactUsDrawer;

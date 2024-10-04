import { message } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import SoundSVG from "src/assets/svg/NoticeBar/SoundSVG";
import { ReactNode } from "react";

const useNoticeBar = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "error";

  const showError = (message: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    messageApi.open({
      className: "error-message",
      key: key,
      type: "error",
      content: message,
      duration: 4,
      icon: <SoundSVG />,
      style: {
        marginTop: "0px",
      },
      onClick: () => {
        messageApi.destroy(key);
      },
    });
  };

  const showSuccess = (message: string | ReactNode) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    messageApi.open({
      key: "success",
      type: "success",
      content: message,
      duration: 4,
      icon: <CheckCircleFilled style={{ fontSize: "18px" }} />,
    });
  };

  return { showError, showSuccess, contextHolder };
};

export default useNoticeBar;

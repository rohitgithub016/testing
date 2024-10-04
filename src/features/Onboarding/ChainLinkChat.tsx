import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetGroupsQuery } from "src/api";
import { selectUserName } from "src/appSlice";
import ChatLinkSvg from "src/assets/svg/Onboarding/ChatLinkSvg";
import OnboardingScreen from "src/Component/OnboardingScreen/OnboardingStep";
import { SELECT_CHAT_LINK_TYPE } from "src/constants/pages";
import useNoticeBar from "src/hooks/useNoticeBar";

const ChainLinkChat = () => {
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const { data: groupsData = [] } = useGetGroupsQuery(userName);
  const { showSuccess, contextHolder } = useNoticeBar();
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    if (groupsData?.length) {
      const group = groupsData[groupsData?.length - 1];
      setGroupId(group?._id);
      showSuccess(
        `You have successfully added the Hubz bot as an Admin to ${group?.groupName}`
      );
    }
  }, [groupsData]);

  const handleClick = () => {
    navigate(`${SELECT_CHAT_LINK_TYPE}?group-id=${groupId}`);
  };

  const stepNumber = 3;
  const stepName = "Chainlink a Chat";
  const stepDescription = "Select your chat type and bring it on-chain.";
  const buttons = [
    { text: "Select Chat Type", clickHandler: handleClick, type: "contained" },
  ];
  return (
    <>
      {contextHolder}
      <OnboardingScreen
        stepNumber={stepNumber}
        stepName={stepName}
        stepDescription={stepDescription}
        buttons={buttons}
        image={<ChatLinkSvg />}
      />
    </>
  );
};

export default ChainLinkChat;

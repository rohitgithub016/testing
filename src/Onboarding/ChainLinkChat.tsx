import ChatLinkSvg from "./ChatLinkSvg";
import OnboardingStep from "./OnboardingStep";

const ChainLinkChat = () => {
  const stepNumber = 3;
  const stepName = "Chainlink a Chat";
  const stepDescription =
    "Select your chat type and bring it on-chain elect your chat type and bring it on-chain elect your chat type and bring it on-chain elect your chat type and bring it on-chain elect your chat type and bring it on-chainelect your chat type and bring it on-chain elect your chat type and bring it on-chain.";
  const buttons = [
    {
      text: "Select Chat Type",
      clickHandler: () => undefined,
      type: "contained",
    },
    {
      text: "Select Chat Type",
      clickHandler: () => undefined,
      type: "outlined",
    },
  ];
  return (
    <>
      <OnboardingStep
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

import { Flex, Typography } from "antd";
import ProgressSteps from "../ProgressStep/ProgressSteps";
import Button from "../Button/Button";
import { ReactElement } from "react";
import "./index.css"

interface OnboardingScreenProps {
  stepNumber: number;
  stepName: string;
  stepDescription: string;
  buttons: { text: string; clickHandler: () => void; type: string }[];
  image: ReactElement;
}

const OnboardingStep = ({
  stepNumber,
  stepName,
  stepDescription,
  buttons,
  image,
}: OnboardingScreenProps) => {
  const stepsCompleted = () => {
    if (stepNumber === 1) {
      return [50, 0, 0];
    } else if (stepNumber === 2) {
      return [100, 50, 0];
    } else if (stepNumber === 3) {
      return [100, 100, 50];
    }
  };
  return (
    <Flex vertical className="onboarding-page">
      <Flex vertical style={{ flexGrow: 1 }} gap={48} className="onboarding-container">
        <Flex className="onboarding-progress-container" justify="space-between" gap={10}>
          <ProgressSteps completedPercentage={stepsCompleted()} />
        </Flex>
        <Flex gap={48} vertical>
          <Flex gap={48} vertical>
            <Flex justify="center" align="center">
              {image}
            </Flex>
            <Flex className="onboarding-txt-container" vertical gap={12}>
              <Typography.Title
                level={1}
                className="txt-center txt-bold onboarding-step-title"
              >
                {stepName}
              </Typography.Title>
              <Typography.Paragraph
                className="txt-center large-para-regular onboarding-step-description"
              >
                <span>
                  Step {stepNumber}:{" "}
                </span>
                {stepDescription}
              </Typography.Paragraph>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        vertical
        justify="center"
        align="center"
        gap={16}
        className="onboarding-btn-container"
        style={{position: 'fixed', bottom: 0, width: '100%'}}
      >
        {buttons?.map(({ clickHandler, text, type }, index) => (
          <div key={index}>
            <Button clickHandler={clickHandler} text={text} type={type} />
          </div>
        ))}
      </Flex>
    </Flex>
  );
};

export default OnboardingStep;

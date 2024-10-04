import { Card, Flex, Typography } from "antd";
import { useState } from "react";
import { GroupSubscriptions } from "src/api";
import Button from "src/Component/Button/Button";

interface ChooseAccessPassPlanProps {
  groupSubscriptions: GroupSubscriptions[];
  handleContinue: (plan: string) => void;
}
const ChooseAccessPassPlan = ({
  groupSubscriptions,
  handleContinue,
}: ChooseAccessPassPlanProps) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const handleSelectPlan = (id: string) => {
    setSelectedPlan(id);
  };

  const groupName =
    (groupSubscriptions.length && groupSubscriptions[0]?.groupName) || "";
  return (
    <>
      <Flex style={{ paddingTop: "30px", height: 'calc(100vh - 130px)', overflow: 'scroll' }} vertical>
        <Flex style={{ padding: "0px 20px" }} gap={24} vertical>
          <Flex vertical gap={12}>
            <Typography.Title
              level={2}
              className="txt-center"
              style={{ lineHeight: "30px", letterSpacing: "-0.1px" }}
            >
              Choose a plan
            </Typography.Title>
            <Flex justify="center" align="center">
              <Flex
                className="group-name-icon-container"
                justify="flex-end"
                align="center"
              >
                <Flex
                  className="group-name-icon"
                  justify="center"
                  align="center"
                >
                  <Typography.Paragraph className="txt">
                    {groupName?.length ? groupName[0] : ""}
                  </Typography.Paragraph>
                </Flex>
              </Flex>
              <Typography.Paragraph className="small-para-regular">
                {groupName}
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex gap={13} vertical>
            {groupSubscriptions
              ?.filter(
                (subscription) => subscription.subscriptionName === "AccessPass"
              )
              ?.map((subscription, index) => (
                <Card
                  style={{ width: "100%",
                    ...(selectedPlan === subscription?.subscriptionId && {
                      border: "1px solid #692DF6",
                    }),
                   }}
                  onClick={() => handleSelectPlan(subscription?.subscriptionId)}
                >
                  <Flex
                    style={{ padding: "20px 36px 20px 20px" }}
                    justify="space-between"
                    align="center"
                  >
                    <Flex gap={8} vertical>
                      <Typography.Paragraph
                        className="large-para-regular"
                        style={{ letterSpacing: "-0.4px" }}
                      >
                        {`AccessPass${index + 1}`}
                      </Typography.Paragraph>
                      <Typography.Title
                        level={3}
                        style={{ letterSpacing: "-0.45px", lineHeight: "25px" }}
                      >
                        {`${subscription?.subscriptionPrice?.amount} ${subscription?.subscriptionPrice?.currency} / ${subscription?.subscriptionPeriod}`}
                      </Typography.Title>
                      <Typography.Paragraph
                        className="large-para-regular"
                        style={{ letterSpacing: "-0.4px", color: "#3C3C4399" }}
                      >
                        {subscription.subscriptionFreeTrialPeriod && (
                          <span>&#x2022; </span>
                        )}

                        {subscription.subscriptionFreeTrialPeriod &&
                          `${subscription.subscriptionFreeTrialPeriod}-Day Free Trial`}
                      </Typography.Paragraph>
                    </Flex>
                    {selectedPlan === subscription?.subscriptionId ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M23 12C23 14.9174 21.8411 17.7153 19.7782 19.7782C17.7153 21.8411 14.9174 23 12 23C9.08262 23 6.28473 21.8411 4.22183 19.7782C2.15893 17.7153 1 14.9174 1 12C1 9.08262 2.15893 6.28473 4.22183 4.22183C6.28473 2.15893 9.08262 1 12 1C14.9174 1 17.7153 2.15893 19.7782 4.22183C21.8411 6.28473 23 9.08262 23 12ZM17.5413 7.83375C17.443 7.73588 17.3261 7.65881 17.1974 7.60717C17.0687 7.55553 16.9309 7.53037 16.7923 7.53319C16.6537 7.53602 16.5171 7.56677 16.3906 7.62361C16.2641 7.68045 16.1504 7.76221 16.0562 7.864L11.2809 13.9484L8.403 11.0691C8.20751 10.887 7.94895 10.7878 7.68178 10.7925C7.41462 10.7972 7.15971 10.9055 6.97077 11.0944C6.78183 11.2833 6.6736 11.5382 6.66888 11.8054C6.66417 12.0726 6.76334 12.3311 6.9455 12.5266L10.5837 16.1662C10.6818 16.2641 10.7985 16.3412 10.9269 16.3929C11.0554 16.4447 11.1929 16.47 11.3314 16.4675C11.4699 16.4649 11.6064 16.4345 11.7328 16.378C11.8593 16.3215 11.9731 16.2401 12.0674 16.1388L17.5564 9.2775C17.7435 9.08294 17.8469 8.82275 17.8443 8.55282C17.8417 8.28288 17.7334 8.02471 17.5426 7.83375H17.5413Z"
                          fill="#692DF6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C9.34783 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34783 22 12Z"
                          stroke="#F7ECFC"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </Flex>
                </Card>
              ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#EFEFF4",
          border: "none",
          zIndex: 1,
        }}
      >
        <Flex style={{ padding: "0px 16px 30px 16px", width: "100%" }}>
          <Button
            clickHandler={() => handleContinue(selectedPlan)}
            text={"Continue"}
            type="contained"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default ChooseAccessPassPlan;

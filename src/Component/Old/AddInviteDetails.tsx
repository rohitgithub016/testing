import { useEffect, useRef, useState } from "react";
import { Flex, Modal, Typography } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "antd";
import ProgressSteps from "../ProgressStep/ProgressSteps";
import Button from "../Button/Button";
import {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from "src/api";
import "./index.css";

const { TextArea } = Input;

const AddInviteDetails = () => {
  const [createSubscription, { data: inviteUrl, isSuccess }] =
    useCreateSubscriptionMutation();
  const [newTag, setNewTags] = useState("");
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([
    "Crypto",
    "Investing",
    "Trading",
    "Blockchain",
    "AI",
    "News",
    "Stocks",
    "Tech",
    "Lifestyle",
    "Fitness",
    "Music",
    // "Gaming",
    // "Movies",
    // "Sports",
    // "Fan Club",
    // "Art",
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const groupId = searchParams.get("groupId");
  const groupName = searchParams.get("groupName");
  const chatType = searchParams.get("chatType");
  const amount = searchParams.get("amount");
  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const tokenAddress = searchParams.get("address");
  const period = searchParams.get("period");
  const freeTrialPeriod = searchParams.get("freetrial-period");
  const tokenType = searchParams.get("token-type");
  const istokenGatedorAccessPass =
    chatType === "tokengated" || chatType === "AccessPass";
  const subscriptionId = searchParams.get("subscription-id");

  const [
    updateSubscription,
    { data: updatedInviteUrl, isSuccess: updateSubscriptionSuccess },
  ] = useUpdateSubscriptionMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(
        `/invite?invite-link=${inviteUrl}&group-name=${groupName}&chat-type=${chatType}`
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateSubscriptionSuccess) {
      navigate(
        `/invite?invite-link=${updatedInviteUrl}&group-name=${groupName}&chat-type=${chatType}`
      );
    }
  }, [updateSubscriptionSuccess]);

  const createChainSyncInviteLink = async () => {
    const description = descriptionRef?.current?.value || "";
    const payload = {
      name: "ChainSync",
      ...(description?.length && { description: description }),
      group: groupId,
      price: {
        amount: 0,
        currency: "TON",
      },
      period: "yearly",
      tags: selectedTags,
    };

    if (subscriptionId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars
      const { group, ...restPayload } = payload;
      updateSubscription({ subscriptionId: subscriptionId, ...restPayload });
    } else {
      createSubscription(payload);
    }
  };

  const createTokenGatedInviteLink = async () => {
    const description = descriptionRef?.current?.value || "";
    let gatedToken = {};
    if (tokenType !== "NFT") {
      gatedToken = {
        amount: Number(amount),
        jettonSymbol: token,
        isTon: token === "TON",
        type: type,
        ...(token !== "TON" && {
          jettonAddress: tokenAddress,
        }),
      };
    } else {
      gatedToken = {
        amount: 1,
        jettonSymbol: token,
        isNft: true,
        isTon: false,
        type: type,
        jettonAddress: tokenAddress,
      };
    }
    const payload = {
      name: "GateKeeper",
      ...(description?.length && { description: description }),
      group: groupId,
      period: "yearly",
      gatedToken: gatedToken,
      tags: selectedTags,
    };
    if (subscriptionId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars
      const { group, ...restPayload } = payload;
      updateSubscription({ subscriptionId: subscriptionId, ...restPayload });
    } else {
      createSubscription(payload);
    }
  };

  const createAccessPassInviteLink = () => {
    const description = descriptionRef?.current?.value || "";
    const payload = {
      name: "AccessPass",
      ...(description?.length && { description: description }),
      group: groupId,
      period: period as string,
      price: { amount: Number(amount) as number, currency: token as string },
      tags: selectedTags,
      ...(freeTrialPeriod && {
        freeTrialPeriod: Number(freeTrialPeriod),
        freeTrial: true,
      }),
    };
    if (subscriptionId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars
      const { group, ...restPayload } = payload;
      updateSubscription({ subscriptionId: subscriptionId, ...restPayload });
    } else {
      createSubscription(payload);
    }
  };

  const handleselectUnselectTags = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags?.length >= 3) {
      return;
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleContinue = () => {
    if (chatType === "chainsync") {
      createChainSyncInviteLink();
    } else if (chatType === "tokengated") {
      createTokenGatedInviteLink();
    } else {
      createAccessPassInviteLink();
    }
  };

  const handleClickAddTagsButton = () => {
    setIsModalOpen(true);
  };

  const addTags = () => {
    if (newTag.length > 30) {
      console.log("Error");
    }
    if (newTag) {
      setTags((prev) => [...prev, newTag]);
      handleselectUnselectTags(newTag);
    }
    setNewTags("");
    setIsModalOpen(false);
  };

  const onboardingCompleted = localStorage.getItem("onboardingCompleted");

  let progressPercentage = [100, 100, istokenGatedorAccessPass ? 80 : 75];

  if (onboardingCompleted === "true") {
    progressPercentage = [100, 50, 0];
  }

  if (chatType === "chainsync") {
    progressPercentage = [50, 0];
  }

  return (
    <>
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
              Add a new tag
            </Typography.Paragraph>
            <Flex vertical gap={10}>
              <TextArea
                className="large-para-regular"
                style={{ padding: "12px 16px" }}
                rows={1}
                placeholder="Add your tags"
                value={newTag}
                maxLength={20}
                onChange={(e) => setNewTags(e?.target?.value)}
              />
            </Flex>
          </Flex>
          <button
            onClick={addTags}
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
              style={{ color: "#fff", width: "100%", letterSpacing: "-0.45" }}
            >
              Submit
            </Typography.Title>
          </button>
        </Flex>
      </Modal>
      <Flex
        gap={32}
        vertical
        justify="space-between"
        style={{ height: "100vh", overflow: "scroll" }}
      >
        <Flex vertical style={{ padding: "0px 16px" }}>
          <Flex vertical gap={32}>
            <Flex style={{ padding: "20px 0px" }} vertical>
              <ProgressSteps completedPercentage={progressPercentage} />
            </Flex>
            <Flex vertical gap={16}>
              <Typography.Title
                level={2}
                className="txt-center title-bold"
                style={{ color: "#101019", lineHeight: "30px" }}
              >
                Add details
              </Typography.Title>
              <Flex gap={4} justify="center" align="center">
                <span
                  style={{
                    fontSize: "10px",
                    borderRadius: "12px",
                    color: "#fff",
                    fontFamily: "scandia-Regular",
                    width: "24px",
                    height: "24px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                      "linear-gradient(180deg, #A0DE7E 0%, #54CB68 100%), linear-gradient(180deg, #FFF 0%, #999 100%)",
                  }}
                >
                  {groupName?.charAt(0).toUpperCase()}
                </span>
                <Typography.Paragraph
                  className="small-para-regular txt-center"
                  style={{ color: "#000" }}
                >
                  {groupName}
                </Typography.Paragraph>
              </Flex>
            </Flex>
            <Flex vertical gap={24}>
              <Flex vertical>
                <Flex style={{ paddingBottom: "8px" }}>
                  <Typography.Paragraph
                    className="small-para-medium"
                    style={{ color: "#525260", lineHeight: "18px" }}
                  >
                    DESCRIPTION
                  </Typography.Paragraph>
                </Flex>
                <textarea
                  className="description-txtarea"
                  rows={4}
                  placeholder="Briefly describe your chat’s purpose and content."
                  maxLength={256}
                  ref={descriptionRef}
                />
              </Flex>
              <Flex vertical>
                <Flex style={{ paddingBottom: "8px" }} vertical>
                  <Typography.Paragraph
                    className="small-para-medium"
                    style={{
                      color: "#525260",
                      lineHeight: "18px",
                      textAlign: "left",
                    }}
                  >
                    #TAGS
                  </Typography.Paragraph>
                </Flex>
                <Flex style={{ paddingBottom: "12px" }}>
                  <Typography.Paragraph
                    className="large-para-regular"
                    style={{
                      color: "#000",
                      lineHeight: "21px",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    Choose up to 3 tags to help people find your chat.
                  </Typography.Paragraph>
                </Flex>
                <Flex gap={13} style={{ flexWrap: "wrap" }}>
                  <div
                    style={{
                      display: "flex",
                      padding: "8px 16px",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: "50px",
                      opacity: 1,
                      background: "rgba(255, 255, 255, 0.65)",
                    }}
                    className="large-para-regular"
                    onClick={handleClickAddTagsButton}
                  >
                    +
                  </div>
                  {tags?.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => {
                        handleselectUnselectTags(tag);
                      }}
                      style={{
                        display: "flex",
                        padding: "8px 16px",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: "50px",
                        opacity: 1,
                        background: "rgba(255, 255, 255, 0.65)",
                        ...(selectedTags?.includes(tag) && {
                          border: "1px solid #692DF6",
                          color: "#692DF6",
                          fontWeight: 500,
                          fontFamily: "Scandia-Medium",
                        }),
                      }}
                      className="large-para-regular"
                    >
                      {tag}
                    </div>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <div style={{ marginBottom: "100px" }}></div>

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
              clickHandler={handleContinue}
              text={onboardingCompleted ? "Complete" : "Complete Onboarding"}
              type="contained"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AddInviteDetails;

import { Card, Flex, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProgressSteps from "../ProgressStep/ProgressSteps";
import Button from "../Button/Button";
import { useTonAddress } from "@tonconnect/ui-react";
import { useGetJetTonsDataQuery, useGetNFTBalanceQuery } from "src/api";
import "./index.css";
import useNoticeBar from "src/hooks/useNoticeBar";
import Page from "../Page/Page";

interface Tokens {
  label: string;
  value: string;
  address?: string;
}
const CreateGateKeeper = () => {
  const [nftCollection, setNFTCollection] = useState<
    { label: string; value: string; address: string }[]
  >([]);
  const [searchParams] = useSearchParams();
  const [tokens, setTokens] = useState<Tokens[]>([]);
  const [selectedToken, setSelectedToken] = useState("TON");
  const walletAddress = useTonAddress(false);
  const [amount, setAmount] = useState<number>(0);
  const navigate = useNavigate();
  const [type, setType] = useState("continuous");
  const [tokenType, setTokenType] = useState("jetton");
  const groupId = searchParams.get("groupId");
  const groupName = searchParams.get("groupName");
  const subscriptionId = searchParams.get("subscription-id");
  const { showError, contextHolder } = useNoticeBar();
  const { data, isSuccess } = useGetJetTonsDataQuery(walletAddress);
  const {
    data: nftBalance = [],
    isSuccess: nftBalanceSuccess,
    isLoading: nftDataLoading,
  } = useGetNFTBalanceQuery(walletAddress, {
    skip: !walletAddress,
  });

  useEffect(() => {
    if (tokenType === "NFT") {
      setSelectedToken(nftCollection[0]?.value);
    } else {
      setSelectedToken("TON");
    }
  }, [tokenType, nftCollection]);

  useEffect(() => {
    if (nftBalanceSuccess && nftBalance?.length) {
      const nftCollectionData = nftBalance.map((nft) => ({
        label: nft?.collectionName,
        value: nft?.collectionName,
        address: nft.collectionAddress,
      }));
      setNFTCollection(nftCollectionData);
    }
  }, [nftBalanceSuccess]);

  useEffect(() => {
    if (isSuccess) {
      const filteredJettonInfo = data
        .filter((jetton) => jetton?.jettonContent?.symbol)
        ?.map((jetton) => ({
          label: jetton?.jettonContent?.symbol,
          value: jetton?.jettonContent?.symbol,
          address: jetton?.address,
        }));

      setTokens([{ label: "TON", value: "TON" }, ...filteredJettonInfo]);
    }
  }, [isSuccess]);

  const handleContinue = () => {
    if (amount !== null && amount > 0) {
      let address = "";
      if (selectedToken !== "TON") {
        const selectedTokenAddress = tokens?.find(
          ({ value }) => value === selectedToken
        )?.address;
        if (selectedTokenAddress) {
          address = selectedTokenAddress;
        }
      }
      navigate(
        `/add-invite-details?groupId=${groupId}&groupName=${groupName}&chatType=tokengated&amount=${amount}&type=${type}&token=${selectedToken}&address=${address}&token-type=${tokenType}${
          subscriptionId ? `&subscription-id=${subscriptionId}` : ""
        }`
      );
    } else if (tokenType === "NFT") {
      if (selectedToken) {
        let address = "";
        const selectedNftAddress = nftCollection?.find(
          (nft) => nft.value === selectedToken
        );
        if (selectedNftAddress) {
          address = selectedNftAddress?.address;
        }
        navigate(
          `/add-invite-details?groupId=${groupId}&groupName=${groupName}&chatType=tokengated&amount=${amount}&type=${type}&token=${selectedToken}&address=${address}&token-type=${tokenType}${
            subscriptionId ? `&subscription-id=${subscriptionId}` : ""
          }`
        );
      } else {
        showError("No NFT Found.");
      }
    } else {
      showError("Subscription amount must be greater than 0");
    }
  };
  const handleChange = (value: string) => {
    setSelectedToken(value);
  };

  const handleTypeChange = (selectedType: string) => {
    setType(selectedType);
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event?.target?.value));
  };

  const handleSelectTokenType = (selectedType: string) => {
    setTokenType(selectedType);
  };

  let dropdownOptions = tokens;

  if (tokenType === "NFT") {
    dropdownOptions = nftCollection;
  }

  const onboardingCompleted = localStorage.getItem("onboardingCompleted");

  let progressPercentage = [100, 100, 75];

  if (onboardingCompleted === "true") {
    progressPercentage = [50, 0, 0];
  }

  return (
    <Page loading={false}>
      <>
        {contextHolder}
        <Flex
          gap={32}
          vertical
          justify="space-between"
          style={{ height: "100vh", overflow: "auto" }}
        >
          <Flex vertical style={{ padding: "0px 16px", marginBottom: "100px" }}>
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
                  Set up the Token-Gate
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
                      TOKEN TYPE
                    </Typography.Paragraph>
                  </Flex>
                  <Flex gap={16} justify="space-between">
                    <Card
                      onClick={() => handleSelectTokenType("jetton")}
                      style={{
                        width: "100%",
                        position: "relative",
                        ...(tokenType === "jetton" && {
                          border: "1px solid #692DF6",
                          borderRadius: "6px",
                        }),
                        padding: "12px 16px",
                      }}
                      bodyStyle={{ padding: "12px 16px" }}
                    >
                      <Typography.Paragraph
                        className="large-para-regular text-center"
                        style={{
                          color: tokenType === "jetton" ? "#692DF6" : "#000",
                          lineHeight: "21px",
                          textAlign: "center",
                        }}
                      >
                        Jetton
                      </Typography.Paragraph>
                      {tokenType === "jetton" && (
                        <div className="corner-badge" />
                      )}
                    </Card>
                    <Card
                      onClick={() => handleSelectTokenType("NFT")}
                      style={{
                        width: "100%",
                        ...(tokenType === "NFT" && {
                          border: "1px solid #692DF6",
                        }),
                        padding: "12px 16px",
                      }}
                      bodyStyle={{ padding: "12px 16px" }}
                    >
                      <Typography.Paragraph
                        className="large-para-regular txt-center"
                        style={{
                          color: tokenType === "NFT" ? "#692DF6" : "#000",
                          lineHeight: "21px",
                        }}
                      >
                        NFT
                      </Typography.Paragraph>
                      {tokenType === "NFT" && <div className="corner-badge" />}
                    </Card>
                  </Flex>
                </Flex>
                <Flex vertical>
                  <Flex style={{ paddingBottom: "8px" }}>
                    <Typography.Paragraph
                      className="small-para-medium"
                      style={{ color: "#525260", lineHeight: "18px" }}
                    >
                      REQUIRED TOKEN
                    </Typography.Paragraph>
                  </Flex>
                  <Flex>
                    <Select
                      style={{ fontFamily: "Scandia-Regular", height: "44px" }}
                      placeholder="Select Token"
                      className="custom-select"
                      onChange={handleChange}
                      options={dropdownOptions}
                      defaultValue={"TON"}
                      value={selectedToken}
                      loading={nftDataLoading}
                    />
                  </Flex>
                </Flex>
                <Flex vertical>
                  <Flex style={{ paddingBottom: "8px" }}>
                    <Typography.Paragraph
                      className="small-para-medium"
                      style={{ color: "#525260", lineHeight: "18px" }}
                    >
                      TOKEN VERIFICATION
                    </Typography.Paragraph>
                  </Flex>
                  <Flex gap={16} justify="space-between">
                    <Card
                      onClick={() => handleTypeChange("continuous")}
                      style={{
                        width: "100%",
                        position: "relative",
                        ...(type === "continuous" && {
                          border: "1px solid #692DF6",
                          borderRadius: "6px",
                        }),
                        padding: "12px 16px",
                      }}
                      bodyStyle={{ padding: "12px 16px" }}
                    >
                      <Typography.Paragraph
                        className="large-para-regular text-center"
                        style={{
                          color: type === "continuous" ? "#692DF6" : "#000",
                          lineHeight: "21px",
                          textAlign: "center",
                        }}
                      >
                        Ongoing
                      </Typography.Paragraph>
                      {type === "continuous" && (
                        <div className="corner-badge" />
                      )}
                    </Card>
                    <Card
                      onClick={() => handleTypeChange("entry")}
                      style={{
                        width: "100%",
                        ...(type === "entry" && {
                          border: "1px solid #692DF6",
                        }),
                        padding: "12px 16px",
                      }}
                      bodyStyle={{ padding: "12px 16px" }}
                    >
                      <Typography.Paragraph
                        className="large-para-regular txt-center"
                        style={{
                          color: type === "entry" ? "#692DF6" : "#000",
                          lineHeight: "21px",
                        }}
                      >
                        One-Time
                      </Typography.Paragraph>
                      {type === "entry" && <div className="corner-badge" />}
                    </Card>
                  </Flex>
                </Flex>
                {tokenType !== "NFT" && (
                  <Flex vertical>
                    <Flex style={{ paddingBottom: "8px" }}>
                      <Typography.Paragraph
                        className="small-para-medium"
                        style={{ color: "#525260", lineHeight: "18px" }}
                      >
                        MINIMUM AMOUNT
                      </Typography.Paragraph>
                    </Flex>
                    <Flex gap={16} vertical>
                      <input
                        type="number"
                        style={{
                          borderRadius: "6px",
                          padding: "12px 12px 12px 16px",
                          outline: "none",
                          color: "#000",
                          border: "none",
                        }}
                        className="large-para-regular"
                        placeholder="Enter amount"
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        onChange={handleAmount}
                      />
                    </Flex>
                  </Flex>
                )}
                <Flex style={{ padding: "0px 10px" }}>
                  <Typography.Paragraph
                    className="small-para-regular"
                    style={{ color: "#3C3C4399" }}
                  >
                    GateKeeper checks a wallet's token balance without needing
                    any transactions or payments.
                  </Typography.Paragraph>
                </Flex>
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
                clickHandler={handleContinue}
                text={"Continue"}
                type="contained"
              />
            </Flex>
          </Flex>
        </Flex>
      </>
    </Page>
  );
};

export default CreateGateKeeper;

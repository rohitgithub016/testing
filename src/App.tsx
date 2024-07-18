import { Card, Flex, Radio, Typography } from "antd";
import "./App.css";
import Chart from "./Chart";
import Exit from "./Exit";
import Network from "./Network";

function App() {
  const steps = [
    {
      step: "Onchain Connectivity",
      description:
        "Hubz leverages non-custodial TON wallets to connect communities onchain.",
      Svg: Network,
    },
    {
      step: "Token-Gated Access",
      description:
        "Offer exclusive token gated access, whitelisting and even airdrops to Telegram chat groups.",
      Svg: Exit,
    },
    {
      step: "Chat Analytics",
      description:
        "Unlock a wealth of onchain statistics about your chat groups.",
      Svg: Chart,
    },
  ];

  return (
    <Flex
      vertical
      justify="space-between"
      style={{
        height: "100vh",
        backgroundColor: "#FFFFFF",
        backgroundImage: "url('hubzcoin.svg')",
        backgroundPosition: "bottom left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex vertical style={{ padding: "48px 32px" }} gap={"32px"}>
        <Flex vertical gap={"12px"}>
          <Typography.Title
            level={4}
            style={{
              fontSize: "24px",
              fontFamily: "Scandia-Medium",
              margin: 0,
            }}
          >
            Take Your Chats Onchain
          </Typography.Title>
          <Typography.Text
            style={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#525260",
            }}
          >
            From Web2 to Web3: revolutionize your chats with Hubz
          </Typography.Text>
        </Flex>
        <Card
          bordered={false}
          styles={{ body: { padding: 0 } }}
          style={{
            borderRadius: "8px",
            // boxShadow: "0px -1px 0px 0px #FFF",
            backgroundColor: "#FFF",
          }}
        >
          {steps.map(({ step, description, Svg }) => (
            <Flex key={step} style={{ paddingLeft: "12px" }}>
              <Flex style={{ padding: "14px 12px 0px 0px" }}>
                <Svg />
              </Flex>
              <Flex
                style={{
                  padding: "2px 12px 4px 0px",
                  borderBottom: "1px solid #EEE",
                }}
              >
                <Flex style={{ padding: "12px 0px" }} gap={"4px"} vertical>
                  <Typography.Title
                    level={5}
                    style={{
                      fontFamily: "Scandia-Medium",
                      margin: 0,
                      lineHeight: "normal",
                    }}
                  >
                    {step}
                  </Typography.Title>
                  <Typography.Text
                    style={{ color: "#999", fontSize: 12, fontWeight: 400 }}
                  >
                    {description}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Card>
        <Card bordered={false}>
          <Radio>
            <Typography.Text>
              I accept the <Typography.Link>Terms of Service.</Typography.Link>
            </Typography.Text>
          </Radio>
        </Card>
      </Flex>

      <Flex
        style={{
          padding: "20px 32px",
          background: "#FFFFFF",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
        justify="center"
        align="center"
      >
        <button
          style={{
            display: "flex",
            padding: " 16px 12px",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            borderRadius: "8px",
            background: "#181827",
            color: "#FFF",
            fontSize: "18px",
            width: "100%",
            fontFamily: "Scandia-Regular",
          }}
        >
          Get Started
        </button>
      </Flex>
    </Flex>
  );
}

export default App;

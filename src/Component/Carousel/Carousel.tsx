import React from "react";
import { Carousel as AntdCarousel, Card, Flex, Typography } from "antd";
import "./index.css";

const Carousel: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <AntdCarousel afterChange={onChange}>
      <Flex>
        <Card
          style={{
            padding: "17px 14px 24px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Flex
            vertical
            style={{
              color: "#3C3C4399",
              fontFamily: "Scandia-Regular",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: " 16px",
            }}
          >
            <Typography.Paragraph>Total Community Balance</Typography.Paragraph>
            <Typography.Title level={1}>$12,318.02</Typography.Title>
          </Flex>
          <Flex align="center" gap={12} style={{ marginTop: "20px" }}>
            <Flex align="center" gap={8}>
              <Flex align="center" gap={5}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M8.19802 16.698C3.67037 16.698 0 13.0277 0 8.50002C0 3.97237 3.67037 0.302002 8.19802 0.302002C12.7257 0.302002 16.396 3.97237 16.396 8.50002C16.396 13.0277 12.7257 16.698 8.19802 16.698Z"
                    fill="#0098EA"
                  />
                  <path
                    d="M10.9977 4.87781C12.0271 4.87781 12.6796 5.9882 12.1617 6.88585L8.70644 12.8747C8.48097 13.2658 7.91592 13.2658 7.69044 12.8747L4.23451 6.88585C3.71733 5.98963 4.36978 4.87781 5.39845 4.87781H10.9977ZM8.70925 11.0788L9.46174 9.62241L11.2774 6.37503C11.3972 6.16718 11.2493 5.90083 10.9984 5.90083H8.70996V11.0795L8.70925 11.0788ZM5.12086 6.37433L6.93585 9.62311L7.68834 11.0788V5.90013H5.39986C5.14903 5.90013 5.00108 6.16648 5.12086 6.37433Z"
                    fill="white"
                  />
                </svg>
                <Typography.Paragraph
                  style={{ color: "#000" }}
                  className="small-para-medium"
                >
                  TON
                </Typography.Paragraph>
              </Flex>
              <Typography.Paragraph className="large-para-regular">
                $2,120.05
              </Typography.Paragraph>
            </Flex>
            <Flex align="center" gap={8}>
              <Flex align="center" gap={5}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M8.59405 16.698C13.1217 16.698 16.7921 13.0277 16.7921 8.50002C16.7921 3.97238 13.1217 0.302002 8.59405 0.302002C4.06641 0.302002 0.396027 3.97238 0.396027 8.50002C0.396027 13.0277 4.06641 16.698 8.59405 16.698Z"
                    fill="#009393"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.60409 9.08599C10.0139 9.08599 11.1922 8.84764 11.4802 8.52914C11.2357 8.25902 10.3513 8.04628 9.22816 7.98807V8.66093C9.02711 8.67138 8.81806 8.6765 8.60389 8.6765C8.38971 8.6765 8.18066 8.67138 7.9792 8.66093V7.98807C6.85648 8.04628 5.97171 8.25902 5.7272 8.52914C6.01557 8.84764 7.19403 9.08599 8.60389 9.08599H8.60409ZM11.109 5.91889V6.84547H9.22816V7.48799C10.5493 7.55665 11.5406 7.83907 11.548 8.17704V8.88166C11.5406 9.21962 10.5493 9.50143 9.22816 9.57029V11.1472H7.9794V9.57029C6.65829 9.50163 5.66735 9.21962 5.65998 8.88166V8.17704C5.66735 7.83907 6.65829 7.55665 7.9794 7.48799V6.84547H6.09857V5.91889H11.1092H11.109ZM5.3589 4.44427H11.9616C12.1194 4.44427 12.2647 4.52728 12.3434 4.66214L14.2669 7.96512C14.3665 8.13646 14.337 8.35268 14.1947 8.49143L8.90004 13.6599C8.72829 13.8273 8.45243 13.8273 8.28109 13.6599L2.99295 8.4984C2.84764 8.35617 2.82018 8.13379 2.92737 7.96164L4.98364 4.65189C5.06377 4.52318 5.20601 4.44448 5.35911 4.44448L5.3589 4.44427Z"
                    fill="white"
                  />
                </svg>
                <Typography.Paragraph
                  style={{ color: "#000" }}
                  className="small-para-medium"
                >
                  USDT
                </Typography.Paragraph>
              </Flex>
              <Typography.Paragraph className="large-para-regular">
                $820.72
              </Typography.Paragraph>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Flex>
        <Card
          style={{
            padding: "17px 14px 24px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Flex
            vertical
            style={{
              color: "#3C3C4399",
              fontFamily: "Scandia-Regular",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: " 16px",
            }}
          >
            <Typography.Paragraph>My Earnings</Typography.Paragraph>
            <Typography.Title level={1}>$3,029.81</Typography.Title>
          </Flex>
          <Flex align="center" gap={12} style={{ marginTop: "20px" }}>
            <Flex align="center" gap={8}>
              <Flex align="center" gap={5}>
                <Typography.Paragraph
                  style={{ color: "#000" }}
                  className="small-para-medium"
                >
                  Monthly Average
                </Typography.Paragraph>
              </Flex>
              <Typography.Paragraph className="large-para-regular">
                $120.50
              </Typography.Paragraph>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Flex>
        <Card
          style={{
            padding: "17px 14px 24px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Flex
            vertical
            style={{
              color: "#3C3C4399",
              fontFamily: "Scandia-Regular",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: " 16px",
            }}
          >
            <Typography.Paragraph>
              Community Swap Activities
            </Typography.Paragraph>
            <Typography.Title level={1}>67%</Typography.Title>
          </Flex>
          <Flex align="center" gap={12} style={{ marginTop: "20px" }}>
            <Flex align="center" gap={8}>
              <Flex align="center" gap={5}>
                <Typography.Paragraph
                  style={{ color: "#000" }}
                  className="small-para-medium"
                >
                  Last 7 Days
                </Typography.Paragraph>
              </Flex>
              <Typography.Paragraph className="large-para-regular">
                32,968 Swaps
              </Typography.Paragraph>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </AntdCarousel>
  );
};

export default Carousel;

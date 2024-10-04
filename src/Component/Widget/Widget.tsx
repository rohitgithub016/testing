import { Flex, Tooltip, Typography } from "antd";
import "./index.css";
import React, { ReactElement } from "react";

interface WidgetProps {
  title: string;
  children?: React.ReactElement;
  clickHandler?: () => void;
  button?: ReactElement;
  text?: string;
  tooltipText?: string;
}

const Widget = ({
  title,
  children,
  clickHandler,
  button = undefined,
  text = "",
  tooltipText = "",
}: WidgetProps) => {
  return (
    <Flex className="widget-container" vertical>
      <Flex className="header" justify="space-between">
        <Flex vertical>
          <Flex gap={8} align="center">
            <Typography.Paragraph
              className={
                title === "Transactions"
                  ? "large-para-medium"
                  : "small-para-medium"
              }
              style={{ color: "#525260" }}
            >
              {title}
            </Typography.Paragraph>{" "}
            {tooltipText && (
              <Tooltip placement="topLeft" title={tooltipText}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_15506_2891)">
                    <circle
                      cx="9.99999"
                      cy="9.99984"
                      r="8.33333"
                      stroke="#3C3C43"
                      stroke-opacity="0.6"
                      stroke-width="1.5"
                    />
                    <path
                      d="M10 14.1665V9.1665"
                      stroke="#3C3C43"
                      stroke-opacity="0.6"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <ellipse
                      cx="0.833333"
                      cy="0.833333"
                      rx="0.833333"
                      ry="0.833333"
                      transform="matrix(1 0 0 -1 9.16666 7.5)"
                      fill="#3C3C43"
                      fill-opacity="0.6"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_15506_2891">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Tooltip>
            )}
          </Flex>
        </Flex>
        {button ? (
          button
        ) : (
          <Flex onClick={clickHandler}>
            {clickHandler && (
              <Typography.Paragraph className="small-para-medium action-button">
                See all
              </Typography.Paragraph>
            )}
          </Flex>
        )}
        {text && (
          <Typography.Paragraph
            className="small-para-regular"
            style={{ opacity: "50%" }}
          >
            {text}
          </Typography.Paragraph>
        )}
      </Flex>
      {children}
    </Flex>
  );
};

export default Widget;

import { Flex, Typography } from "antd";

const NoData = ({ text }: { text: string }) => {
  return (
    <Flex
      gap={8}
      justify="center"
      style={{ width: "100%", padding: "15px 0px" }}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_17174_40324)">
          <circle
            cx="9.10433"
            cy="9.10415"
            r="7.52083"
            stroke="#8E8E93"
            stroke-width="1.5"
          />
          <path
            d="M7.125 9.10417H9.10417M9.10417 9.10417H11.0833M9.10417 9.10417V11.0833M9.10417 9.10417V7.125"
            stroke="#8E8E93"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M15.8335 15.8333L17.4168 17.4166"
            stroke="#8E8E93"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_17174_40324">
            <rect width="19" height="19" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <Typography.Paragraph className="large-para-regular">
        {text}
      </Typography.Paragraph>
    </Flex>
  );
};

export default NoData;

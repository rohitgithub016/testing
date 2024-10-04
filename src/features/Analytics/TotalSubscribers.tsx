import { Card, Flex, Typography } from "antd";
import "./index.css";
import UsersSVG from "src/assets/svg/Analytics/UsersSVG";

const TotalSubscribers = ({
  totalSubscribers,
}: {
  totalSubscribers: number;
}) => {
  return (
    <Card className="analytics-total-connected-user">
      <Flex vertical gap={12}>
        <Typography.Paragraph
          className="small-para-regular"
          style={{ color: "#181827" }}
        >
          Total Connected Users
        </Typography.Paragraph>
        <Flex gap={10}>
          <UsersSVG />
          <Typography.Title level={2} className="txt-bold txt">
            {totalSubscribers?.toLocaleString()}
          </Typography.Title>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TotalSubscribers;

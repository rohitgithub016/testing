import { Card, Flex, Typography } from "antd";

const Earnings = ({
  totalEarnings,
  monthlyAverageEarnings,
}: {
  totalEarnings: string;
  monthlyAverageEarnings: string;
}) => {
  return (
    <Card style={{ padding: 16 }}>
      <Flex gap={8} vertical>
        <Flex gap={8} vertical>
          <Typography.Paragraph className="tags-regular">
            Total Earnings
          </Typography.Paragraph>
          <Typography.Paragraph className="access-pass-total-earnings">
            {totalEarnings}
          </Typography.Paragraph>
        </Flex>
        <Flex gap={8}>
          <Typography.Paragraph className="small-para-regular">
            Monthly average
          </Typography.Paragraph>
          <Typography.Paragraph className="small-para-regular">
            {" "}
            {monthlyAverageEarnings}
          </Typography.Paragraph>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Earnings;

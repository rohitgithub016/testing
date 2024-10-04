import { Card, Empty, Flex, Typography } from "antd";
import { useGetAnalyticsChartDataQuery } from "src/api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface AnalyticsChart {
  groupId: string;
}
const AnalyticsChart = ({ groupId }: AnalyticsChart) => {
  const {
    data: analyticsData = {
      totalClicks: 0,
      walletConnected: 0,
      totalPayments: 0,
      active: 0,
    },
  } = useGetAnalyticsChartDataQuery(groupId, {
    skip: !groupId,
    refetchOnMountOrArgChange: true
  });

  const data = {
    totalClicks: analyticsData.totalClicks || 0,
    walletConnected: analyticsData.walletConnected || 0,
    totalPayments: analyticsData.totalPayments || 0,
    active: analyticsData.active || 0,
  };

  const barchartData: Highcharts.Options = {
    chart: {
      type: "column",
      renderTo: "bar-chart-container",
      height: "300",
      spacing: [10, 0, 0, 0],
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      lineColor: "transparent",
      gridLineWidth: 0,
      categories: ["Clicks", "Wallet Connects", "Payment", "Active"],
      labels: {
        useHTML: true,
        formatter: function () {
          const index = this.pos;
          const yValue = Object.values(data)[index];
          return `<div style="text-align: center;margin-bottom:${this.value==="Wallet Connects" ? "6px": "17px"};">${this.value}</div> <div style="text-align: center; font-size: 14px">${yValue}</div>`;
        },
        rotation: 0,
        style: {
          fontFamily: "Scandia-Medium",
          fontSize: "10px",
          color: "#181827",
          fontWeight: "500",
        },
        staggerLines: 1
      },
    },
    yAxis: {
      gridLineWidth: 0,
      endOnTick: true,
      title: {
        text: "",
      },
      labels: {
        style: {
          fontFamily: "Scandia-Regular",
          fontSize: "10px",
          color: "#3C3C4399",
          fontWeight: "400",
        },
      },
    },
    legend: {
      enabled: false,
    },
    colors: ["#3B63F6", "#692DF6", "#27B5FE", "#54CB68"],
    series: [
      {
        type: "column",
        name: "",
        data: Object.values(data),
        colorByPoint: true,
        dataLabels: {
          style: {
            fontFamily: "Scandia-Regular",
          },
        },
      },
    ],
  };

  const dataPresent = Object.values(data).every(value => value === 0);

  return (
    <Card className={"analytics-chart"}>
      <Flex vertical gap={24}>
        <Typography.Paragraph
          className="small-para-regular"
          style={{ color: "#181827" }}
        >
          Chain-Linked Chats
        </Typography.Paragraph>
        {!dataPresent ? (
          <HighchartsReact highcharts={Highcharts} options={barchartData} />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Flex>
    </Card>
  );
};

export default AnalyticsChart;

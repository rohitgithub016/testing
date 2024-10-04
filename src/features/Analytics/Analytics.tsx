import { Flex, Typography } from "antd";
import "./index.css";
import GroupSelector from "./GroupSelector";
import { useState } from "react";
import { Option } from "src/Component/Select/type";
import { useGetAnalyticsChartDataQuery, useGetGroupsQuery } from "src/api";
import { useSelector } from "react-redux";
import { selectUserName } from "src/appSlice";
import TotalSubscribers from "./TotalSubscribers";
import AnalyticsChart from "./AnalyticsChart";
import Button from "src/Component/Button/Button";

const Analytics = () => {
  const userName = useSelector(selectUserName);
  const { data: groupsData = [] } = useGetGroupsQuery(userName, {refetchOnMountOrArgChange: true});

  const groups = groupsData?.map(({ _id, groupName, totalSubscribers }) => ({
    label: groupName,
    value: _id,
    totalSubscribers: totalSubscribers,
  }));

  const [selectedGroup, setSelectedGroup] = useState(groups[0]);

  const {
    data: analyticsData = {
      totalClicks: 0,
      walletConnected: 0,
      totalPayments: 0,
      active: 0,
      totalJoined: 0
    },
  } = useGetAnalyticsChartDataQuery(selectedGroup?.value, {
    skip: !selectedGroup?.value,
    refetchOnMountOrArgChange: true
  });

  const handleSelectGroup = (group: Option) => {
    setSelectedGroup({...group, totalSubscribers: group?.totalSubscribers || 0});
  };

  function redirectToDashboard() {
    window.open("https://dashboard-app-dev.hubz.io/", "_blank");
  }


  return (
    <Flex vertical className="analytics-container" gap={24}>
      <Flex vertical gap={27}>
        <Typography.Title level={3} style={{ lineHeight: "25px" }}>
          Analytics
        </Typography.Title>
        <GroupSelector
          selectedOption={selectedGroup}
          handleSelectedOption={handleSelectGroup}
          options={groups}
        />
        <TotalSubscribers totalSubscribers={analyticsData?.totalJoined} />
      </Flex>
      <AnalyticsChart groupId={selectedGroup?.value}/>
      <Button text="View Detailed Analytics" clickHandler={redirectToDashboard}/>
    </Flex>
  );
};

export default Analytics;

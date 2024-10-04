import { Flex, Typography } from "antd";
import AnalyticsSVG from "src/assets/svg/Dashboard/AnalyticsSVG";
import HomeSVG from "src/assets/svg/Dashboard/HomeSVG";
import "./index.css";
import { ANALYTICS_MENU, HOME_MENU } from "src/constants/dashboard";

interface DashboardBottomMenuProps {
  selectedMenu: string;
  handleChangeMenu: (menuName: string) => void;
}

const DashboardBottomMenu = ({
  selectedMenu,
  handleChangeMenu,
}: DashboardBottomMenuProps) => {
  return (
    <Flex className="dashboard-bottom-navbar">
      <Flex
        vertical
        align="center"
        gap={4}
        onClick={() => handleChangeMenu(HOME_MENU)}
      >
        <HomeSVG color={selectedMenu === HOME_MENU ? "#692DF6" : "#1C1C1C"} />
        <Typography.Paragraph
          className={`small-para-regular  ${
            selectedMenu === HOME_MENU && "selected-menu"
          }`}
        >
          Home
        </Typography.Paragraph>
      </Flex>
      <Flex
        vertical
        align="center"
        gap={4}
        onClick={() => handleChangeMenu(ANALYTICS_MENU)}
      >
        <AnalyticsSVG
          color={selectedMenu === ANALYTICS_MENU ? "#692DF6" : "#1C1C1C"}
        />
        <Typography.Paragraph
          className={`small-para-regular ${
            selectedMenu === ANALYTICS_MENU && "selected-menu"
          }`}
        >
          Analytics
        </Typography.Paragraph>
      </Flex>
    </Flex>
  );
};

export default DashboardBottomMenu;

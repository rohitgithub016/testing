import { useEffect, useState } from "react";
import Analytics from "../Analytics/Analytics";
import DashboardDrawers from "./DashboardDrawers/DashboardDrawers";
import HomePage from "./HomePage/HomePage";
import DashboardBottomMenu from "./DashboardBottomMenu/DashboardBottomMenu";
import { ANALYTICS_MENU, HOME_MENU } from "src/constants/dashboard";
import { useNavigate } from "react-router-dom";
import { CHAINLINKED_CHAT_PAGE } from "src/constants/pages";
import WebApp from "@twa-dev/sdk";

const Dashboard = () => {
  const [openContactUsDrawer, setOpenContactUsDrawer] = useState(false);
  const [selectedMenu, setMenu] = useState(HOME_MENU);
  const navigate = useNavigate();

  const handleCloseContactUsDrawer = () => {
    setOpenContactUsDrawer(false);
  };

  const handleOpenContactUsDrawer = () => {
    setOpenContactUsDrawer(true);
  };

  const handleSeeAllChainLinkedChats = () => {
    navigate(CHAINLINKED_CHAT_PAGE);
  };

  const handleChangeMenu = (menu: string) => {
    setMenu(menu);
  };

  useEffect(() => {
    WebApp.BackButton.hide();
    WebApp.BackButton.isVisible = false;

    return () => {
      WebApp.BackButton.show();
      WebApp.BackButton.isVisible = true;
    };
  }, []);

  return (
    <>
      <div
        style={{
          ...(selectedMenu === HOME_MENU && {
            height: "100vh",
            overflow: "auto",
          }),
        }}
      >
        <DashboardDrawers
          openContactUsDrawer={openContactUsDrawer}
          handleCloseContactUsDrawer={handleCloseContactUsDrawer}
        />
        {selectedMenu === HOME_MENU && (
          <HomePage
            handleSeeAllChainLinkedChats={handleSeeAllChainLinkedChats}
            handleOpenContactUsDrawer={handleOpenContactUsDrawer}
          />
        )}
      </div>
      {selectedMenu === ANALYTICS_MENU && <Analytics />}
      <DashboardBottomMenu
        selectedMenu={selectedMenu}
        handleChangeMenu={handleChangeMenu}
      />
    </>
  );
};

export default Dashboard;

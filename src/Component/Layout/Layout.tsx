import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useGetTonUsdtRatesQuery } from "src/api";
import { selectUserName, setTokenPriceInUSD, setUserName } from "src/appSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const { data: tokenPriceInUSDApi, isSuccess } = useGetTonUsdtRatesQuery(
    undefined,
    { pollingInterval: 300000 }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setTokenPriceInUSD({
          TON: tokenPriceInUSDApi.rates.TON.prices.USD,
          USDT: tokenPriceInUSDApi.rates.USDT.prices.USD,
        })
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    WebApp.BackButton.isVisible = true;
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => {
      history.back();
    });
    dispatch(
      setUserName(
        (WebApp?.initDataUnsafe?.user?.username as string || "rohitbhandari016")
      )
    );
  }, []);
  return <>{userName && <Outlet />}</>;
};

export default Layout;

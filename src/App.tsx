import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ACCEPTED_TERMS,
  ONBOARDING_COMPLETED,
} from "src/constants/localStorage";
import { DASHBOARD, INTRODUCTION, ONBOARDING } from "src/constants/pages";
import eruda from "eruda";
import { useDispatch } from "react-redux";
import { setUserName } from "./appSlice";

eruda?.init();

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(WebApp.initData);
    dispatch(setUserName(WebApp?.initDataUnsafe?.user?.username as string));
  }, []);
  useEffect(() => {
    const acceptedTerms = localStorage?.getItem(ACCEPTED_TERMS);
    const onboardingCompleted = localStorage?.getItem(ONBOARDING_COMPLETED);

    if (onboardingCompleted === "true") {
      navigate(DASHBOARD);
    } else if (acceptedTerms === "true") {
      navigate(ONBOARDING);
    } else {
      navigate(INTRODUCTION);
    }
  }, []);

  return <></>;
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import {
  INTRODUCTION,
  ONBOARDING,
  DASHBOARD,
  CONNECT_WALLET,
  ENABLE_HUBZ_BOT,
  CHAINLINK_CHAT,
  SELECT_CHAT_LINK_TYPE,
  ADD_INVITE_DETAILS,
  INVITE,
  CREATE_GATE_KEEPER,
  ANALYTICS,
  CHATLINKED_CHAT_DETAILS,
  ACCESS_PASS,
  TRANSACTION_PAGE,
  CHAINLINKED_CHAT_PAGE,
  PAYMENT,
  CHANGE_CHAT_TYPE,
  SAME_USER_WARNING,
  PAYMENT_SUCCESS,
} from "src/constants/pages";
import {
  AccessPass,
  AddInviteDetails,
  Analytics,
  ChainLinkChat,
  ChainLinkedChatPage,
  ChatLinkedChatDetails,
  ConnectWallet,
  CreateGateKeeper,
  Dashboard,
  EnableHubzBot,
  IntroductionPage,
  Invite,
  OnboardingSteps,
  Payment,
  SelectChatType,
  TransactionPage,
} from "./import";
import WebApp from "@twa-dev/sdk";
import Layout from "src/Component/Layout/Layout";
import ChangeChatType from "src/features/ChangeChatType/ChangeChatType";
import SameUserWarning from "src/Component/SmaeUserWarning/SameUserWarning";
import PaymentSuccess from "src/Component/PaymentSuccess/PaymentSuccess";

WebApp?.setBackgroundColor("#EFEFF4");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: INTRODUCTION,
        element: <IntroductionPage />,
      },
      {
        path: ONBOARDING,
        element: <OnboardingSteps />,
      },
      {
        path: CONNECT_WALLET,
        element: <ConnectWallet />,
      },
      {
        path: ENABLE_HUBZ_BOT,
        element: <EnableHubzBot />,
      },
      {
        path: CHAINLINK_CHAT,
        element: <ChainLinkChat />,
      },
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: SELECT_CHAT_LINK_TYPE,
        element: <SelectChatType />,
      },
      {
        path: ADD_INVITE_DETAILS,
        element: <AddInviteDetails />,
      },
      {
        path: INVITE,
        element: <Invite />,
      },
      { path: CREATE_GATE_KEEPER, element: <CreateGateKeeper /> },
      { path: ANALYTICS, element: <Analytics /> },
      { path: CHATLINKED_CHAT_DETAILS, element: <ChatLinkedChatDetails /> },
      { path: ACCESS_PASS, element: <AccessPass /> },
      { path: TRANSACTION_PAGE, element: <TransactionPage /> },
      { path: CHAINLINKED_CHAT_PAGE, element: <ChainLinkedChatPage /> },
      { path: PAYMENT, element: <Payment /> },
      { path: CHANGE_CHAT_TYPE, element: <ChangeChatType /> },
      { path: SAME_USER_WARNING, element: <SameUserWarning /> },
      { path: PAYMENT_SUCCESS, element: <PaymentSuccess /> },
    ],
  },
]);

export default router;

import React from "react";

export const IntroductionPage = React.lazy(
  () => import("src/features/Onboarding/IntroductionPage/IntroductionPage")
);
export const OnboardingSteps = React.lazy(
  () => import("src/features/Onboarding/OnboardingSteps")
);
export const Dashboard = React.lazy(
  () => import("src/features/Dashboard/Dashboard")
);
export const ConnectWallet = React.lazy(
  () => import("src/features/Onboarding/ConnectWallet")
);
export const EnableHubzBot = React.lazy(
  () => import("src/features/Onboarding/EnableHubzBot")
);
export const ChainLinkChat = React.lazy(
  () => import("src/features/Onboarding/ChainLinkChat")
);
export const SelectChatType = React.lazy(
  () => import("src/Component/Old/SelectChatType")
);
export const AddInviteDetails = React.lazy(
  () => import("src/Component/Old/AddInviteDetails")
);
export const Invite = React.lazy(() => import("src/Component/Old/Invite"));
export const CreateGateKeeper = React.lazy(
  () => import("src/Component/Old/CreateGateKeeper")
);
export const Analytics = React.lazy(
  () => import("src/features/Analytics/Analytics")
);
export const ChatLinkedChatDetails = React.lazy(
  () => import("src/features/ChatLinkedChatDetails/ChatLinkedChatDetails")
);
export const AccessPass = React.lazy(
  () => import("src/features/AccessPass/AccessPass")
);

export const TransactionPage = React.lazy(
  () => import("src/features/Dashboard/TransactionsPage/TransactionPage")
);
export const ChainLinkedChatPage = React.lazy(
  () => import("src/features/ChainLinkedChatsPage/ChainLinkedChatPage")
);

export const Payment = React.lazy(
  () => import("src/features/SubscriberFlow/Payment")
);

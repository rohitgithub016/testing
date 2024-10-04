import { SubscriptionDetails } from "src/api";

const getChatType = (subscriptionDetails: SubscriptionDetails) => {
  const amount = subscriptionDetails?.price?.amount;
  if (amount > 0) {
    return "AccessPass";
  } else if (amount === 0) {
    return "ChainSync";
  } else if (subscriptionDetails?.gatedToken) {
    return "GateKeeper";
  }
};

export default getChatType;

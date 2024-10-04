import { SubscriptionDetails } from "src/api";
import getChatType from "./getChatType";

const getAmountDetails = (subscriptionDetails: SubscriptionDetails) => {
  const chatType = getChatType(subscriptionDetails);

  if (chatType === "AccessPass") {
    const amount = subscriptionDetails?.price?.amount;
    const currency = subscriptionDetails?.price?.currency;
    const period = subscriptionDetails?.period;
    return `${chatType}: ${amount} ${currency} / ${period}`;
  } else if (chatType === "GateKeeper") {
    const amount = subscriptionDetails?.gatedToken?.amount;
    const token = subscriptionDetails?.gatedToken?.jettonSymbol;
    return `${chatType}: ${amount} ${token}`;
  }
};

export default getAmountDetails;

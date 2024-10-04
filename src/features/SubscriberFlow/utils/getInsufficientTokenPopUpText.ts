import { SubscriptionDetails } from "src/api";

const getInsufficientTokenPopUpText = (subscriptionDetails: SubscriptionDetails) => {
   const tokenType = subscriptionDetails?.gatedToken?.isNft ? "NFT" : "";
   const requierdAmount = subscriptionDetails?.gatedToken?.amount;
   const requredToken = subscriptionDetails?.gatedToken?.jettonSymbol;
  if (tokenType !== "NFT") {
    return `Hold at least ${requierdAmount} ${requredToken} to join. Top up your balance now.`;
  } else {
    return `Own the required NFT to join. Get yours now.`;
  }
};

export default getInsufficientTokenPopUpText;

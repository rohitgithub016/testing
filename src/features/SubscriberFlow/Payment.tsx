import "./index.css";
import ConnectSubscriberWallet from "./ConnectSubscriberWallet";
import Page from "src/Component/Page/Page";
import { useTonAddress } from "@tonconnect/ui-react";
import {
  GroupSubscriptions,
  useGetGroupSubscriptionsQuery,
  useGetJetTonsDataQuery,
  useGetNFTBalanceQuery,
  useGetSubscriptionDetailsQuery,
  useGetTonBalanceQuery,
  usePaymentSuccessMutation,
  useSubscriberInitiateMutation,
  useUpdateSubscriberAddressMutation,
} from "src/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getChatType from "src/utils/getChatType";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setUserName } from "src/appSlice";
import WebApp from "@twa-dev/sdk";
import JettonTokenPopUp from "./JettonTokenPopUp";
import AccessPassPayment from "./AccessPassPayment";
import ChooseAccessPassPlan from "./ChooseAccessPassPlan";
import getInsufficientTokenPopUpText from "./utils/getInsufficientTokenPopUpText";
import { SAME_USER_WARNING } from "src/constants/pages";

const Payment = () => {
  const [jettonPopUp, setJettonPopUp] = useState(false);
  const [searchParams] = useSearchParams();
  let subscriptionId = searchParams?.get("subscription");
  const userName = useSelector(selectUserName);
  const walletAddress = useTonAddress(false);
  const dispatch = useDispatch();
  const [freeTrialConsumed, setFreeTrialConsumed] = useState(false);
  const groupId = searchParams?.get("group");
  const [selectedPlan, setSelectedPlan] = useState("");
  const navigate = useNavigate();

  const [
    inititateSubscriber,
    {
      isSuccess: inititateSubscriberSuccess,
      isError: inititateSubscriberError,
    },
  ] = useSubscriberInitiateMutation();

  if (inititateSubscriberSuccess || inititateSubscriberError) {
    subscriptionId = searchParams?.get("subscription") || selectedPlan;
  }

  const { data: groupsSubscriptions, isLoading: isGroupSubscriptionLoading } =
    useGetGroupSubscriptionsQuery(groupId as string, { skip: !groupId });

  const { data: nftBalance = [], isSuccess: nftBalanceSuccess } =
    useGetNFTBalanceQuery(walletAddress, {
      skip: !walletAddress,
    });

  const { data: subscriptionDetails = [], isLoading = true } =
    useGetSubscriptionDetailsQuery(subscriptionId as string, {
      skip: !subscriptionId,
    });

  const { data: jettonData = [], isSuccess: jettonHoldingSucces } =
    useGetJetTonsDataQuery(walletAddress, {
      skip: !walletAddress,
    });

  const { data: tonBalance, isSuccess: tonBalanceSuccess } =
    useGetTonBalanceQuery(walletAddress, {
      skip: !walletAddress,
    });

  const [getInviteUrlApi, { isSuccess: inviteLinkSuccess, data: inviteLink }] =
    usePaymentSuccessMutation();

  const [
    updateWalletAddress,
    { data: subscriberDetails, isSuccess: subscriberDetailsSuccess },
  ] = useUpdateSubscriberAddressMutation();

  const getInviteUrl = () => {
    getInviteUrlApi({
      subscriptionId: subscriptionId as string,
      username: userName,
    });
  };

  useEffect(() => {
    WebApp.BackButton.isVisible = false;
    WebApp.BackButton.hide();
  }, []);

  useEffect(() => {
    if (subscriberDetailsSuccess && subscriberDetails) {
      setFreeTrialConsumed(subscriberDetails?.freeTrialConsumed);
    }
  }, [subscriberDetailsSuccess]);

  useEffect(() => {
    if (walletAddress && userName && subscriptionId) {
      updateWalletAddress({
        subscriptionId: subscriptionId as string,
        username: userName,
        walletAddress: walletAddress,
      });
    }
  }, [walletAddress, userName, subscriptionId]);

  useEffect(() => {
    dispatch(
      setUserName(
        (WebApp?.initDataUnsafe?.user?.username as string || 'rohitbhandari016')
      )
    );
  }, []);

  useEffect(() => {
    if (inviteLinkSuccess) {
      if (WebApp?.platform === "android") {
        window?.open(inviteLink, "_self");
        WebApp?.close();
      } else {
        WebApp.openTelegramLink(inviteLink);
        WebApp?.close();
      }
    }
  }, [inviteLinkSuccess]);

  useEffect(() => {
    if (subscriptionDetails?.length && walletAddress) {
      if (subscriptionDetails[0]?.creatorDetails.username === userName) {
        navigate(SAME_USER_WARNING);
      }
      const chatType = getChatType(subscriptionDetails[0]);
      let tokenType = "";
      if (chatType === "GateKeeper") {
        tokenType = subscriptionDetails[0]?.gatedToken?.isNft ? "NFT" : "";
      }
      if (chatType === "ChainSync") {
        getInviteUrl();
      }
      if (
        chatType === "GateKeeper" &&
        tokenType !== "NFT" &&
        tonBalanceSuccess &&
        jettonHoldingSucces
      ) {
        const tonToken = subscriptionDetails[0]?.gatedToken?.isTon;
        const tokenRequired = Number(
          subscriptionDetails[0]?.gatedToken?.amount
        );
        if (tonToken) {
          const subscriberTonBalance = Number(tonBalance) / Math.pow(10, 9);
          if (subscriberTonBalance >= tokenRequired) {
            getInviteUrl();
          } else {
            setJettonPopUp(true);
          }
        } else {
          const requiredToken = jettonData.find(
            (item) =>
              item.address === subscriptionDetails[0]?.gatedToken?.jettonAddress
          );
          if (requiredToken) {
            const requiredTokenAddress = requiredToken.address;
            const balance = Number(requiredToken.balance) / Math.pow(10, 9);
            if (
              requiredTokenAddress ===
                subscriptionDetails[0]?.gatedToken?.jettonAddress &&
              balance >= tokenRequired
            ) {
              getInviteUrl();
            } else {
              setJettonPopUp(true);
            }
          } else {
            setJettonPopUp(true);
          }
        }
      } else if (
        chatType === "GateKeeper" &&
        tokenType === "NFT" &&
        nftBalanceSuccess
      ) {
        const requiredNftAddress =
          subscriptionDetails[0]?.gatedToken?.jettonAddress;
        const isUserHoldingRequiredNFT = nftBalance.find(
          (nft) => nft.collectionAddress === requiredNftAddress
        );
        if (isUserHoldingRequiredNFT) {
          getInviteUrl();
        } else {
          setJettonPopUp(true);
        }
      }
    }
  }, [
    walletAddress,
    subscriptionDetails,
    tonBalanceSuccess,
    jettonHoldingSucces,
    nftBalanceSuccess,
  ]);

  const chainSyncWalletConnected =
    getChatType(subscriptionDetails[0]) === "ChainSync" && !!walletAddress;

  const gateKeeperWalletConnected =
    getChatType(subscriptionDetails[0]) === "GateKeeper" &&
    !!walletAddress &&
    !jettonPopUp;

  const handleClosejettonPopUp = () => {
    WebApp?.close();
  };

  const gateKeeperOrChainSync =
    getChatType(subscriptionDetails[0]) === "ChainSync" ||
    getChatType(subscriptionDetails[0]) === "GateKeeper";

  const handleContinue = (id: string) => {
    inititateSubscriber({
      subscription: id,
      username: userName,
      chatId: WebApp?.initDataUnsafe?.user?.id.toString() as string,
    });
    setSelectedPlan(id);
  };

  const subscriberTonBalance = (tonBalance || 0) / 10e8;
  const subscriberUSDTbalance =
    Number(
      jettonData.find(
        ({ address }) =>
          address ===
          "0:B113A994B5024A16719F69139328EB759596C38A25F59028B146FECDC3621DFE"
      )?.balance || 0
    ) / 10e5;
  return (
    <Page
      loading={
        isLoading ||
        chainSyncWalletConnected ||
        gateKeeperWalletConnected ||
        isGroupSubscriptionLoading
      }
    >
      <>
        {subscriptionDetails?.length ? (
          <>
            <JettonTokenPopUp
              isModalOpen={jettonPopUp}
              handleModal={handleClosejettonPopUp}
              groupName={subscriptionDetails[0]?.group?.name}
              popUpText={getInsufficientTokenPopUpText(subscriptionDetails[0])}
              isNFT={!!subscriptionDetails[0]?.gatedToken?.isNft}
            />
            {!walletAddress || gateKeeperOrChainSync ? (
              <ConnectSubscriberWallet
                subscriptionDetails={subscriptionDetails[0]}
              />
            ) : (
              <AccessPassPayment
                freeTrialConsumed={freeTrialConsumed}
                subscriptionDetails={subscriptionDetails[0]}
                getInviteUrl={getInviteUrl}
                subscriberTONbalance={subscriberTonBalance}
                subscriberUSDTbalance={subscriberUSDTbalance}
              />
            )}
          </>
        ) : (
          <ChooseAccessPassPlan
            groupSubscriptions={groupsSubscriptions as GroupSubscriptions[]}
            handleContinue={handleContinue}
          />
        )}
      </>
    </Page>
  );
};

export default Payment;

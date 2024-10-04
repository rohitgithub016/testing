import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import WebApp from "@twa-dev/sdk";

interface ApiKeyResponse {
  data: { apiId: string; apiKey: string };
  success: boolean;
}

interface AcceptTermsRequest {
  username: string;
  acceptedTerms?: boolean;
  walletAddress?: string;
}

export interface GatedToken {
  amount: number;
  jettonSymbol: string;
  isTon: boolean;
  type: string;
  jettonAddress: string;
  isNft: boolean;
}

interface Subscriptions {
  type: string;
  gatedToken: GatedToken;
  description: string;
  url: {
    inviteUrl: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  period: string;
  _id: string;
}
export interface Groups {
  groupName: string;
  totalSubscribers: number;
  _id: string;
  subscriptions: Subscriptions[];
  oneDayEarningsTON: number;
  oneDayEarningsUSDT: number;
  totalEarningsTON: number;
  totalEarningsUSDT: number;
  monthlyEarningsTON: number;
  monthlyEarningsUSDT: number;
}

interface GroupsResponse {
  data: Groups[];
  success: boolean;
}

interface Subscription {
  groupId: string;
  subscriptionId: string;
  subscriptionName: string;
  subscriptionPeriod: string;
  subscriptionActive: boolean;
}

interface SubscriptionResponse {
  data: Subscription[];
  success: boolean;
}

interface CreateSubscriptionResponse {
  data: { url: { inviteUrl: string } };
  success: boolean;
}

interface CreateSubscriptionRequest {
  group: string | null;
  price?: {
    amount: number;
    currency: string;
  };
  period: string;
  tags: string[];
  description?: string | undefined;
  name: string;
}

interface JettonData {
  address: string;
  balance: string;
  owner: string;
  jetton: string;
  lastTransaction: string;
  jettonContent: {
    uri: string;
    decimals: string;
    image: string;
    name: string;
    symbol: string;
  };
}

interface JettonDataResponse {
  data: JettonData[];
  success: boolean;
}

interface TokenUSD {
  prices: { USD: number };
}

interface TokenPriceResponse {
  rates: {
    TON: TokenUSD;
    USDT: TokenUSD;
  };
}

interface Earnings {
  earningsByGroup: {
    groupId: string;
    groupName: string;
    earningsUSDT: number;
    earningTon: number;
  }[];
  _id: string | null;
  earningsTON: number;
  earningsUSDT: number;
  totalMonthlyAverageBalance: number;
}
interface EarningsResponse {
  data: Earnings[];
  success: boolean;
}

interface CommunityStats {
  swapsAllTime: number;
  percentageChangeSwaps: number;
  communityBalance: {
    ton: number;
    usdt: number;
    totalUsdBalance: number;
  };
}
interface CommunityStatsResponse {
  data: CommunityStats;
  success: boolean;
}

interface Transactions {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  results: {
    groupName: string;
    subscriptionName: string;
    transactionHash: string;
    transactionTime: string;
    subscriptionAmount: number;
    subscriptionCurrency: string;
    subscriberUsername: string;
  }[];
}

interface TransactionsResponse {
  data: Transactions;
  success: boolean;
}

interface DisconnectWalletPayload {
  username: string;
  walletAddress: string;
}

export type SubscriptionDetails = {
  _id: string;
  group: {
    _id: string;
    chatId: string;
    name: string;
    botRole: string;
    type: string;
    creator: string;
    modificationNumber: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  period: string;
  active: boolean;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  freeTrial: boolean;
  modificationNumber: number;
  createdAt: string;
  updatedAt: string;
  url: {
    inviteUrl: string;
  };
  subscribersCount: number;
  creatorDetails: {
    username: string;
    chatId: string;
  };
  gatedToken?: GatedToken;
  freeTrialPeriod?: boolean;
};

interface SubscriptionDetailsResponse {
  data: SubscriptionDetails[];
  success: boolean;
}

interface PaymentSuccessResponse {
  data: { inviteLink: string };
  success: boolean;
}

interface TonBalanceResponse {
  data: { userBalance: number };
  success: boolean;
}

interface PrepareTransaction {
  address: string;
  amount: number;
  payload?: string;
}

interface PrepareTransactionResponse {
  data: PrepareTransaction;
  success: boolean;
}

interface AnalyticsChartData {
  totalClicks: number;
  walletConnected: number;
  totalJoined: number;
  active: number;
  totalPayments: number;
}
interface AnalyticsChartResponse {
  data: AnalyticsChartData[];
  success: boolean;
}

interface FeedbackRequest {
  message: string;
  username: string;
  type: string;
}

interface FeedbackResponse {
  data: void;
  success: boolean;
}

interface GroupSubscribers {
  _id: string;
  subscribers: { subscribers: { username: string } }[];
}
interface GroupsSubscribersResponse {
  data: GroupSubscribers;
  success: boolean;
}

interface SubscriberDetails {
  freeTrialConsumed: boolean;
}
interface SubscriberDetailsResponse {
  data: SubscriberDetails;
  success: boolean;
}

interface NFTcollection {
  address: string;
  collectionAddress: string;
  ownerAddress: string;
  index: string;
  contentUri: string;
  collectionName: string;
}

interface NFTBalanceResponse {
  data: { userBalance: { nftDetails: NFTcollection[] } };
  success: boolean;
}

interface SubscriberInitiateRequest {
  subscription: string;
  username: string;
  chatId: string;
}

export interface GroupSubscriptions {
  subscriptionPrice: {
    amount: number;
    currency: string;
  };
  // "subscriptionGatedToken": null,
  subscriptionId: string;
  subscriptionName: string;
  subscriptionPeriod: string;
  subscriptionActive: boolean;
  subscriberCount: number;
  groupName: string;
  subscriptionFreeTrialPeriod: number;
}
interface GroupSubscriptionResponse {
  data: GroupSubscriptions[];
  success: boolean;
}

interface UpdateSubscriptionRequest {
  price?: {
    amount: number;
    currency: string;
  };
  period: string;
  tags: string[];
  description?: string | undefined;
  name: string;
  subscriptionId: string;
}

export const hubzApi = createApi({
  reducerPath: "hubzApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-dev.hubz.io/api",
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== "getTonUsdtRates") {
        headers.set("x-init-data", WebApp?.initData || "query_id=AAGoFc9WAAAAAKgVz1Y1JOZq&user=%7B%22id%22%3A1456412072%2C%22first_name%22%3A%22R%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22rohitbhandari016%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728026940&hash=ed0032bf03e30e14eb17e1875f97658ec4a3dd89646d8173091cdc3a4e5050de");
      }
    },
  }),
  endpoints: (builder) => ({
    getApiKey: builder.mutation<string, string>({
      query: (userName) => ({
        url: `/v0/gateway/generate-key`,
        method: "POST",
        body: { username: userName },
      }),
      transformResponse: (response: ApiKeyResponse) => {
        return response.data.apiKey;
      },
    }),
    acceptTerms: builder.mutation<void, AcceptTermsRequest>({
      query: (body) => ({
        url: "/v0/creator",
        method: "PUT",
        body: body,
      }),
    }),
    getTonUsdtRates: builder.query<TokenPriceResponse, void>({
      query: () => ({
        url: "https://tonapi.io/v2/rates?tokens=ton,usdt&currencies=usd",
        method: "GET",
      }),
    }),
    getGroups: builder.query<Groups[], string>({
      query: (userName) => ({
        url: `/v0/group?creatorUsername=${userName}`,
        method: "GET",
      }),
      transformResponse: (response: GroupsResponse) => {
        return response.data;
      },
    }),
    getCreatorSubscriptions: builder.query<Subscription[], string>({
      query: (userName) => ({
        url: `/v0/subscription?creatorUsername=${userName}`,
        method: "GET",
      }),
      transformResponse: (response: SubscriptionResponse) => {
        return response.data;
      },
    }),
    getEarningsDetails: builder.query<Earnings[], string>({
      query: (userName) => ({
        url: `/v0/creator/earning?username=${userName}`,
        method: "GET",
      }),
      transformResponse: (response: EarningsResponse) => response.data,
    }),
    getCommunityStats: builder.query<CommunityStats, string>({
      query: (userName) => ({
        url: `/v0/creator/analytics/community-stats?username=${userName}`,
        method: "GET",
      }),
      transformResponse: (response: CommunityStatsResponse) => response.data,
    }),
    // getTransactionData: builder.query<Transactions[], string>({
    //   query: (userName) => ({
    //     url: `/v0/creator/payment?username=${userName}`,
    //     method: "GET",
    //   }),
    //   transformResponse: (response: TransactionsResponse) => response.data
    // }),
    getTransactionData: builder.query<
      Transactions,
      {
        userName: string;
        page: number;
        days: number;
        groupId: string | undefined;
      }
    >({
      query: ({ userName, page = 1, days = 1, groupId }) => ({
        // url: `/v0/creator/payment?username=${userName}`,
        url: `/v0/creator/transaction?username=${userName}&page=${page}&days=${days}&limit=${10}${
          groupId ? `&groupId=${groupId}` : ""
        }`,
        method: "GET",
      }),
      transformResponse: (response: TransactionsResponse) => response.data,
    }),
    // getSubscriberCount: builder.query<any, any>({
    //   query: (userName) => ({
    //     url: `/v0/creator/analytics/subscriber-stats?username=${userName}`,
    //     method: "GET",
    //   }),
    // }),
    getAnalyticsChartData: builder.query<AnalyticsChartData, string>({
      query: (groupId) => ({
        url: `/v0/creator/analytics/subscription-stats?group=${groupId}`,
        method: "GET",
      }),
      transformResponse: (response: AnalyticsChartResponse) => response.data[0],
    }),
    createSubscription: builder.mutation<string, CreateSubscriptionRequest>({
      query: (payload) => ({
        url: `/v0/subscription`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: CreateSubscriptionResponse) => {
        return response.data.url.inviteUrl;
      },
    }),
    getJetTonsData: builder.query<JettonData[], string>({
      query: (walletAddress) => ({
        url: `/v0/jetton/jetton-holding?walletAddress=${walletAddress}`,
        method: "GET",
      }),
      transformResponse: (response: JettonDataResponse) => {
        return response.data;
      },
    }),
    disconnectWallet: builder.mutation<string, DisconnectWalletPayload>({
      query: (payload) => ({
        url: `/v0/subscription`,
        method: "POST",
        body: payload,
      }),
    }),
    getSubscriptionDetails: builder.query<SubscriptionDetails[], string>({
      query: (subscriptionId) => ({
        url: `/v0/subscription?subscriptionId=${subscriptionId}`,
        method: "GET",
      }),
      transformResponse: (response: SubscriptionDetailsResponse) => {
        return response.data;
      },
    }),
    paymentSuccess: builder.mutation<
      string,
      { subscriptionId: string; username: string }
    >({
      query: (payload) => ({
        url: `/v0/subscriber/payment-success`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: PaymentSuccessResponse) => {
        return response.data.inviteLink;
      },
    }),
    getTonBalance: builder.query<number, string>({
      query: (walletAddress) => ({
        url: `/v0/ton/balance?walletAddress=${walletAddress}`,
        method: "GET",
      }),
      transformResponse: (response: TonBalanceResponse) => {
        return response.data?.userBalance;
      },
    }),
    prepareTransaction: builder.mutation<
      PrepareTransaction,
      { subscriptionId: string; walletAddress: string }
    >({
      query: (payload) => ({
        url: `/v0/subscriber/prepare-transaction`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: PrepareTransactionResponse) => {
        return response.data;
      },
    }),
    updateSubscriberAddress: builder.mutation<
      SubscriberDetails,
      { subscriptionId: string; username: string; walletAddress: string }
    >({
      query: (payload) => ({
        url: `/v0/subscriber`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: SubscriberDetailsResponse) => {
        return response.data;
      },
    }),
    feedback: builder.mutation<FeedbackResponse, FeedbackRequest>({
      query: (payload) => ({
        url: `/v0/feedbacks`,
        method: "POST",
        body: payload,
      }),
    }),
    getGroupsSubscribers: builder.query<
      {
        subscribers: {
          username: string;
        };
      }[],
      string
    >({
      query: (groupId) => ({
        url: `/v0/subscriber/getSubscriberByGroupId?groupId=${groupId}`,
        method: "GET",
      }),
      transformResponse: (response: GroupsSubscribersResponse) => {
        return response.data?.subscribers;
      },
    }),
    getNFTBalance: builder.query<NFTcollection[], string>({
      query: (walletAddress) => ({
        url: `v0/ton/nft-balance?walletAddress=${walletAddress}`,
        method: "GET",
      }),
      transformResponse: (response: NFTBalanceResponse) => {
        return response?.data?.userBalance?.nftDetails;
      },
    }),
    subscriberInitiate: builder.mutation<
      FeedbackResponse,
      SubscriberInitiateRequest
    >({
      query: (payload) => ({
        url: `/v0/subscriber`,
        method: "POST",
        body: payload,
      }),
    }),
    getGroupSubscriptions: builder.query<GroupSubscriptions[], string>({
      query: (groupId) => ({
        url: `v0/subscription?groupId=${groupId}`,
        method: "GET",
      }),
      transformResponse: (response: GroupSubscriptionResponse) => {
        return response?.data;
      },
    }),
    updateSubscription: builder.mutation<string, UpdateSubscriptionRequest>({
      query: (payload) => ({
        url: `/v0/subscription`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: CreateSubscriptionResponse) => {
        return response.data.url.inviteUrl;
      },
    }),
  }),
});

export const {
  useGetApiKeyMutation,
  useAcceptTermsMutation,
  useGetTonUsdtRatesQuery,
  useGetGroupsQuery,
  useGetEarningsDetailsQuery,
  useGetTransactionDataQuery,
  useGetAnalyticsChartDataQuery,
  useCreateSubscriptionMutation,
  useGetJetTonsDataQuery,
  useGetCommunityStatsQuery,
  useDisconnectWalletMutation,
  useGetCreatorSubscriptionsQuery,
  useGetSubscriptionDetailsQuery,
  usePaymentSuccessMutation,
  useGetTonBalanceQuery,
  usePrepareTransactionMutation,
  useUpdateSubscriberAddressMutation,
  useFeedbackMutation,
  useGetGroupsSubscribersQuery,
  useGetNFTBalanceQuery,
  useSubscriberInitiateMutation,
  useGetGroupSubscriptionsQuery,
  useUpdateSubscriptionMutation,
} = hubzApi;

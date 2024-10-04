import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/store/index";


type TokenPriceInUSD = {
  TON: number;
  USDT: number;
};

type initialStateType = {
  userName: string;
  tonUsdtRate: number;
  groupsPresent: boolean;
  subscriptionPresent: boolean;
  tokenPriceInUSD: TokenPriceInUSD;
};

const initialState: initialStateType = {
  userName: "",
  tonUsdtRate: 0,
  groupsPresent: false,
  subscriptionPresent: false,
  tokenPriceInUSD: {
    TON: 0,
    USDT: 0,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setTonUsdtRate: (state, action: PayloadAction<number>) => {
      state.tonUsdtRate = action.payload;
    },
    setGroupsPresent: (state, action: PayloadAction<boolean>) => {
      state.groupsPresent = action.payload;
    },
    setSubscriptionPresent: (state, action: PayloadAction<boolean>) => {
      state.subscriptionPresent = action.payload;
    },
    setTokenPriceInUSD: (state, action: PayloadAction<TokenPriceInUSD>) => {
      state.tokenPriceInUSD = action.payload;
    },
  },
});

export const {
  setUserName,
  setTonUsdtRate,
  setGroupsPresent,
  setSubscriptionPresent,
  setTokenPriceInUSD,
} = appSlice.actions;

export const selectUserName = (state: RootState) => state.app.userName;

export const selectTonUsdtRate = (state: RootState) => state.app.tonUsdtRate;

export const selectGroupsPresent = (state: RootState) =>
  state.app.groupsPresent;

export const selectSubscriptionPresent = (state: RootState) =>
  state.app.subscriptionPresent;

export const selectTokenPriceInUSD = (state: RootState) =>
  state.app.tokenPriceInUSD;

export default appSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { config } from '../../config';

export const initialState = {
  isUserEligibleForNFT: false,
  isUserNonEligibleForNFT: false,
  isUserCheckingForEligibility: false,
  isUserClaimingNFT: false,
  isNFTClaimedByUser: false,
  walletAddress: null,
  accountDetailsForNFT: {
    address: '',
    token_id: '',
    task_id: '',
    name: '',
    rank: 0,
    score: 0,
    level: 0,
    total_eligible_users: 0,
  },
  isWalletClaimedAnyNFT: false,
};

export const reducers = {};

export const fetchNFTContestData = createAsyncThunk(
  'data/fetchNFTContestData',
  async (options) => {
    const configResponse = config(options.chainId);
    const response = await fetch(
      `${configResponse.questPageJSONLink}${options.addressLastChar}.json`,
    ); // Adjust the path to your JSON file
    const data = await response.json();
    return data;
  },
);

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setUserClaimingNFTAction(state, action) {
      state.isUserClaimingNFT = action.payload;
    },
    setNFTClaimedByUserAction(state, action) {
      state.isNFTClaimedByUser = action.payload;
    },
    setWalletAddressAction(state, action) {
      state.walletAddress = action.payload;
    },
    setUserEligibleNFTAction(state, action) {
      state.isUserEligibleForNFT = action.payload;
    },
    setUserNonEligibleNFTAction(state, action) {
      state.isUserNonEligibleForNFT = action.payload;
    },
    setAccountDetailsForNFTAction(state, action) {
      state.accountDetailsForNFT = action.payload;
    },
    setIsWalletClaimedAnyNFT(state, action) {
      state.isWalletClaimedAnyNFT = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTContestData.pending, (state) => ({
        ...state,
        isUserCheckingForEligibility: true,
      }))
      .addCase(fetchNFTContestData.fulfilled, (state) => ({
        ...state,
        isUserCheckingForEligibility: false,
      }))
      .addCase(fetchNFTContestData.rejected, (state) => ({
        ...state,
        isUserCheckingForEligibility: false,
      }));
  },
});

export const {
  setUserClaimingNFTAction,
  setNFTClaimedByUserAction,
  setWalletAddressAction,
  setUserEligibleNFTAction,
  setUserNonEligibleNFTAction,
  setAccountDetailsForNFTAction,
  setIsWalletClaimedAnyNFT,
} = questSlice.actions;

export default questSlice.reducer;

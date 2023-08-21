import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fetchNFTContestData = createAsyncThunk('data/fetchNFTContestData', async (addressLastChar) => {
  const response = await fetch(`https://static.staging.jediswap.xyz/missions-list/${addressLastChar}.json`); // Adjust the path to your JSON file
  const data = await response.json();
  return data;
});

export const fetchNFTIsClaimedData = createAsyncThunk('data/fetchNFTIsClaimedData', async () => {
  const response = await fetch('/data/nft-completed-data.json'); // Adjust the path to your JSON file
  const data = await response.json();
  return data;
});

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
      }))
      .addCase(fetchNFTIsClaimedData.fulfilled, (state, action) => {
        const NFTIsClaimedData = action.payload;
        const found = NFTIsClaimedData.find(
          (resData) => resData.address === state.walletAddress,
        );

        return {
          ...state,
          isWalletClaimedAnyNFT: found?.is_completed,
          isNFTClaimedByUser: true,
        };
      });
  },
});

export const {
  setUserClaimingNFTAction,
  setNFTClaimedByUserAction,
  setWalletAddressAction,
  setUserEligibleNFTAction,
  setUserNonEligibleNFTAction,
  setAccountDetailsForNFTAction,
} = questSlice.actions;

export default questSlice.reducer;

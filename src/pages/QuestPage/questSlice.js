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
};

export const reducers = {};

export const fetchNFTContestData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('/data/nft-contest-data.json'); // Adjust the path to your JSON file
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTContestData.pending, (state) => ({
        ...state,
        isUserCheckingForEligibility: true,
      }))
      .addCase(fetchNFTContestData.fulfilled, (state, action) => {
        const NFTContestData = action.payload;
        let isUserEligibleForNFTValue = false;
        let accountDetailsForNFTValue = null;
        NFTContestData.forEach((data) => {
          if (data.address === state.walletAddress) {
            isUserEligibleForNFTValue = true;
            accountDetailsForNFTValue = data;
          }
        });

        return {
          ...state,
          isUserCheckingForEligibility: false,
          isUserEligibleForNFT: isUserEligibleForNFTValue,
          isUserNonEligibleForNFT: !isUserEligibleForNFTValue,
          accountDetailsForNFT: accountDetailsForNFTValue,
        };
      })
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
} = questSlice.actions;

export default questSlice.reducer;

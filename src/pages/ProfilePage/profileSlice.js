import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  nftsClaimedByAUser: [],
  walletAddress: null,
};

export const reducers = {};

export const fetchProfileData = createAsyncThunk('data/fetchProfileData', async () => {
  const response = await fetch('/data/profile-data.json'); // Adjust the path to your JSON file
  const data = await response.json();
  return data;
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setNftsClaimedByAUserAction(state, action) {
      state.nftsClaimedByAUser = action.payload;
    },
    setWalletAddressAction(state, action) {
      state.walletAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        const profileData = action.payload;
        const found = profileData.find(
          (resData) => resData.address === state.walletAddress,
        );
        return {
          ...state,
          nftsClaimedByAUser: [found],
        };
      });
  },
});

export const {
  setNftsClaimedByAUserAction,
  setWalletAddressAction
} = profileSlice.actions;

export default profileSlice.reducer;

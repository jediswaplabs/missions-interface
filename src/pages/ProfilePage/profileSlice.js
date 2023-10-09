import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from './profileAPI';

export const initialState = {
  nftsClaimedByAUser: [],
  walletAddress: null,
  closeProfilePopout: window.localStorage?.getItem('hideProfilePopout') || false,
  profileDataLoading: false,
};

export const reducers = {};

export const fetchProfileData = createAsyncThunk(
  'data/fetchProfileData',
  async (options) => {
    const response = await api.fetchData(options.address, options.chainId);
    return response.data;
  },
);

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
    setCloseProfilePopout(state, action) {
      state.closeProfilePopout = action.payload;
      window.localStorage?.setItem('hideProfilePopout', 'true');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => ({
      ...state,
      profileDataLoading: true,
    }));
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      const profileData = action.payload;
      return {
        ...state,
        nftsClaimedByAUser: profileData,
        profileDataLoading: false,
      };
    });
    builder.addCase(fetchProfileData.rejected, (state) => ({
      ...state,
      profileDataLoading: false,
    }));
  },
});

export const {
  setNftsClaimedByAUserAction,
  setWalletAddressAction,
  setCloseProfilePopout,
} = profileSlice.actions;

export default profileSlice.reducer;

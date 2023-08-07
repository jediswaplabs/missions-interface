import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isUserEligibleForNFT: false,
  isUserNonEligibleForNFT: false,
  isUserCheckingForEligibility: false,
  isUserClaimingNFT: false,
  isNFTClaimedByUser: false,
};

export const reducers = {};

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setUserEligibilityForNFTAction(state, action) {
      state.isUserEligibleForNFT = action.payload;
    },
    setUserNonEligibilityForNFTAction(state, action) {
      state.isUserNonEligibleForNFT = action.payload;
    },
    setUserCheckingForEligibilityAction(state, action) {
      state.isUserCheckingForEligibility = action.payload;
    },
    setUserClaimingNFTAction(state, action) {
      state.isUserClaimingNFT = action.payload;
    },
    setNFTClaimedByUserAction(state, action) {
      state.isNFTClaimedByUser = action.payload;
    },
  },
});

export const {
  setUserEligibilityForNFTAction,
  setUserCheckingForEligibilityAction,
  setUserNonEligibilityForNFTAction,
  setUserClaimingNFTAction,
  setNFTClaimedByUserAction,
} = questSlice.actions;

export default questSlice.reducer;

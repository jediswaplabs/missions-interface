import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isWalletModalOpen : false
}

export const reducers = {};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletModalOpenAction(state, action) {
      state.isWalletModalOpen= action.payload;
    },
    
  },
});

export const { setWalletModalOpenAction } = walletSlice.actions

export default walletSlice.reducer;

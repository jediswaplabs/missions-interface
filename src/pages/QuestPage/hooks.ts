import { useTokenContract } from "../../hooks/useContract";

import { useAccountDetails } from "../../hooks";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setNFTClaimedByUserAction, setUserClaimingNFTAction, setWalletAddressAction } from "./questSlice";

export const getTokenContract = () => {
  // get token contract based on contract address
  const tokenContract = useTokenContract(
    "0x008cd5060ed29f603f918f69b49fa84b7a4995f74dafd9414935a9cf34aa5f5e"
  );
  return tokenContract;
};

export function useQuestActionHandlers() {
    const dispatch = useDispatch();
  
    const setUserClaimingNFT = useCallback(
      (value) => {
        dispatch(setUserClaimingNFTAction(value));
      },
      [dispatch]
    );
  
    const setNFTClaimedByUser = useCallback(
      (value) => {
        dispatch(setNFTClaimedByUserAction(value));
      },
      [dispatch]
    );

    const setWalletAddress = useCallback(
        (value) => {
          dispatch(setWalletAddressAction(value));
        },
        [dispatch]
      );

  
    return {
      setUserClaimingNFT,
      setNFTClaimedByUser,
      setWalletAddress
    };
  }

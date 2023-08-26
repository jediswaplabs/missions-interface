import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  setNFTClaimedByUserAction,
  setUserClaimingNFTAction,
  setWalletAddressAction,
} from "./questSlice"; 


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
    setWalletAddress,
  };
}




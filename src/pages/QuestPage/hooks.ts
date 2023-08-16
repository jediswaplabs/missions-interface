import { useTokenContract } from "../../hooks/useContract";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  setNFTClaimedByUserAction,
  setUserClaimingNFTAction,
  setWalletAddressAction,
} from "./questSlice";
import { stark } from "starknet";
// import { useSingleCallResult } from "../../hooks/multicall/hooks";

// import {tree} from '../../data/merkle_stark'
import { useContractWrite } from "@starknet-react/core";

export const getTokenContract = () => {
  // get token contract based on contract address
  const tokenContract = useTokenContract(
    "0x04cc759cd01bd973f8a98edd04339e8077c98cb744c90d3de46045d560ea1bae"
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
    setWalletAddress,
  };
}




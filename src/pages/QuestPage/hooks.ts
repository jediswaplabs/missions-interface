import { useTokenContract } from "../../hooks/useContract";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  setNFTClaimedByUserAction,
  setUserClaimingNFTAction,
  setWalletAddressAction,
} from "./questSlice";
// import { useSingleCallResult } from "../../hooks/multicall/hooks";

// import {tree} from '../../data/merkle_stark'
import { useContractWrite } from "@starknet-react/core";

export const getTokenContract = () => {
  // get token contract based on contract address
//   const tokenContract = useTokenContract(
//     "0x04cc759cd01bd973f8a98edd04339e8077c98cb744c90d3de46045d560ea1bae"
//   );
  const tokenContract = useTokenContract(
    "0x06c4f71c1c4a14bba747b4d18dfb73b486aa2ba921dd0de4f64dc415536b8ba6"
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




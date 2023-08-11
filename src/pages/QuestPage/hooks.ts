import { useTokenContract } from "../../hooks/useContract";
import {  num,cairo } from 'starknet';
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  setNFTClaimedByUserAction,
  setUserClaimingNFTAction,
  setWalletAddressAction,
} from "./questSlice";
import { useSingleCallResult } from "../../hooks/multicall/hooks";

import {tree} from '../../data/merkle_stark'

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
    setWalletAddress,
  };
}

export function useClaimNFT(accountDetailsForNFT) {
  const {
    token_id,
    task_id,
    name,
    rank,
    score,
    percentile,
    level,
    total_eligible_users,
  } = accountDetailsForNFT;
  const nameInCairo = num.toHex(cairo.felt(name))
  const tokenContract = getTokenContract();
  const mintNFT = useSingleCallResult(tokenContract, "mint_whitelist", {
    token_id: token_id,
    proof:tree.getProof(accountDetailsForNFT),
    token_metadata: {
      task_id: task_id,
      name: nameInCairo,
      rank: rank,
      score: score,
      percentile: percentile,
      level: level,
      total_eligible_users: total_eligible_users,
    },
  });
}

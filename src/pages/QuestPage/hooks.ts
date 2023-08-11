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

  const calls =  useDoTransaction(accountDetailsForNFT)

    // Returns a function to trigger the transaction
    // and state of tx after being sent
    const { write, isLoading, data } = useContractWrite({
        calls,
    });

    write();
}


export  function useDoTransaction(accountDetailsForNFT) {
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
      console.log(accountDetailsForNFT)
    // const nameInCairo = num.toHex(cairo.felt(name))
    const calls = useMemo(() => {
        // compile the calldata to send
        const calldata = stark.compileCalldata( {
                token_id: token_id,
                // proof:tree.getProof(accountDetailsForNFT),
                token_metadata: {
                  task_id: task_id,
                  name: '0x4c315032',
                  rank: rank,
                  score: score,
                  percentile: percentile,
                  level: level,
                  total_eligible_users: total_eligible_users,
                }})
    
        const tokenContract = getTokenContract();
        // return a single object for single transaction, 
        // or an array of objects for multicall**
        return {
          contractAddress: tokenContract,
          entrypoint: 'mint_whitelist',
          calldata,
        };        
    }, [token_id]);
    
    return calls;
}



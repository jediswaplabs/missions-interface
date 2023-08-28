import { useEffect, useCallback, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  useAccount,
} from "@starknet-react/core";

import { setWalletModalOpenAction } from "../features/wallet/walletSlice";


export const useAccountDetails = () => {
  const { account, address, connector, status } = useAccount();
  const chainId = account?.chainId || account?.provider?.chainId;
  return useMemo(() => {
    return { address, connector, account, chainId, status };
  }, [account]);
};


// modified from https://usehooks.com/usePrevious/
export function usePrevious(value) {
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function useWalletActionHandlers() {
  const dispatch = useDispatch();

  const setWalletModalOpen = useCallback(
    (value) => {
      dispatch(setWalletModalOpenAction(value));
    },
    [dispatch]
  );

  return {
    setWalletModalOpen,
  };
}
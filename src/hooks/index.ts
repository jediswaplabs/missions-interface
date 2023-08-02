import { useStarknetReact as useStarknetReactCore } from "@web3-starknet-react/core";
import { isMobile } from "react-device-detect";
import { useEffect, useState, useMemo , useRef} from "react";
import { ArgentXConnector } from "@web3-starknet-react/argentx-connector";

import { NetworkContextName } from "../common/contansts";
import { argentX, braavosWallet } from "../common/connectors";
import { InjectedConnector, useConnectors, useAccount } from '@starknet-react/core'


export function useActiveStarknetReact() {
  const context = useStarknetReactCore();
  const contextNetwork = useStarknetReactCore(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export const useAccountDetails = () => {
  const { account, address, connector, status } = useAccount()
  const chainId = account?.chainId || account?.provider?.chainId
  return useMemo(() => {
    return { address, connector, account, chainId, status }
  }, [account])
}

// No longer required since we are now using starkrnet-react library
// export function useEagerConnect() {
//   const { active } = useStarknetReactCore(); // specifically using useStarknetReactCore because of what this hook does
//   const [tried, setTried] = useState(false);
//   const { connect } = useConnectors();

//   const injected = localStorage.getItem("auto-injected-wallet");

//   let connector

//   if (injected === "argentX") {
//     connector = argentX;
//   } else if (injected === "braavos") {
//     connector = braavosWallet;
//   }
//   useEffect(() => {
//     if (connector) {
//       connect(connector);
//     }
//   }, [connector]);

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     if (!connector) { return; }

//   //     connector.isAuthorized().then((isAuthorized) => {
//   //       if (isAuthorized && connector) {
//   //         activate(connector, undefined, true).catch(() => {
//   //           setTried(true);
//   //         });
//   //       } else if (isMobile && window.starknet && connector) {
//   //         activate(connector, undefined, true).catch(() => {
//   //           setTried(true);
//   //         });
//   //       } else {
//   //         setTried(true);
//   //       }
//   //     });
//   //   }, 100);
//   // }, [activate, connector]); // intentionally only running on mount (make sure it's only mounted once :))

//   // if the connection worked, wait until we get confirmation of that to flip the flag
//   useEffect(() => {
//     if (active) {
//       setTried(true);
//     }
//   }, [active]);

//   return tried;
// }

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useStarknetReactCore() // specifically using useStarknetReact because of what this hook does
  const { connector } = useAccountDetails()
  const { connect } = useConnectors()

  useEffect(() => {
    const { starknet, starknet_braavos } = window

    if (starknet && !active && !error && !suppress && connector) {
      const activeConnector = connector instanceof InjectedConnector ? argentX : braavosWallet

      const handleChainChanged = () => {
        // eat errors
        connect(activeConnector)
      }

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          // eat errors
          connect(activeConnector)
        }
      }

      // starknet.on('chainChanged', handleChainChanged)
      // starknet.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (starknet) {
          // ethereum.removeListener('chainChanged', handleChainChanged)
          starknet.off('accountsChanged', handleAccountsChanged)
        }

        if (starknet_braavos) {
          starknet_braavos.off('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate, connector])
}


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

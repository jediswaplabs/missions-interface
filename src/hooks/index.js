import { useStarknetReact as useStarknetReactCore } from '@web3-starknet-react/core';
import { isMobile } from 'react-device-detect';
import { useEffect, useState, useRef } from 'react';
import { ArgentXConnector } from '@web3-starknet-react/argentx-connector';

import { NetworkContextName } from '../common/contansts';
import { argentX, braavosWallet } from '../common/connectors';

export function useActiveStarknetReact() {
  const context = useStarknetReactCore();
  const contextNetwork = useStarknetReactCore(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export function useEagerConnect() {
  const { activate, active } = useStarknetReactCore(); // specifically using useStarknetReactCore because of what this hook does
  const [tried, setTried] = useState(false);

  const injected = localStorage.getItem('auto-injected-wallet');
  let connector;

  if (injected === 'argentx') {
    connector = argentX;
  } else if (injected === 'braavos') {
    connector = braavosWallet;
  }

  useEffect(() => {
    setTimeout(() => {
      if (!connector) { return; }

      connector.isAuthorized().then((isAuthorized) => {
        if (isAuthorized && connector) {
          activate(connector, undefined, true).catch(() => {
            setTried(true);
          });
        } else if (isMobile && window.starknet && connector) {
          activate(connector, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      });
    }, 100);
  }, [activate, connector]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate, connector } = useStarknetReactCore(); // specifically using useStarknetReact because of what this hook does

  useEffect(() => {
    const { starknet, starknet_braavos: starknetBraavos } = window;

    if (starknet && !active && !error && !suppress && connector) {
      const activeConnector = connector instanceof ArgentXConnector ? argentX : braavosWallet;

      const handleAccountsChanged = (accounts) => {
        if (!accounts.length) {
          return;
        }
        activate(activeConnector, undefined, true).catch((e) => {
          console.error('Failed to activate after accounts changed', e);
        });
      };

      return () => {
        if (starknet) {
          // ethereum.removeListener('chainChanged', handleChainChanged)
          starknet.off('accountsChanged', handleAccountsChanged);
        }

        if (starknetBraavos) {
          starknetBraavos.off('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate, connector]);
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

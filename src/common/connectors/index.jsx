import { ChainId } from "@jediswap/sdk";
import { ArgentXConnector } from "@web3-starknet-react/argentx-connector";
import { BraavosConnector } from "@web3-starknet-react/braavos-connector";

console.log("hostname", window.location.hostname);
export let argentX = new ArgentXConnector({
  supportedChainIds: [ChainId.MAINNET],
});
export let braavosWallet = new BraavosConnector({
  supportedChainIds: [ChainId.MAINNET],
});
if (window.location.hostname == "missions.jediswap.xyz") {
  argentX = new ArgentXConnector({
    supportedChainIds: [ChainId.MAINNET],
  });
  braavosWallet = new BraavosConnector({
    supportedChainIds: [ChainId.MAINNET],
  });
}

if (window.location.hostname == "localhost") {
  {
    argentX = new ArgentXConnector({
      supportedChainIds: [ChainId.GÖRLI],
    });
    braavosWallet = new BraavosConnector({
      supportedChainIds: [ChainId.GÖRLI],
    });
  }
}

if (window.location.hostname == "missions.testnet.jediswap.xyz") {
  {
    argentX = new ArgentXConnector({
      supportedChainIds: [ChainId.GÖRLI],
    });
    braavosWallet = new BraavosConnector({
      supportedChainIds: [ChainId.GÖRLI],
    });
  }
}

if (window.location.hostname == "mission.staging.jediswap.xyz") {
  argentX = new ArgentXConnector({
    supportedChainIds: [ChainId.MAINNET, ChainId.GÖRLI],
  });
  braavosWallet = new BraavosConnector({
    supportedChainIds: [ChainId.MAINNET, ChainId.GÖRLI],
  });
}

export const NETWORK_CHAIN_ID = 1;

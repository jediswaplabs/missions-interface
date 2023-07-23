import { ChainId } from '@jediswap/sdk';
import { ArgentXConnector } from '@web3-starknet-react/argentx-connector';
import { BraavosConnector } from '@web3-starknet-react/braavos-connector';

export const NETWORK_CHAIN_ID = 1;

export const argentX = new ArgentXConnector({ supportedChainIds: [ChainId.MAINNET] });

export const braavosWallet = new BraavosConnector({ supportedChainIds: [ChainId.MAINNET] });

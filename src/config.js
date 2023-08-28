import { isProductionChainId,
  isTestnet2ChainId } from './common/connectors/index.ts';

export const config = (chainId) => {
  const conf = isProductionChainId(chainId)
    ? {
      contractAddress:
          '0x05b01e344f902b5fe42a996e8d0c1d19f17405573a90b050ca73823a2ffef3cb',
      profilePageAPI: 'https://api.starkscan.co/api/v0/nfts',
      questPageJSONLink: 'https://static.jediswap.xyz/missions-list/',
    }
    : isTestnet2ChainId(chainId)
      ? {
        contractAddress:
          '0x0735c7eb714a1d67559a3acbee637462223f9f4dfa5d45cbe142c06e57255d1c',
        profilePageAPI: 'https://api-testnet-2.starkscan.co/api/v0/nfts',
        questPageJSONLink: 'https://static.staging.jediswap.xyz/missions-list/',
      }
      : {
        contractAddress:
          '0x0735c7eb714a1d67559a3acbee637462223f9f4dfa5d45cbe142c06e57255d1c',
        profilePageAPI: 'https://api-testnet.starkscan.co/api/v0/nfts',
        questPageJSONLink: 'https://static.staging.jediswap.xyz/missions-list/',
      };
  return conf;
};

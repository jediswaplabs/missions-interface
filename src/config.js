import { isProductionChainId } from './common/connectors/index.ts';

export const config = (chainId) => {
  const conf = isProductionChainId(chainId)
    ? {
      contractAddress:
          '0x05b991e122ff2410d32575eb369059bd26cb69a05d15001a0c93f2678d96d81c',
      profilePageAPI: 'https://starkscan-proxy.jediswap.xyz/api/',
      questPageJSONLink: 'https://static.jediswap.xyz/missions-list/',
    } : {
      contractAddress:
          '0x077126e027feb93fafa4a07147747ba8ce41e28f17bb25a8c281311f91b8b994',
      profilePageAPI: 'https://starkscan-proxy.testnet.jediswap.xyz/api/',
      questPageJSONLink: 'https://static.staging.jediswap.xyz/missions-list/',
    };
  return conf;
};

import {
  isProductionChainId,
  isTestnetChainId
} from "./common/connectors/index.ts";
import { isFakeContract } from "./common/constants.js";
import NFTContestABITestnet from "./constants/abis/nft-contest-testnet.json";
import NFTContestABIMainnet from "./constants/abis/nft-contest-mainnet.json";

export const config = chainId => {
  const conf = isProductionChainId(chainId)
    ? {
        contractAddress:
          "0x05b991e122ff2410d32575eb369059bd26cb69a05d15001a0c93f2678d96d81c",
        profilePageAPI: "https://starkscan-proxy.jediswap.xyz/api/",
        questPageJSONLink: "https://static.jediswap.xyz/missions-list/",
        abi: NFTContestABIMainnet
      }
    : isTestnetChainId(chainId) && isFakeContract //fake contract configuration (this config can be used to mint nft multiple times)
    ? {
        contractAddress:
          "0x06c4f71c1c4a14bba747b4d18dfb73b486aa2ba921dd0de4f64dc415536b8ba6",
        profilePageAPI: "https://starkscan-proxy.testnet.jediswap.xyz/api/",
        questPageJSONLink: "https://static.staging.jediswap.xyz/missions-list/",
        abi: NFTContestABITestnet,
        data: {
          // (modify data according to your address)
          token_id: 5,
          proof: [
            "0x1078f2c60e27233375aa6872407e437599947a9f063ae30f1abf54480b066c",
            "0x0",
            "0x4d109c9039ec0907cedea6b5215bed4f33c228b6dd9b7971be9315ba43739fe"
          ],
          token_metadata: {
            task_id: 1,
            name: 1278300209,
            rank: 520,
            score: 8000,
            level: 6,
            total_eligible_users: 120000
          }
        }
      }
    : {
        contractAddress:
          "0x077126e027feb93fafa4a07147747ba8ce41e28f17bb25a8c281311f91b8b994",
        profilePageAPI: "https://starkscan-proxy.testnet.jediswap.xyz/api/",
        questPageJSONLink: "https://static.staging.jediswap.xyz/missions-list/",
        abi: NFTContestABITestnet
      };
  return conf;
};

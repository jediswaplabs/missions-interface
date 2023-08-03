import { InjectedConnector } from "@starknet-react/core";
import { StarknetChainId } from "starknet/dist/constants";

export const isTestnetEnvironment = () => {
  const hostname = location.hostname;
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  }
  else if(hostname === "missions.testnet.jediswap.xyz" || hostname === "localhost" ) {
    return true
  }
  // const host = new URL(String(location))?.host || "";
  // return host === "missions.testnet.jediswap.xyz";
};

export const isStagingEnvironment = () => {
  const hostname = location.hostname;
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  }
  else if(hostname === "missions.staging.jediswap.xyz") {
    return true
  }
  // const host = new URL(String(location))?.host || "";
  // return host === "missions.staging.jediswap.xyz";
};

export const isProductionEnvironment = () => {
  const hostname = location.hostname;
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  }
  else if(hostname === "missions.jediswap.xyz") {
    return true
  }
  // const host = new URL(String(location))?.host || "";
  // return host === "missions.jediswap.xyz";
};

export const isProductionChainId = (id) => {
  return id === StarknetChainId.MAINNET;
};

export const isTestnetChainId = (id) => {
  return id === StarknetChainId.TESTNET;
};

export const isStagingChainId = (id) => {
  return [StarknetChainId.MAINNET,StarknetChainId.TESTNET ].includes(id)
}

export const NETWORK_CHAIN_ID = 1;
export const argentX = new InjectedConnector({ options: { id: "argentX" } });
export const braavosWallet = new InjectedConnector({
  options: { id: "braavos" },
});

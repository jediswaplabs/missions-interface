import { InjectedConnector } from "@starknet-react/core";
import { constants } from "starknet";

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
  // return host === "app.testnet.jediswap.xyz";
};

export const isStagingEnvironment = () => {
  const hostname = location.hostname;
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  } else if (hostname === "missions.staging.jediswap.xyz") {
    return true;
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
  } else if (hostname === "missions.jediswap.xyz") {
    return true;
  }
  // const host = new URL(String(location))?.host || "";
  // return host === "missions.jediswap.xyz";
};

export const isProductionChainId = (id) => {
  return id === constants.StarknetChainId.SN_MAIN;
};

export const isTestnetChainId = (id) => {
  return id === constants.StarknetChainId.SN_GOERLI;
};

export const isStagingChainId = (id) => {
  return [constants.StarknetChainId.SN_MAIN, constants.StarknetChainId.SN_GOERLI].includes(id);
};

export const NETWORK_CHAIN_ID = 1;
export const argentX = new InjectedConnector({ options: { id: "argentX" } });
export const braavosWallet = new InjectedConnector({
  options: { id: "braavos" },
});

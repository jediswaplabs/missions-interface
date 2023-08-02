import { InjectedConnector } from "@starknet-react/core";
import { StarknetChainId } from "starknet/dist/constants";

export const isTestnetEnvironment = () => {
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  }
  const host = new URL(String(location))?.host || "";
  return host === "missions.testnet.jediswap.xyz";
};

export const isStagingEnvironment = () => {
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  }
  const host = new URL(String(location))?.host || "";
  return host === "missions.staging.jediswap.xyz";
};

export const isProductionEnvironment = () => {
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  }
  const host = new URL(String(location))?.host || "";
  return host === "missions.jediswap.xyz";
};

export const isProductionChainId = (id) => {
  return id === StarknetChainId.MAINNET;
};

export const isTestnetChainId = (id) => {
  return id === StarknetChainId.TESTNET;
};

export const NETWORK_CHAIN_ID = 1;
export const argentX = new InjectedConnector({ options: { id: "argentX" } });
export const braavosWallet = new InjectedConnector({
  options: { id: "braavos" },
});

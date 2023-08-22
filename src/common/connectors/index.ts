import { InjectedConnector } from "@starknet-react/core";
import { constants } from "starknet";
// import { StarknetChainId } from "starknet/dist/constants";
const { StarknetChainId } = constants;

export const isTestnetEnvironment = () => {
  if (!location) {
    return false;
  }
  if (String(location) === "//") {
    return false;
  }
  const host = new URL(String(location))?.host || "";
  return host === "app.testnet.jediswap.xyz";
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
  return id === StarknetChainId.MAINNET;
};

export const isTestnetChainId = (id) => {
  return id === StarknetChainId.TESTNET;
};

export const isStagingChainId = (id) => {
  return [StarknetChainId.MAINNET, StarknetChainId.TESTNET].includes(id);
};

export const NETWORK_CHAIN_ID = 1;
export const argentX = new InjectedConnector({ options: { id: "argentX" } });
export const braavosWallet = new InjectedConnector({
  options: { id: "braavos" },
});

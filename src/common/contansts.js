import { argentX, braavosWallet } from './connectors/index.ts';
import argentXIcon from '../resources/icons/argentx.svg';
import braavosIcon from '../resources/icons/braavos.svg';

const zeroAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';

export {
  zeroAddress,
};

export const NetworkContextName = 'NETWORK';

export const testnetContractAddress = '0x0735c7eb714a1d67559a3acbee637462223f9f4dfa5d45cbe142c06e57255d1c';

export const mainnetContractAddress = '0x05b01e344f902b5fe42a996e8d0c1d19f17405573a90b050ca73823a2ffef3cb';

export const SUPPORTED_WALLETS = {
  ArgentX: {
    connector: argentX,
    name: 'Argent-X',
    icon: argentXIcon,
    description: 'Starknet Browser Wallet',
    href: null,
    color: '#FF875B',
  },
  Braavos: {
    connector: braavosWallet,
    name: 'Braavos',
    icon: braavosIcon,
    description: 'Braavos Wallet for Starknet',
    href: null,
    color: '#E0B137',
    size: 30,
  },
};

export const STARKSCAN_PREFIXES = {
  1: '',
  3: 'testnet.',
  4: 'testnet.',
  5: 'testnet.',
  42: 'testnet.',
};

export const guildTypesLookup = {
  all: 'all',
  design: 'design',
  development: 'development',
  growth: 'growth',
  problemSolving: 'problemSolving',
  communityManagement: 'communityManagement',
  contentWriting: 'contentWriting',
};

export const guildNamesLookup = {
  [guildTypesLookup.all]: 'Global',
  [guildTypesLookup.design]: 'Design',
  [guildTypesLookup.development]: 'Development',
  [guildTypesLookup.growth]: 'Growth',
  [guildTypesLookup.problemSolving]: 'Problem Solving',
  [guildTypesLookup.communityManagement]: 'Community Management',
  [guildTypesLookup.contentWriting]: 'Content Writing',
};

export const eventsLookup = {
  openWalletModal: 'openWalletModal',
};

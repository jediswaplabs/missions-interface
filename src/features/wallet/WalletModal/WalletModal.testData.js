import argentXIcon from '../../../resources/icons/argentx.svg';
import braavosIcon from '../../../resources/icons/braavos.svg';

const supportedWallets = {
  ArgentX: {
    connector: null,
    name: 'Argent-X',
    icon: argentXIcon,
    description: 'Starknet Browser Wallet',
    href: null,
    color: '#FF875B',
  },
  Braavos: {
    connector: null,
    name: 'Braavos',
    icon: braavosIcon,
    description: 'Braavos Wallet for Starknet',
    href: null,
    color: '#E0B137',
    size: 30,
  },
};

export {
  supportedWallets,
};

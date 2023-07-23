import { STARKSCAN_PREFIXES } from './contansts';

export function getStarkscanLink(chainId, data, type) {
  const prefix = `https://${STARKSCAN_PREFIXES[chainId] || STARKSCAN_PREFIXES[1]}starkscan.co`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'contract':
    default: {
      return `${prefix}/contract/${data}`;
    }
  }
}

import { getChecksumAddress } from 'starknet';

// export const zeroStarknetAddress = validateAndParseAddress();

export const isStarknetAddress = (address = '', validateLength = false) => {
  if (!address) {
    return false;
  }
  const firstPart = address.substring(0, 6);
  const secondPart = address.substring(address.length - 4, address.length);

  return (`${firstPart}...${secondPart}`).toLowerCase();
};

export const getShortenAddress = (address = '', charsWithout0X = 4) => {
  const parsed = (address);
  if (!parsed) { return address; }
  return `${parsed.substring(0, charsWithout0X + 2)}...${parsed.substring(63 - charsWithout0X)}`;
};

export const areEqualAddresses = (a = '', b = '') => {
  if (!(isStarknetAddress(a) && isStarknetAddress(b))) { return false; }
  return (getChecksumAddress(a) === getChecksumAddress(b));
};

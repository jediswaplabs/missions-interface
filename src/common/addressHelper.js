import { validateAndParseAddress, getChecksumAddress } from 'starknet';

export const zeroStarknetAddress = validateAndParseAddress();

export const isStarknetAddress = (address = '', validateLength = false) => {
  if (!address) {
    return false;
  }
  const processedValue = address.toLowerCase();
  try {
    if (!processedValue.startsWith('0x')) {
      return false;
    }
    if (validateLength && processedValue.length !== zeroStarknetAddress.length) {
      return false;
    }
    return validateAndParseAddress(processedValue);
  } catch {
    return false;
  }
};

export const getShortenAddress = (address = '', charsWithout0X = 4) => {
  const parsed = isStarknetAddress(address);
  if (!parsed) { return address; }
  return `${parsed.substring(0, charsWithout0X + 2)}...${parsed.substring(63 - charsWithout0X)}`;
};

export const areEqualAddresses = (a = '', b = '') => {
  if (!(isStarknetAddress(a) && isStarknetAddress(b))) { return false; }
  return (getChecksumAddress(a) === getChecksumAddress(b));
};

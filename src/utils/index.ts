import { validateAndParseAddress, Abi, Contract, AccountInterface } from 'starknet'
import { ZERO_ADDRESS } from '../constants'
import isZero from './isZero'
import { InjectedConnector } from '@starknet-react/core'

import {Buffer} from 'buffer'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(addr){
  try {
    if (addr && !isZero(addr)) {
      return validateAndParseAddress(addr)
    }
    return false
  } catch {
    return false
  }
}


// account is optional
// export function getProviderOrSigner(
//   library: Provider,
//   connector?: AbstractConnector,
//   account?: string
// ): Provider | SignerInterface | undefined {
//   return account && connector ? connector.getSigner() : library
// }

// account is optional
export function getContract(
  address,
  ABI,
  library,
) {
  const parsedAddress = isAddress(address)

  if (!parsedAddress || parsedAddress === ZERO_ADDRESS) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  // const providerOrSigner = getProviderOrSigner(library, connector, account)

  return new Contract(ABI, address, library)
}

export function feltArrToStr(felts){
  return felts.reduce(
    (memo, felt) => memo + Buffer.from(felt.toString(16), "hex").toString(),
    ""
  );
}


  export function strToFeltArr(str){
    const size = Math.ceil(str.length / 31);
    const arr = Array(size);
  
    let offset = 0;
    for (let i = 0; i < size; i++) {
      const substr = str.substring(offset, offset + 31).split("");
      const ss = substr.reduce(
        (memo, c) => memo + c.charCodeAt(0).toString(16),
        ""
      );
      arr[i] = BigInt("0x" + ss).toString();
      offset += 31;
    }
    return arr;
  }



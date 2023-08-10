import { validateAndParseAddress, Abi, Contract, AccountInterface } from 'starknet'
import { ZERO_ADDRESS } from '../constants'
import isZero from './isZero'
import { InjectedConnector } from '@starknet-react/core'

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


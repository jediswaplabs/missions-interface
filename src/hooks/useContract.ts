import { useMemo } from 'react'

import { getContract } from '../utils'
import NFTContest_ABI from '../constants/abis/nft-contest.json'
import { useAccountDetails } from './index'

// returns null on errors
function useContract(address, ABI) {
  const { connector } = useAccountDetails()
  const { account, chainId } = useAccountDetails()
  return useMemo(() => {
    if (!address || !ABI || !account) return null

    try {
      const contract = getContract(address, ABI, account, connector ) //line 26
      return contract
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, account, connector, chainId])
}

export function useTokenContract(tokenAddress){
  return useContract(tokenAddress, NFTContest_ABI)
}

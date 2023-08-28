import { config } from '../../config';

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'x-api-key': 'zSKSBBpoGL1D1ocmfIIEd4OZck7KZTaN9dbmcXDX' },
};

const api = {

  fetchData: async (address, chainId) => {
    try {
      const configResponse = config(chainId);
      const response = await fetch(`${configResponse.profilePageAPI}?contract_address=${configResponse.contractAddress}&owner_address=${address}`, options);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('An error occurred while fetching data');
    }
  },
};

export default api;

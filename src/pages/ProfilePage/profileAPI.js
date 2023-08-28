import { testnetContractAddress } from '../../common/constants';

const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'x-api-key': 'GjhopFFeeF5GM9egesqoTNzmwHUTReQ4ZgZD3RKe' },
};

const api = {

  fetchData: async (address) => {
    try {
      const response = await fetch(`https://api-testnet.starkscan.co/api/v0/nfts?contract_address=${testnetContractAddress}&owner_address=${address}`, options);
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

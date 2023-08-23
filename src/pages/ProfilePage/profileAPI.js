const options = {
  method: 'GET',
  headers: { accept: 'application/json', 'x-api-key': 'GjhopFFeeF5GM9egesqoTNzmwHUTReQ4ZgZD3RKe' },
};

const api = {

  fetchData: async (address) => {
    try {
      const response = await fetch(`https://api-testnet.starkscan.co/api/v0/nfts?contract_address=0x06c4f71c1c4a14bba747b4d18dfb73b486aa2ba921dd0de4f64dc415536b8ba6&owner_address=${address}`, options);
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

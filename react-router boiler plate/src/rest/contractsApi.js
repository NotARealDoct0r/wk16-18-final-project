// API provided from class
const CONTRACTS_ENDPOINT = "https://ancient-taiga-31359.herokuapp.com/api/houses";

class ContractsApi {
  // async function
  get = async () => {
    try {
      // resp = response & data => turned into json
      const resp = await fetch(CONTRACTS_ENDPOINT);
      // await = perform one at a time   
      const data = await resp.json();
      return data;
    } catch(e) {
        console.log('Oops, looks like fetchContracts had an issue', e); 
    }
  }

  put = async (contract) => {
    // try & catch is in place to be able to accomodate a potential error
    try{
        const resp = await fetch(`${CONTRACTS_ENDPOINT}/${contract._id}`, {
            // put = update
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // convert to a string
            body: JSON.stringify(contract)
        });
        return await resp.json();
    } catch(e) {
        console.log('Oops, looks like updating contracts had an issue', e);
    }
  }  
}

export const contractsApi = new ContractsApi();
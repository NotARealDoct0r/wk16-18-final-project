// importing React + 2 components
import React from 'react';
import { Contract } from './Contract.js';
import { contractsApi } from '../rest/contractsApi.js';

export class ContractsList extends React.Component {
    // var state = new array ('contracts')
    state = {
        contracts: []
    };

    // method to call request
    componentDidMount() {
        this.fetchContracts();
    }

    // defining the method - using async function to call the 'get' method (read Contracts' states)
    fetchContracts = async () => {
        const contracts = await contractsApi.get();
        // values that come back from the API
        this.setState({contracts});
    };

    // calls the 'put' method on the 'ContractsApi'(to call the HTTP request to update)
    updateContract = async (updatedContract) => {
        await contractsApi.put(updatedContract);
        this.fetchContracts();
    };

    render() {
        return (
            <div> 
            {/* mapping each contracts  */}
                {this.state.contracts.map((contract) => (
                    <Contract 
                        contract={contract}
                        key={contract._id}
                        updateContract={this.updateContract}
                        />
                ))}
            </div>
        )
    }
}
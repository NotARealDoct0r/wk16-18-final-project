// importing react + component
import React, { Component } from 'react';
// importing ContractsList from the contractslist.js file
import { ContractsList } from './ContractsList';

// rendering the 'ContractsList'
class RefactorApp extends Component {
    render() {
        return (
            <div>
                <ContractsList />
            </div>
        )
    }
}

export default RefactorApp;
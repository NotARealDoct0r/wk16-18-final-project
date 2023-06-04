// importing react + a component
import React from "react";
import { NewBillForm } from './NewBillForm';

export const Contract = (props) => {
    // deconstructing the props to get 'contract' + 'updateContract' 
    const { contract, updateContract } = props;

    // method to delete a specific 'room' (tried to update the code below to appropriately name variables to 
    // 'Contract' but substituting kept causing errors. could not figure it out)
    const deleteRoom = (roomId) => {
        const updatedContract = {
            // spread operator 
            ...contract,
            // keep all the values from contract except the room that is being targeted w/ 'roomId'
            rooms: contract.rooms.filter((x) => x._id !== roomId)
        };
        updateContract(updatedContract);
    }

    // method to add a new room (by updating the contract)
    const addNewBill = (room) => updateContract({ ...contract, rooms: [...contract.rooms, room]});
        // new array that takes all values from old array and adding a new room to it
    
    // function to pass in the props below (under 'return')
    const rooms = () => (
        <ul>
            {contract.rooms.map((room, index) => (
                <li key={index}>
                    <label>{`${room.name} Area: ${room.area}`}</label>
                    <button onClick={(e) => deleteRoom(room._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );

    // returning a header + calling the 'rooms' variable + newbillform component
    return (
        <div>
            <h1>{contract.name}</h1>
            {
                rooms({ rooms, contractId: contract._id, deleteRoom})
            }
            <NewBillForm addNewBill={addNewBill} />
        </div>
    )

};
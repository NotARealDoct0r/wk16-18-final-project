import React, {useState} from "react";

export const NewBillForm = (props) => {
    // using hooks 
    const [name, setName] = useState('');
    const [area, setArea] = useState(undefined);

    // to be able to verify that user is inputting a # (round to the 10th)
    const handleAreaInput = (e) => {
        const int =parseInt(e.target.value, 10);
        // as long as int >= 0, pass it in, otherwise pass in an empty string
        setArea(int >= 0 ? int : '');
    }

    // defining what happens upon 'event' / submit
    const onSubmit = (e) => {
        // prevent default 
        e.preventDefault();
        // if name + area are true, pass in objects 'name' + 'area'
        if (name && area) {
            props.addNewBill({name, area});
            setName('');
            setArea('');
        } else {
            console.log('invalid input');
        }
    };

    return (
        <div>
            {/* a styled heading / title + a submit input */}
            <h4 style={{color: 'white', fontWeight: 'bold'}}>Create New Power + Gas Single Bill</h4>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Address / Location"
                    // onChange = upon an 'event' occurrence, update the targeted 'Name' (value)
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="number"
                    placeholder="Price Estimate"
                    onChange={handleAreaInput}
                    value={area}
                />
                <button type="submit">Create Bill</button>
            </form>
        </div>
    )
};
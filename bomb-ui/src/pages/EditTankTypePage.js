import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]


export const EditTankTypePage = ({ tankTypeToEdit }) => {
    const [tankTypeName, setTankTypeName] = useState(tankTypeToEdit.tankTypeName);
    const history = useHistory();

    const editTankType = async () => {
        // Data validation
        if (!tankTypeName) return alert("Pleaase enter a tank type!")

        const editedTankType = { tankTypeName };
        console.log(editedTankType)
        const response = await fetch(`/TankTypes/${tankTypeToEdit.tankTypeID}`, {
            method: 'PUT',
            body: JSON.stringify(editedTankType),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the tankType!");
        } else {
            alert(`Failed to edit tankType, status code = ${response.status}`);
        }
        history.push("/TankTypes")
    };

    const onCancel = async () => {
        history.push("/TankTypes");
    };

    return (
        <>
            <h2>Edit the TankType</h2>
            <table id="newTankType">
                <thead>
                    <tr>
                        <th>Tank Type Name</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="text"
                            value={tankTypeName}
                            placeholder="name of tankType"
                            onChange={e => setTankTypeName(e.target.value)} />
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={editTankType}> Save </button></div>
            </div>
        </>

    );
}

export default EditTankTypePage;
import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SelectUnits from '../components/unitSelection';


// export const CreateTankTypePage = ({ tankTypeToRepeat }) => {
export const CreateTankTypePage = () => {
    // console.log(tankTypeToRepeat);
    // let repeatTankType = Object.keys(tankTypeToRepeat).length !== 0;
    // console.log(repeatTankType)
    // let today = new Date();
    // let mm = String(today.getMonth() + 1);
    // if (mm.length == 1){
    // mm = "0" + mm
    // }
    // let dd = String(today.getDate());
    // if (dd.length == 1){
    // dd = "0" + dd
    // }
    // let yy = String(today.getFullYear()).slice(2);
    // let fToday = mm + "-" + dd + "-" + yy;

    const [tankTypeName, setTankTypeName] = useState();
    // const [tankTypeName, setTankTypeName] = useState(repeatTankType ? tankTypeToRepeat.name : '');
    // const [reps, setReps] = useState(repeatTankType ? tankTypeToRepeat.reps : '');
    // const [weight, setWeight] = useState(repeatTankType ? tankTypeToRepeat.weight : '');
    // const [unit, setUnit] = useState(repeatTankType ? tankTypeToRepeat.unit : '');
    // const [date, setDate] = useState(repeatTankType ? fToday : '');

    const history = useHistory();

    const addTankType = async () => {
        // Data validation
        if (!tankTypeName) return alert("Pleaase enter a tank type!")

        const newTankType = { tankTypeName };
        console.log(newTankType)
        const response = await fetch('/tankTypes', {
            method: 'POST',
            body: JSON.stringify(newTankType),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the tankType.");
        } else {
            alert(`Failed to add tankType, status code = ${response.status}`);
        }
        history.push("/tankTypes");
    };

    const onCancel = async () => {
        history.push("/tankTypes");
    };

    return (
        <>
            <h2>Add a Type of Tank</h2>
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
                            onChange={e => setTankTypeName(e.target.value)}
                            required />
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={addTankType}>Create</button></div>
            </div>
        </>
    );
}

export default CreateTankTypePage;
import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SelectUnits from '../components/unitSelection';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]

// export const CreateMaterialPage = ({ materialToRepeat }) => {
export const CreateMaterialPage = () => {
    // console.log(materialToRepeat);
    // let repeatMaterial = Object.keys(materialToRepeat).length !== 0;
    // console.log(repeatMaterial)

    const [materialName, setMaterialName] = useState();

    const history = useHistory();

    const addMaterial = async () => {
        // Data validation
        // Ensure material name exists
        if (!materialName) return alert("Please enter a material name.");

        const newMaterial = { materialName };
        console.log(newMaterial)
        const response = await fetch('/materials', {
            method: 'POST',
            body: JSON.stringify(newMaterial),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the material.");
        } else {
            alert(`Failed to add material, status code = ${response.status}`);
        }
        history.push("/materials");
    };

    const onCancel = async () => {
        history.push("/materials");
    };

    return (
        <>
            <h2>Add a Material</h2>
            <table id="newMaterial">
                <thead>
                    <tr>
                        <th>Material Name</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="text"
                            value={materialName}
                            placeholder="name of material"
                            onChange={e => setMaterialName(e.target.value)} />
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={addMaterial}>Create</button></div>
            </div>
        </>
    );
}

export default CreateMaterialPage;
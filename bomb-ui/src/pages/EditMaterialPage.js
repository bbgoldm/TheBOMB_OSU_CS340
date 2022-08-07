import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]


export const EditMaterialPage = ({ materialToEdit }) => {
    const [materialName, setMaterialName] = useState(materialToEdit.materialName);
    const history = useHistory();

    const editMaterial = async () => {
        // Data validation
        // Ensure material name exists
        if (!materialName) return alert("Please enter a material name.");

        const editedMaterial = { materialName };
        console.log(editedMaterial)
        const response = await fetch(`/materials/${materialToEdit.materialID}`, {
            method: 'PUT',
            body: JSON.stringify(editedMaterial),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the material!");
        } else {
            alert(`Failed to edit material, status code = ${response.status}`);
        }
        history.push("/Materials")
    };

    const onCancel = async () => {
        history.push("/Materials");
    };

    return (
        <>
            <h2>Edit the Material</h2>
            <table id="newMaterial">
                <thead>
                    <tr>
                        <th>Material Name</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input style={{ width: '370px' }}
                            type="text"
                            value={materialName}
                            placeholder="name of material"
                            onChange={e => setMaterialName(e.target.value)} />
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={editMaterial}> Save </button></div>
            </div>
        </>

    );
}

export default EditMaterialPage;
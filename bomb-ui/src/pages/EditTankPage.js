import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]


export const EditTankPage = ({ tankToEdit }) => {
    const [tankName, setTankName] = useState(tankToEdit.tankName.slice(1));
    const [tankTypeID, setTankTypeID] = useState(tankToEdit.tankTypeID);
    const [pumpableVol, setPumpableVol] = useState(tankToEdit.pumpableVol.replaceAll(',', ''));
    const [capacity, setCapacity] = useState(tankToEdit.capacity.replaceAll(',', ''));  // Need to remove comma in order for valid numeric
    const [srcOrDest, setSrcOrDest] = useState(tankToEdit.srcOrDest);
    const [materialID, setMaterialID] = useState(tankToEdit.materialID);
    const [materials, setMaterials] = useState([]);
    const [tankTypes, setTankTypes] = useState([]);
    const history = useHistory();

    const editTank = async () => {
        // Data validation
        const numPumpableVol = parseFloat(pumpableVol)
        const numCapacity = parseFloat(capacity)

        // Check if tank number exists
        if (tankName.length < 1) return alert("Please enter a tank number")

        // Check if numbers are >= 0
        const validNums = numPumpableVol > 0 && numCapacity > 0;
        if (!validNums) return alert("Please ensure pumpable volume and capacity are > 0.");

        // Check capacity is greater than pumpable volume
        if (numCapacity <= numPumpableVol) return alert("Please ensure capacity is > pumpable volume.");

        const editedTank = { tankName: 'T' + tankName, tankTypeID, pumpableVol, capacity, srcOrDest, materialID };
        console.log(editedTank)
        const response = await fetch(`/Tanks/${tankToEdit.tankID}`, {
            method: 'PUT',
            body: JSON.stringify(editedTank),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the tank!");
        } else {
            alert(`Failed to edit tank, status code = ${response.status}`);
        }
        history.push("/Tanks")
    };

    const onCancel = async () => {
        history.push("/Tanks");
    };

    // Function will call the endpoint
    const loadMaterials = async () => {
        const response = await fetch('/Materials');
        const data = await response.json();  // Returns the body of the response as a json
        // const materialName = data.find(material => material.materialID === materialID)
        setMaterials(data.sort((a, b) => {   // This will sort the array so the item ID passed into edit page is the first array element
            if (a.materialID === materialID) return -1
            return 0
        }))
    }

    // Function will call the endpoint
    const loadTankTypes = async () => {
        const response = await fetch('/TankTypes');
        const data = await response.json();  // Returns the body of the response as a json
        // const materialName = data.find(material => material.materialID === materialID)
        setTankTypes(data.sort((a, b) => {   // This will sort the array so the item ID passed into edit page is the first array element
            if (a.tankTypeID === tankTypeID) return -1
            return 0
        }))
    }

    // Call loadTests when page is initialized
    useEffect(() => {
        loadMaterials();
        loadTankTypes();
    }, []);

    return (
        <>
            <h2>Edit the Tank</h2>
            <table id="newTank">
                <thead>
                    <tr>
                        <th>Tank Number</th>
                        <th>Tank Type</th>
                        <th>Pumpable Volume</th>
                        <th>Capacity</th>
                        <th>Material</th>
                        <th>Src/Dest</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="text"
                            value={tankName}
                            placeholder="(i.e. 123b)"
                            onChange={e => {
                                if (!isNaN(Number(e.target.value)) || e.target.value.length === 0) setTankName(e.target.value)
                                // if (/^\d*(?:[a-zA-Z])?$/.test(e.target.value)) setTankName(e.target.value)
                            }} />
                    </td>
                    <td>
                        <select
                            onChange={e => setTankTypeID(e.target.value)} >
                            {tankTypes.map((tankType, index) => <option key={index} value={tankType.tankTypeID}>{tankType.tankTypeName}</option>)}
                        </select>
                    </td>
                    <td>
                        <input
                            type="number"
                            value={pumpableVol}
                            placeholder="pumpable volume"
                            onChange={e => setPumpableVol(e.target.value)} />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={capacity}
                            placeholder="capacity"
                            onChange={e => setCapacity(e.target.value)} />
                    </td>
                    <td>
                        <select
                            onChange={e => setMaterialID(e.target.value)} >
                            {materials.map((material, index) => <option key={index} value={material.materialID}>{material.materialName}</option>)}
                        </select>
                    </td>
                    <td>
                        <select onChange={e => setSrcOrDest(e.target.value)} >
                            <option value="source">source</option>
                            <option value="destination">destination</option>
                        </select>
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={editTank}> Save </button></div>
            </div>
        </>

    );
}

export default EditTankPage;
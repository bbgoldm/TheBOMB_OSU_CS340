import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SelectUnits from '../components/unitSelection';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]

// export const CreateTankPage = ({ tankToRepeat }) => {
export const CreateTankPage = () => {
    // console.log(tankToRepeat);
    // let repeatTank = Object.keys(tankToRepeat).length !== 0;
    // console.log(repeatTank)
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

    const [tankName, setTankName] = useState('');
    const [tankTypeID, setTankTypeID] = useState([]);
    const [pumpableVol, setPumpableVol] = useState();
    const [capacity, setCapacity] = useState();
    const [srcOrDest, setSrcOrDest] = useState(['source']);
    const [materialID, setMaterialID] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [tankTypes, setTankTypes] = useState([]);
    const history = useHistory();

    const addTank = async () => {
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

        const newTank = { tankName: 'T' + tankName, tankTypeID, pumpableVol, capacity, srcOrDest, materialID };
        // const newTank = { tankName, tankTypeID, pumpableVol, capacity, srcOrDest, materialID };
        console.log(newTank)
        const response = await fetch('/Tanks', {
            method: 'POST',
            body: JSON.stringify(newTank),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the tank.");
        } else {
            alert(`Failed to add tank, status code = ${response.status}`);
        }
        history.push("/tanks");
    };

    const onCancel = async () => {
        history.push("/tanks");
    };

    // Function will call the endpoint
    const loadMaterials = async () => {
        const response = await fetch('/Materials');
        const data = await response.json();  // Returns the body of the response as a json
        const sortedMaterials = data.sort((a, b) => {   // This will sort the array so the item ID passed into edit page is the first array element
            if (a.materialID === materialID) return -1
            return 0
        })
        // const materialName = data.find(material => material.materialID === materialID)
        setMaterials(sortedMaterials)
        setMaterialID(sortedMaterials[0]?.materialID)  // materialID will only get set if [0] is defined
    }

    // Function will call the endpoint
    const loadTankTypes = async () => {
        const response = await fetch('/TankTypes');
        const data = await response.json();  // Returns the body of the response as a json
        const sortedTankTypes = data.sort((a, b) => {   // This will sort the array so the item ID passed into edit page is the first array element
            if (a.tankTypeID === tankTypeID) return -1
            return 0
        })
        // const materialName = data.find(material => material.materialID === materialID)
        setTankTypes(sortedTankTypes);
        setTankTypeID(sortedTankTypes[0]?.tankTypeID);
    }

    // Call loadTests when page is initialized
    useEffect(() => {
        loadMaterials();
        loadTankTypes();
    }, []);

    return (
        <>
            <h2>Add a Tank</h2>
            <table id="newTank">
                <thead>
                    <tr>
                        <th>Tank Number</th>
                        <th>Tank Type</th>
                        <th>Pumpable Volume</th>
                        <th>Capacity</th>
                        <th>Material Name</th>
                        <th>Src/Dest</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="text"
                            value={tankName}
                            placeholder="(i.e. 123)"
                            onChange={e => {
                                if (!isNaN(Number(e.target.value)) || e.target.value.length === 0) setTankName(e.target.value)
                                //if (/^\d+(?:[a-zA-Z])?$/.test(e.target.value)) setTankName(e.target.value)
                            }} />
                    </td>
                    {/* <td>
                    <input
                        type="number"
                        value={tankTypeID}
                        placeholder="tank type ID"
                        onChange={e => setTankTypeID(e.target.value)} />
                </td> */}
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
                    {/* <td>
                    <input
                        type="text"
                        value={srcOrDest}
                        placeholder="source/destination"
                        onChange={e => setSrcOrDest(e.target.value)} />
                </td> */}
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
                <div className='flex-right'><button onClick={addTank}>Create</button></div>
            </div>
        </>
    );
}

export default CreateTankPage;
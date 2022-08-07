import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SelectUnits from '../components/unitSelection';
import Specification from '../components/Specification';


// export const EditSpecificationPage = ({ specificationToRepeat }) => {
export const EditSpecificationPage = ({ specificationToEdit }) => {
    // console.log(specificationToRepeat);
    // let repeatSpecification = Object.keys(specificationToRepeat).length !== 0;
    // console.log(repeatSpecification)
    const [maxLimit, setMaxLimit] = useState(specificationToEdit.maxLimit);
    const [minLimit, setMinLimit] = useState(specificationToEdit.minLimit);
    const [testID, setTestID] = useState(specificationToEdit.testID);
    const [materialID, setMaterialID] = useState(specificationToEdit.materialID);
    const history = useHistory();
    const [tests, setTests] = useState([]);
    const [materials, setMaterials] = useState([]);

    const editSpecification = async () => {
        // Data validation
        // Ensure min and max limits are not undefined and have a value
        if (!maxLimit || !minLimit) return alert("Please enter min and max limits")

        // Ensure max limit is greater than min limit
        if (parseInt(maxLimit) < parseInt(minLimit)) return alert("Please ensure max limit is greater than min limit")

        const editedSpecification = { maxLimit, minLimit, testID, materialID };
        console.log(editedSpecification)
        const response = await fetch(`/specifications/${specificationToEdit.specificationID}`, {
            method: 'PUT',
            body: JSON.stringify(editedSpecification),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the specification.");
        } else {
            alert(`Failed to edit specification, status code = ${response.status}`);
        }
        history.push("/specifications");
    };

    const onCancel = async () => {
        history.push("/specifications");
    };

    // Function will call the endpoint
    const loadTests = async () => {
        const response = await fetch('/Tests');
        const data = await response.json();  // Returns the body of the response as a json
        // setTests(data); // If we want the react framework to know that we've updated a variable then we have to update useState
        setTests(data.sort((a, b) => {  // This will sort the array so the item ID passed into edit page is the first array element
            if (a.testID === testID) return -1
            return 0
        }))
    }

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

    // Call loadTests when page is initialized
    useEffect(() => {
        loadTests();
        loadMaterials();
    }, []);


    console.log(materials)
    return (
        <>
            <h2>Edit a Specification</h2>
            <table id="newSpecification">
                <thead>
                    <tr>
                        <th>Max Limit</th>
                        <th>Min Limit</th>
                        <th>Test</th>
                        <th>Material</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="number"
                            value={maxLimit}
                            placeholder="max limit"
                            onChange={e => setMaxLimit(e.target.value)} />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={minLimit}
                            placeholder="min limit"
                            onChange={e => setMinLimit(e.target.value)} />
                    </td>
                    <td>
                        <select onChange={e => setTestID(e.target.value)} >
                            {tests.map((test, index) => <option key={index} value={test.testID}>{test.testName}</option>)}
                        </select>
                    </td>
                    <td>
                        <select
                            onChange={e => setMaterialID(e.target.value)} >
                            {materials.map((material, index) => <option key={index} value={material.materialID}>{material.materialName}</option>)}
                        </select>
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={editSpecification}>Save</button></div>
            </div>
        </>
    );
}

export default EditSpecificationPage;
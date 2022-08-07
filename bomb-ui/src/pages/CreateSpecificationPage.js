import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SelectUnits from '../components/unitSelection';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]

// export const CreateSpecificationPage = ({ specificationToRepeat }) => {
export const CreateSpecificationPage = () => {
    // console.log(specificationToRepeat);
    // let repeatSpecification = Object.keys(specificationToRepeat).length !== 0;
    // console.log(repeatSpecification)
    const [maxLimit, setMaxLimit] = useState();
    const [minLimit, setMinLimit] = useState();
    const [testID, setTestID] = useState([]);
    const [materialID, setMaterialID] = useState([]);
    const [tests, setTests] = useState([]);
    const [materials, setMaterials] = useState([]);

    const history = useHistory();

    const addSpecification = async () => {
        // Data validation
        // Ensure min and max limits are not undefined and have a value.
        if (!maxLimit || !minLimit) return alert("Please enter min and max limits")

        // Ensure max limit is greater than min limit
        if (parseInt(maxLimit) < parseInt(minLimit)) return alert("Please ensure max limit is greater than min limit")


        const newSpecification = { maxLimit, minLimit, testID, materialID };
        console.log(newSpecification)
        const response = await fetch('/specifications', {
            method: 'POST',
            body: JSON.stringify(newSpecification),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the specification.");
        } else {
            alert(`Failed to add specification, status code = ${response.status}`);
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
        setTests(data); // If we want the react framework to know that we've updated a variable then we have to update useState
        setTestID(data[0]?.testID)
    }

    // Function will call the endpoint
    const loadMaterials = async () => {
        const response = await fetch('/Materials');
        const data = await response.json();  // Returns the body of the response as a json
        setMaterials(data); // If we want the react framework to know that we've updated a variable then we have to update useState
        setMaterialID(data[0]?.materialID)
    }

    // Call loadTests when page is initialized
    useEffect(() => {
        loadTests();
        loadMaterials();
    }, []);


    // Code isn't necessary but didn't delete, just in case
    //const handleChange = event => {
    //    console.log('Label 👉️', event.target.selectedOptions[0].label);
    //    console.log(event.target.value);
    //    setTestID(event.target.value);
    //  };


    return (
        <>
            <h2>Add a Specification</h2>
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
                        <select onChange={e => setMaterialID(e.target.value)} >
                            {materials.map((material, index) => <option key={index} value={material.materialID}>{material.materialName}</option>)}
                        </select>
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={addSpecification}>Create</button></div>
            </div>
        </>
    );
}

export default CreateSpecificationPage;
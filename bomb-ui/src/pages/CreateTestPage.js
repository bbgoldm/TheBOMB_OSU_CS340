import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SelectUnits from '../components/unitSelection';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]

// export const CreateTestPage = ({ testToRepeat }) => {
export const CreateTestPage = () => {
    // console.log(testToRepeat);
    // let repeatTest = Object.keys(testToRepeat).length !== 0;
    // console.log(repeatTest)
    const [testNumber, setTestNumber] = useState('');
    const [testName, setTestName] = useState();
    const [testDescription, setTestDescription] = useState();

    const history = useHistory();

    const addTest = async () => {
        // Data validation
        // Check if test number exists
        if (!testNumber) return alert("Please enter a test number")

        // Check if names and descriptions exist
        if (!testName || !testDescription) return alert("Please enter a test name and test description");

        const newTest = { testNumber: 'D' + testNumber, testName, testDescription };
        console.log(newTest)
        const response = await fetch('/tests', {
            method: 'POST',
            body: JSON.stringify(newTest),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the test.");
        } else {
            alert(`Failed to add test, status code = ${response.status}`);
        }
        history.push("/tests");
    };

    const onCancel = async () => {
        history.push("/tests");
    };

    return (
        <>
            <h2>Add a Test</h2>
            <table id="newTest">
                <thead>
                    <tr>
                        <th>Test Number</th>
                        <th>Test Name</th>
                        <th>Test Description</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="text"
                            value={testNumber}
                            placeholder="i.e. 123"
                            onChange={e => {
                                if (!isNaN(Number(e.target.value)) || e.target.value.length === 0) setTestNumber(e.target.value)
                            }} />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={testName}
                            placeholder="name of test"
                            onChange={e => setTestName(e.target.value)} />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={testDescription}
                            placeholder="description of test"
                            onChange={e => setTestDescription(e.target.value)} />
                    </td>
                </tbody>
            </table>

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={addTest}>Create</button></div>
            </div>
        </>
    );
}

export default CreateTestPage;
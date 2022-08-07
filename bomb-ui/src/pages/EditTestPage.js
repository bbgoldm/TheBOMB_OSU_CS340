import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SelectUnits from '../components/unitSelection';

// const options = ['lbs', 'kgs']
// const defaultOption = options[0]

export const EditTestPage = ({ testToEdit }) => {
    const [testNumber, setTestNumber] = useState(testToEdit.testNumber.slice(1));
    const [testName, setTestName] = useState(testToEdit.testName);
    const [testDescription, setTestDescription] = useState(testToEdit.testDescription);

    const history = useHistory();

    const editTest = async () => {
        // Data validation
        // Check if test number exists
        if (!testNumber) return alert("Please enter a test number")

        // Check if names and descriptions exist
        if (!testName || !testDescription) return alert("Please enter a test name and test description");

        const editedTest = { testNumber: 'D' + testNumber, testName, testDescription };
        console.log(editedTest)
        const response = await fetch(`/tests/${testToEdit.testID}`, {
            method: 'PUT',
            body: JSON.stringify(editedTest),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the test.");
        } else {
            alert(`Failed to edit test, status code = ${response.status}`);
        }
        history.push("/tests");
    };

    const onCancel = async () => {
        history.push("/tests");
    };

    return (
        <>
            <h2>Edit a Test</h2>
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
                <div className='flex-right'><button onClick={editTest}>Save</button></div>
            </div>
        </>
    );
}

export default EditTestPage;
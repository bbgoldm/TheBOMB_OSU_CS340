import React from 'react';
import { Link } from 'react-router-dom';
import TestList from '../components/TestList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useCollapse from 'react-collapsed';

function TestPage({ setTestToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    const [tests, setTests] = useState([]);
    const history = useHistory();
    const [matchingSpecs, setMatchingSpecs] = useState();
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })


    const onDelete = async (testID) => {
        const table = "Tests";
        const response = await fetch(`/${table}/${testID}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
        if (response.status === 204) {
            alert('The record was deleted.')
            // window.location.reload();
            const newTests = tests.filter(m => m.testID !== testID);
            setTests(newTests);
        } else {
            console.error(`Failed to delete test with testID = ${testID}, status code = ${response.status}`);
        }
    };


    const onEdit = async (test) => {
        // const table = "Tests";
        setTestToEdit(test);
        console.log(`onEdit test has keys: ${Object.keys(test)} and values ${Object.values(test)}`)
        history.push("/edit-test");
    };

    // Function will call the endpoint
    const loadTests = async () => {
        const response = await fetch('/Tests');
        const data = await response.json();  // Returns the body of the response as a json
        setTests(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }
    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect(() => {
        loadTests();
    }, []);

    const handleSetSpecs = async (testID) => {
        const response = await fetch('testInfo(' + testID + ')');
        console.log(`The get response for testInfo is ${response} which we're attempting to convert to JSON`)
        const data = await response.json();  // Returns the body of the response as a json
        setMatchingSpecs(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    console.log('testInfo', matchingSpecs);

    return (
        <>
            <h2>Manage Laboratory Tests for Materials</h2>
            <p>A material can have one or more tests.  Selecting a test number will show the associated materials and limits, if any.</p>
            <Link to="/create-test"><button type="button">Add Test </button></Link>
            <TestList onTestClick={handleSetSpecs} tests={tests} onDelete={onDelete} onEdit={onEdit}></TestList>

            {matchingSpecs?.length ?
                <table>
                    <caption className="tableTitle">Associated Specifications</caption>
                    <thead>
                        <tr>
                            <th>Test and Material Name</th>
                            <th>Test Number</th>
                            <th>Max Limit</th>
                            <th>Min Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchingSpecs.map((spec, i) =>
                            <tr key={i}>
                                <td>{spec.testMaterialNames}</td> {/* Concat data in first object */}
                                <td>{spec.TestNumber}</td>
                                <td>{spec.maxLimit}</td>
                                <td>{spec.minLimit}</td>
                            </tr>)}</tbody></table> : null}
        </>
    );
}

export default TestPage;
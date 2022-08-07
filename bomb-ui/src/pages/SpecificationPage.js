import React from 'react';
import { Link } from 'react-router-dom';
import SpecificationList from '../components/SpecificationList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SpecificationPage({ setSpecificationToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    const [specifications, setSpecifications] = useState([]);
    const history = useHistory();
    const [tests, setTests] = useState([]);
    const [materials, setMaterials] = useState([]);

    const onDelete = async (specificationID) => {
        const table = "Specifications";
        const response = await fetch(`/${table}/${specificationID}`, { method: 'DELETE' });
        if (response.status === 204) {
            alert('The record was deleted.')
            // window.location.reload();
            const newSpecifications = specifications.filter(m => m.specificationID !== specificationID);
            setSpecifications(newSpecifications);
        } else {
            console.error(`Failed to delete specification with specificationID = ${specificationID}, status code = ${response.status}`);
        }
    };

    const onEdit = async (specification) => {
        // const table = "Specifications";
        setSpecificationToEdit(specification);
        console.log(`onEdit specification has keys: ${Object.keys(specification)} and values ${Object.values(specification)}`)
        history.push("/edit-specification");
    };

    // Function will call the endpoint
    const loadSpecifications = async () => {
        const response = await fetch('/Specifications');
        const data = await response.json();  // Returns the body of the response as a json
        setSpecifications(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // Function will call the endpoint
    const loadTests = async () => {
        const response = await fetch('/Tests');
        const data = await response.json();  // Returns the body of the response as a json
        setTests(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // Function will call the endpoint
    const loadMaterials = async () => {
        const response = await fetch('/Materials');
        const data = await response.json();  // Returns the body of the response as a json
        setMaterials(data);
        // console.log(data);
    }

    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect(() => {
        loadSpecifications();
        loadMaterials();
        loadTests();
    }, []);

    console.log('Materials', materials)
    console.log('Tests', tests)

    return (
        <>
            <h2>Manage the M:M Specifications - Associations between Materials and Tests</h2>
            <p>Specifications contain the relationships between materials and tests.  Each specification has a min and max limit.  <br></br>For instance, MOGAS material may have an RVP test that needs to be between 11 and 13 psi.</p>
            <Link to="/create-specification"><button type="button">Add Specification </button></Link>
            <div className="App-table">
                {materials.length && tests.length ? <SpecificationList materials={materials} tests={tests} specifications={specifications} onDelete={onDelete} onEdit={onEdit}></SpecificationList> : null}
                {/* <SpecificationList materials = {materials} tests = {tests} specifications={specifications} onDelete={onDelete} onEdit={onEdit}></SpecificationList> */}
            </div>

        </>
    );
}

export default SpecificationPage;
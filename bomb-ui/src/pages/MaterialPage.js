import React from 'react';
import { Link } from 'react-router-dom';
import MaterialList from '../components/MaterialList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SpecificationList from '../components/SpecificationList';

function MaterialPage({ setMaterialToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    // const [materials, setMaterials] = useState([]);
    const history = useHistory();
    // const [tanks, setTanks] = useState([]);
    // Use state variable instead of declaring each state separately
    // Need to give materials and tanks initial state of an array so when passed to specificationlist they don't show as undefined
    // This is why mataerial and tanks are inside useState()
    const [state, setState] = useState({ materials: [], tanks: [] });

    const onDelete = async (materialID) => {
        const table = "Materials";
        const response = await fetch(`/${table}/${materialID}`, { method: 'DELETE' });
        if (response.status === 204) {
            alert('The record was deleted.')
            // window.location.reload();
            const materials = state.materials.filter(m => m.materialID !== materialID);
            // setMaterials(newMaterials);
            setState(prevState => {
                return { ...prevState, materials }
            }); // If we want the react framework to know that we've updated a variable then we have to update useState

        } else {
            console.error(`Failed to delete material with materialID = ${materialID}, status code = ${response.status}`);
        }
    };

    const onEdit = async (material) => {
        // const table = "Materials";
        setMaterialToEdit(material);
        console.log(`onEdit material has keys: ${Object.keys(material)} and values ${Object.values(material)}`)
        history.push("/edit-material");
    };

    // Function will call the endpoint
    const loadMaterials = async () => {
        const response = await fetch('/materialTankInfo');
        const data = await response.json();  // Returns the body of the response as a json
        setState(prevState => {
            return { ...prevState, materials: data }  // ... puts all existing properties in prevState and then add / change materials with data
        }); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // Loading Tanks to check for FK constraints
    const loadTanks = async () => {
        const response = await fetch('/Tanks');
        const data = await response.json();  // Returns the body of the response as a json
        setState(prevState => {
            return { ...prevState, tanks: data }
        }); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // Loading Specifications to show table when material is clicked
    const loadSpecifications = async () => {
        const response = await fetch('/Specifications');
        const data = await response.json();  // Returns the body of the response as a json
        setState(prevState => {
            return { ...prevState, specifications: data }
        }); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect(() => {
        loadMaterials();
        loadTanks();
        loadSpecifications();
    }, []);

    // Function for displaying Specification table when Material is clicked -- pass function to Material component
    // const handleSetSpecs = (materialID) => {
    //     // prevState is passed in as a variable to the anonymous function
    //     // prevState is a state that contains multiple arrays
    //     // ...prevState takes all prior information and adds or edits matchingSpecs to its state
    //     // matchingSpecs is set via a filter function
    //     // the filter function returns an array
    //     // filter is looking at the prevState.specifications
    //     // prevState.specifications are passed in one by one as variable spec 
    //     setState(prevState => {
    //         return {
    //             ...prevState, matchingSpecs: prevState.specifications.filter(spec =>
    //                 spec.materialID === materialID
    //             )
    //         }
    //     });
    // }
    const handleSetSpecs = async (materialID) => {
        const response = await fetch('materialInfo(' + materialID + ')');
        console.log(`The get response for materialInfo is ${response} which we're attempting to convert to JSON`)
        const data = await response.json();  // Returns the body of the response as a json
        setState(prevState => {
            return { ...prevState, matchingSpecs: data }
        }); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    console.log('state', state);
    console.log(state.matchingSpecs)

    // Future would be to add a component for the table so it isn't all shown below.  Import the component
    return (
        <>
            <h2>Manage the Names of Materials</h2>
            <p>Different materials can be stored in tanks.  Material names and which tanks use the materials can be found below.  <br></br> A material can also have one of more tests.  Selecting a material name will show the associated test and limits, if any.<br></br>Certain materials can't be deleted due to constraints.</p>
            <Link to="/create-material"><button type="button">Add Material </button></Link>
            <MaterialList onMatClick={handleSetSpecs} tanks={state.tanks} materials={state.materials} onDelete={onDelete} onEdit={onEdit}></MaterialList>

            {/* ?. = only reads lengths if matchingSpecs is not undefined */}
            {state.matchingSpecs?.length ?
                <table>
                    <caption className="tableTitle">Associated Specifications</caption>
                    <thead>
                        <tr>
                            <th>Material and Test Name</th>
                            <th>Test Number</th>
                            <th>Max Limit</th>
                            <th>Min Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.matchingSpecs.map((spec, i) =>
                            <tr key={i}>
                                <td>{spec.materialTestName}</td> {/* Concat data in first object */}
                                <td>{spec.TestNumber}</td>
                                <td>{spec.maxLimit}</td>
                                <td>{spec.minLimit}</td>
                            </tr>)}</tbody></table> : null}
        </>
    );
}

export default MaterialPage;
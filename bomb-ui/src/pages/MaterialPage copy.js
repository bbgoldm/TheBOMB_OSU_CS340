import React from 'react';
import { Link } from 'react-router-dom';
import MaterialList from '../components/MaterialList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SpecificationList from '../components/SpecificationList';

function MaterialPage({ setMaterialToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    const [materials, setMaterials] = useState([]);
    const history = useHistory();
    const [tanks, setTanks] = useState([]);

    const onDelete = async (materialID) => {
        const table = "Materials";
        const response = await fetch(`/${table}/${materialID}`, {method: 'DELETE'});
        if (response.status === 204){
            alert('The record was deleted.')
            // window.location.reload();
            const newMaterials = materials.filter(m => m.materialID !== materialID);
            setMaterials(newMaterials);
        } else{
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
        const response = await fetch('/Materials');
        const data = await response.json();  // Returns the body of the response as a json
        setMaterials(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // Loading Tanks to check for FK constraints
    const loadTanks = async () => {
        const response = await fetch('/Tanks');
        const data = await response.json();  // Returns the body of the response as a json
        setTanks(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // // Loading Specifications to show table when material is clicked
    // const loadSpecifications = async () => {
    //     const response = await fetch('/Specifications');
    //     const data = await response.json();  // Returns the body of the response as a json
    //     setSpecifications(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    // }
    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect( () => {
        loadMaterials();
        loadTanks();
    }, []);

    return (
        <>
            <h2>Manage the Names of Materials</h2>
            <MaterialList tanks = {tanks} materials={materials} onDelete={onDelete} onEdit={onEdit}></MaterialList>
            <Link to="/create-material"><button type="button">Add Material </button></Link>
        </>
    );
}

export default MaterialPage;
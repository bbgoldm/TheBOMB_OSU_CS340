import React from 'react';
import { Link } from 'react-router-dom';
import TankTypeList from '../components/TankTypeList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TankTypePage({ setTankTypeToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    
    const [tankTypes, setTankTypes] = useState([]);
    const history = useHistory();

    const onDelete = async (tankTypeID) => {
        const table = "TankTypes";
        const response = await fetch(`/${table}/${tankTypeID}`, {method: 'DELETE'});
        // const response = await fetch(`/TankTypes/${tankTypeID}`, {method: 'DELETE'});
        // console.log(`${response.blob()}`);
        // console.log(`The response object keys are ${Object.keys(response)}`);
        // console.log(`The response object is ${response}`);
        // if (response.status === 200 && response.body.affectedRows === 1){
        if (response.status === 204){
        // if (response.affectedRows === 1) {
            alert('The record was deleted.')
            // alert(`The number of affected rows is ${response.body.affectedRows}`);  // undefined
            // alert(`The number of affected rows is ${response.body.json()}`);  // Unhandled Rejection (TypeError): response.body.json is not a function
            // console.log(`The response object keys are ${Object.keys(response.body)}`);
            // console.log(`The response object is ${response}`); //readable stream
            const newTankTypes = tankTypes.filter(m => m.tankTypeID !== tankTypeID);
            setTankTypes(newTankTypes);
            // const newTankTypes = tankTypes.filter(m => m.tankTypeID !== tankTypeID);
            // setTankTypes(newTankTypes);
        } else{
            console.error(`Failed to delete tankType with tankTypeID = ${tankTypeID}, status code = ${response.status}`);
        }
    };

    // const onEdit = async (tankType) => {
    //     setTankTypeToEdit(tankType);
    //     history.push("/edit-tankType");
    // };
    const onEdit = async (tankType) => {
        // const table = "TankTypes";
        setTankTypeToEdit(tankType);
        console.log(`onEdit tankType has keys: ${Object.keys(tankType)} and values ${Object.values(tankType)}`)
        history.push("/edit-tankType");
    };

    // Function will call the endpoint
    const loadTankTypes = async () => {
        // const response = await fetch('/TankTypes');
        const response = await fetch('tankTypesInfo');
        const data = await response.json();  // Returns the body of the response as a json
        setTankTypes(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }
    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect( () => {
        loadTankTypes();
    }, []);

    return (
        <>
            <h2>Manage Tank Types</h2>
            <p>There are many varities of tanks with the best choice determined by the properties of the material stored inside the tank.</p>
            <Link to="/create-tankType"><button type="button">Add Tank Type</button></Link>
            <TankTypeList tankTypes={tankTypes} onDelete={onDelete} onEdit={onEdit}></TankTypeList>
            
        </>
    );
}

export default TankTypePage;
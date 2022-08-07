import React from 'react';
import { Link } from 'react-router-dom';
import LineupList from '../components/LineupList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function LineupPage({ setLineupToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    const [lineups, setLineups] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [tanks, setTanks] = useState([]);
    const history = useHistory();

    const onDelete = async (lineupID) => {
        const table = "Lineups";
        const response = await fetch(`/${table}/${lineupID}`, {method: 'DELETE'});
        if (response.status === 204){
            alert('The record was deleted.')
            // window.location.reload();
            const newLineups = lineups.filter(m => m.lineupID !== lineupID);
            setLineups(newLineups);
        } else{
            console.error(`Failed to delete lineup with lineupID = ${lineupID}, status code = ${response.status}`);
        }
    };


    const onEdit = async (lineup) => {
        // const table = "Lineups";
        setLineupToEdit(lineup);
        console.log(`onEdit lineup has keys: ${Object.keys(lineup)} and values ${Object.values(lineup)}`)
        history.push("/edit-lineup");
    };

    // Function will call the endpoint
    const loadLineups = async () => {
        const response = await fetch('/lineupsInfo');
        const data = await response.json();  // Returns the body of the response as a json
        setLineups(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }
    const loadTasks = async () => {
        const response = await fetch('/Tasks');
        const data = await response.json();  // Returns the body of the response as a json
        setTasks(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }
    const loadTanks = async () => {
        const response = await fetch('/Tanks');
        const data = await response.json();  // Returns the body of the response as a json
        setTanks(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }
    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect( () => {
        loadLineups();
        loadTasks();
        loadTanks();
    }, []);
    
    console.log(`Tasks are ${tasks}`)
    console.log(`Tanks are ${tanks}`)

    return (
        <>
            <h2>Manage the M:M Lineups Table - Associations between Tasks and Tanks</h2>
            <p>Note: It is NOT recommended to use this page to add Lineups.  Use the Tasks page instead.</p>
            <Link to="/create-lineup"><button type="button">Add Lineup </button></Link>
            <div className="App-table">
                {tasks.length && tanks.length ? <LineupList tasks={tasks} tanks={tanks} lineups={lineups} onDelete={onDelete} onEdit={onEdit}></LineupList> : null}
            </div>
            
        </>
    );
}

export default LineupPage;

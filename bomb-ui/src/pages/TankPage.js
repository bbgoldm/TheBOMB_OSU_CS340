import React from 'react';
import { Link } from 'react-router-dom';
import TankList from '../components/TankList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TankPage({ setTankToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    const [tanks, setTanks] = useState([]);
    const history = useHistory();
    const [tasksUsingTank, setTasksUsingTank] = useState()
    const [filterValue, setFilterValue] = useState('')
    const [filteredTanks, setFilteredTanks] = useState([])

    const onDelete = async (tankID) => {
        const table = "Tanks";
        const response = await fetch(`/${table}/${tankID}`, { method: 'DELETE' });
        if (response.status === 204) {
            alert('The record was deleted.')
            // window.location.reload();
            const newTanks = tanks.filter(m => m.tankID !== tankID);
            setTanks(newTanks);
            setFilteredTanks(newTanks);
        } else {
            console.error(`Failed to delete tank with tankID = ${tankID}, status code = ${response.status}`);
        }
    };


    const onEdit = async (tank) => {
        // const table = "Tanks";
        setTankToEdit(tank);
        console.log(`onEdit tank has keys: ${Object.keys(tank)} and values ${Object.values(tank)}`)
        history.push("/edit-tank");
    };

    // Function will call the endpoint
    const loadTanks = async () => {
        const response = await fetch('/tanksInfo');
        console.log(`The get response for loadTanks is ${response} which we're attempting to convert to JSON`)
        const data = await response.json();  // Returns the body of the response as a json
        setTanks(data); // If we want the react framework to know that we've updated a variable then we have to update useState
        setFilteredTanks(data);
    }
    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect(() => {
        loadTanks();
    }, []);

    const handleSetTasks = async (tankID) => {
        const response = await fetch('tasksUsingTank(' + tankID + ')');
        console.log(`The get response for tasksUsingTank is ${response} which we're attempting to convert to JSON`)
        const data = await response.json();  // Returns the body of the response as a json
        setTasksUsingTank(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    // Function is used to filter out tanks based on a search by the user
    const handleFilter = (e) => {
        const filteredTanks = tanks.filter(tank => tank.tankName.includes(e.target.value))
        setFilterValue(e.target.value)
        setFilteredTanks(filteredTanks)
    }


    console.log('tasksUsingTank', tasksUsingTank);


    return (
        <>
            <h2>Manage Details of the Tanks</h2>
            <p>Each tank contains one material and may be involved in one or more tasks.</p>
            <div className='Filter'>
                {/* <label for="tankNameFilter">Filter by Tank Name</label> */}
                <div className='FilterText'>Filter by Tank Names</div>
                <input
                    id="tankNameFilter"
                    type="text"
                    value={filterValue}
                    onChange={handleFilter} // onChange calls the function which passes the event
                />
            </div>
            <Link to="/create-tank"><button type="button">Add Tank </button></Link>

            <TankList onTankClick={handleSetTasks} tanks={filteredTanks} onDelete={onDelete} onEdit={onEdit}></TankList>
            {tasksUsingTank?.length ?
                <table>
                    <caption className="tableTitle">Tasks Using Tank</caption>
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasksUsingTank.map((task, i) =>
                            <tr key={i}>
                                <td>{task.taskID}</td>
                                <td>{task.taskDescription}</td>
                            </tr>)}</tbody></table> : null}
        </>
    );
}

export default TankPage;
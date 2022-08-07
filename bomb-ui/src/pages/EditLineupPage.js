import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import  Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


export const EditLineupPage = ({ lineupToEdit }) => {
    const [taskID, setTaskID] = useState(lineupToEdit.taskID);
    const [tankID, setTankID] = useState(lineupToEdit.tankID);
    const [tanks, setTanks] = useState([]);
    const [tasks, setTasks] = useState([]);

    const history = useHistory();

    const editLineup = async () => {
        const editedLineup = { taskID, tankID };
        console.log(editedLineup)
        const response = await fetch(`/lineups/${lineupToEdit.lineupID}`, {
            method: 'PUT',
            body: JSON.stringify(editedLineup),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the lineup!");
        } else {
            alert(`Failed to edit lineup, status code = ${response.status}`);
        }
        history.push("/Lineups")
    };

    const onCancel = async () => {
        history.push("/Lineups");
    };

    // Function will call the endpoint
    const loadTanks = async () => {
        const response = await fetch('/tanksDropdown');
        const data = await response.json();  
        // setTanks(data);
        setTanks(data.sort((a, b) => {  // This will sort the array so the item ID passed into edit page is the first array element
            if (a.tankID === tankID) return -1
            return 0
        }))
    }

    // Function will call the endpoint
    const loadTasks = async () => {
        const response = await fetch('/tasksDropdown');
        const data = await response.json(); 
        // setTasks(data);
        setTasks(data.sort((a, b) => {  // This will sort the array so the item ID passed into edit page is the first array element
            if (a.taskID === taskID) return -1
            return 0
        }))
    }

    // Call loadTanks when page is initialized
    useEffect(() => {
        loadTanks();
        loadTasks();
    }, []);

    return (
        <>
        <h2>Edit the Lineup</h2>
        <table id="newLineup">
            <thead>
                <tr>
                    <th>Lineup ID</th>
                    <th>Task</th>
                    <th>Tank</th>
                </tr>
            </thead>
            <tbody>
                <td>
                    {lineupToEdit.lineupID}
                </td>
                <td>
                    <select
                        onChange={e => setTaskID(e.target.value)} >
                        {tasks.map((task, index) => <option key={index} value={task.taskID}>{task.taskInfo}</option>)}
                    </select>
                </td>
                <td>
                    <select
                        onChange={e => setTankID(e.target.value)} >
                        {tanks.map((tank, index) => <option key={index} value={tank.tankID}>{tank.tankInfo}</option>)}
                    </select>
                </td>
            </tbody>
        </table>
        
        <div className='createCancel'>
            <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
            <div className='flex-right'><button onClick={editLineup}> Save </button></div>
        </div>
        </>
        
    );
}

export default EditLineupPage;
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import  Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


// export const CreateLineupPage = ({ lineupToRepeat }) => {
export const CreateLineupPage = () => {
    // console.log(lineupToRepeat);
    // let repeatLineup = Object.keys(lineupToRepeat).length !== 0;
    // console.log(repeatLineup)
    const [taskID, setTaskID] = useState([]);
    const [tankID, setTankID] = useState([]);
    const [tanks, setTanks] = useState([]);
    const [tasks, setTasks] = useState([]);
    
    const history = useHistory();

    const addLineup = async () => {
        const newLineup = { taskID, tankID };
        console.log(newLineup)
        const response = await fetch('/lineups', {
            method: 'POST',
            body: JSON.stringify(newLineup),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201){
            alert("Successfully added the lineup.");
        } else {
            alert(`Failed to add lineup, status code = ${response.status}`);
        }
        history.push("/lineups");
    };

    const onCancel = async () => {
        history.push("/lineups");
    };

    // Function will call the endpoint
    const loadTanks = async () => {
        const response = await fetch('/tanksDropdown');
        const data = await response.json(); 
        setTanks(data);
    }

    // Function will call the endpoint
    const loadTasks = async () => {
        const response = await fetch('/tasksDropdown');
        const data = await response.json();  
        setTasks(data);
    }

        // Call loadTanks and loadTasks when page is initialized
        useEffect(() => {
            loadTanks();
            loadTasks();
        }, []);
    

    return (
        <>
        <h2>Add a Lineup</h2>
        <p>Note: It is NOT recommended to use this page to add Lineups.  Use the Tasks page instead.</p>
        <table id="newLineup">
        <thead>
                <tr>
                    <th>Task</th>
                    <th>Tank</th>
                </tr>
            </thead>
            <tbody>
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
            <div className='flex-right'><button onClick={addLineup}>Create</button></div>
        </div>
        </>
    );
}

export default CreateLineupPage;
import React from 'react';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TaskPage({ setTaskToEdit }) {
    // When a variable is within useState and it changes then the React App will re-render the DOM
    const [tasks, setTasks] = useState([]);
    const history = useHistory();
    const [conflictingTasks, setConflictingTasks] = useState()

    const onDelete = async (taskID) => {
        const table = "Tasks";
        const response = await fetch(`/${table}/${taskID}`, {method: 'DELETE'});
        if (response.status === 204){
            alert('The record was deleted.')
            const newTasks = tasks.filter(m => m.taskID !== taskID);
            setTasks(newTasks);
        } else{
            console.error(`Failed to delete task with taskID = ${taskID}, status code = ${response.status}`);
        }
    };


    const onEdit = async (task) => {
        // const table = "Tasks";
        setTaskToEdit(task);
        console.log(`onEdit task has keys: ${Object.keys(task)} and values ${Object.values(task)}`)
        history.push("/edit-task");
    };

    // Function will call the endpoint
    const loadTasks = async () => {
        // const response = await fetch('/Tasks');
        const response = await fetch('/tasksInfo');
        const data = await response.json();  // Returns the body of the response as a json
        setTasks(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }
    // useEffect requires a function (which it calls) and deps? is optional... [] = when component is first mounted
    // useEffect cannot be an async function.  Need to have a function that calls an async function.
    useEffect( () => {
        loadTasks();
    }, []);

    const handleSetConflicts = async (taskID) => {
        const response = await fetch('conflictingTasks(' + taskID + ')');
        console.log(`The get response for conflictingTasks is ${response} which we're attempting to convert to JSON`)
        const data = await response.json();  // Returns the body of the response as a json
        setConflictingTasks(data); // If we want the react framework to know that we've updated a variable then we have to update useState
    }

    console.log('conflictingTasks', conflictingTasks);

    return (
        <>
            <h2>Manage Tasks and Associated Lineups</h2>
            <p>Each task specifies a certain volume of finished product and, together with lineups, specifies which tanks are used.</p>
            <Link to="/create-task"><button type="button">Add Task </button></Link>
            <TaskList onTaskClick={handleSetConflicts} tasks={tasks} onDelete={onDelete} onEdit={onEdit}></TaskList>
            {conflictingTasks?.length ? 
            <table>
                <caption className="tableTitle">Conflicting Tasks</caption>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Description</th>
                    </tr>
                </thead>
            <tbody>
            {conflictingTasks.map((task, i) =>
                <tr key={i}>
                    <td>{task.taskID}</td> 
                    <td>{task.taskDescription}</td>
            </tr>)}</tbody></table> : null}
        </>
    );
}

export default TaskPage;
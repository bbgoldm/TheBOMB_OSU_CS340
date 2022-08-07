import React from 'react';
import Task from './Task';

function TaskList({ tasks, ...rest }) {
    return (
        <table id="tasks">
            <thead>
                <tr>
                    <th>Task ID</th>
                    <th>Task Volume</th>
                    <th>Destination</th>
                    <th>Sources</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, i) => <Task task={task}
                    {...rest}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default TaskList;

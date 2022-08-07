import React from 'react';
import  { MdDeleteForever, MdEdit } from 'react-icons/md';




function Task({ onTaskClick, task, onEdit, onDelete }) {
    return (
        <tr>
            <td className='link' onClick={()=> onTaskClick(task.taskID)}>{task.taskID}</td>
            <td>{task.taskVolume}</td>
            <td>{task.destination}</td>
            <td>{task.sources}</td>
            <td className='icon'>< MdEdit onClick={()=> onEdit(task)} /></td>
            <td className='icon'>< MdDeleteForever onClick={()=> onDelete(task.taskID)}/></td>
        </tr>
    );
}

export default Task;
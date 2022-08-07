import React from 'react';
import  { MdDeleteForever, MdEdit } from 'react-icons/md';




function Lineup({ tanks, tasks, lineup, onEdit, onDelete }) {
    
    const tank = tanks.find(function (tank) {
        return tank.tankID === lineup.tankID
    });
    
    const task = tasks.find(function (task) {
        return task.taskID === lineup.taskID
    });
    
    return (
        <tr>
            <td>{lineup.lineupID}</td>
            <td>{lineup.taskID}</td>
            <td>{lineup.tankID}</td>
            <td>{lineup.tankName}</td>
            <td>{lineup.srcOrDest}</td>
            <td>{lineup.tankDetails}</td>
            <td className='icon'>< MdEdit onClick={()=> onEdit(lineup)} /></td>
            <td className='icon'>< MdDeleteForever onClick={()=> onDelete(lineup.lineupID)}/></td>
        </tr>
    );
}

export default Lineup;

import React from 'react';
import  { MdDeleteForever, MdEdit } from 'react-icons/md';




function TankType({ tankType, onEdit, onDelete }) {
    return (
        <tr>
            <td>{tankType.tankTypeName}</td>
            <td>{tankType.count}</td>
            <td>{tankType.tankNames}</td>
            <td className='icon'>< MdEdit onClick={()=> onEdit(tankType)} /></td>
            <td className='icon'>< MdDeleteForever onClick={()=> onDelete(tankType.tankTypeID)}/></td>
        </tr>
    );
}

export default TankType;
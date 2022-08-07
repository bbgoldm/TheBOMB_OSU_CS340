import React from 'react';
import  { MdDeleteForever, MdEdit } from 'react-icons/md';




function Tank({ onTankClick, tank, onEdit, onDelete }) {
    return (
        <tr>
            {/* <td>{tank.tankName}</td> */}
            <td className='link' onClick={()=> onTankClick(tank.tankID)}>{tank.tankName}</td>
            <td>{tank.tankTypeName}</td>
            <td>{tank.pumpableVol}</td>
            <td>{tank.freeVol}</td>
            <td>{tank.capacity}</td>
            <td>{tank.materialName}</td>
            <td>{tank.srcOrDest}</td>
            <td>{tank.levelPercent.toFixed(2)}</td>
            
            <td className='icon'>< MdEdit onClick={()=> onEdit(tank)} /></td>
            <td className='icon'>< MdDeleteForever onClick={()=> onDelete(tank.tankID)}/></td>
        </tr>
    );
}

export default Tank;
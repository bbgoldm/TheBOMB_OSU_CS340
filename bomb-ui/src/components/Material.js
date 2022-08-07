import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';




function Material({ onMatClick, tanks, material, onEdit, onDelete }) {

    // Determine if material exists in tanks.  If it does than we don't want to allow delete
    // because there is a SQL restriction
    let deleteHtml;
    const isMatch = tanks.some(function (tank) {
        return tank.materialID === material.materialID
    });
    // console.log(isMatch);
    if (isMatch) {
        deleteHtml = <td className='icon'>< MdDeleteForever color="grey" /></td>
    }
    else {
        deleteHtml = <td className='icon'>< MdDeleteForever onClick={() => onDelete(material.materialID)} /></td>
    }

    return (
        <tr>
            <td>{material.materialID}</td>
            <td className='link' onClick={() => onMatClick(material.materialID)}>{material.materialName}</td>
            <td>{material.count}</td>
            <td>{material.tankNames}</td>
            <td className='icon'>< MdEdit onClick={() => onEdit(material)} /></td>
            {/* <td className='icon'>< MdDeleteForever onClick={()=> onDelete(material.materialID)}/></td> */}
            {deleteHtml}
        </tr>
    );
}

export default Material;
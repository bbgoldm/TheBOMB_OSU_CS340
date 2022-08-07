import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';




function Test({ onTestClick, test, onEdit, onDelete }) {
    return (
        <tr>
            <td>{test.testID}</td>
            <td className='link' onClick={() => onTestClick(test.testID)}>{test.testNumber}</td>
            <td>{test.testName}</td>
            <td>{test.testDescription}</td>
            <td className='icon'>< MdEdit onClick={() => onEdit(test)} /></td>
            <td className='icon'>< MdDeleteForever onClick={() => onDelete(test.testID)} /></td>
        </tr>
    );
}

export default Test;
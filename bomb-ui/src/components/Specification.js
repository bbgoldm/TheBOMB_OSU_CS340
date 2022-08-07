import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';




function Specification({ materials, tests, specification, onEdit, onDelete }) {

    // console.log('Materials', materials)
    // console.log('Tests', tests)
    // Determine the material by matching the specification.materialID with material.materialID
    const material = materials.find(function (material) {
        return material.materialID === specification.materialID
    });

    // Determine the material by matching the specification.materialID with material.materialID
    const test = tests.find(function (test) {
        return test.testID === specification.testID
    });

    return (
        <tr>
            <td>{specification.specificationID}</td>
            <td>{material.materialName}</td>
            <td>{test.testName}</td>
            <td>{specification.maxLimit}</td>
            <td>{specification.minLimit}</td>
            {/* <td>{specification.testID}</td> */}
            {/* <td>{specification.materialID}</td> */}
            <td className='icon'>< MdEdit onClick={() => onEdit(specification)} /></td>
            <td className='icon'>< MdDeleteForever onClick={() => onDelete(specification.specificationID)} /></td>
        </tr>
    );
}

export default Specification;
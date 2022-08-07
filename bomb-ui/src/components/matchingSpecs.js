// IN DEVELOPMENT

import React from 'react';
import TankType from './TankType';

function matchingSpecs({ tankTypes, onEdit, onDelete }) {
    return (
        <table id="tankTypes">
            <thead>
                <tr>
                    <th>Tank Type Name </th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tankTypes.map((tankType, i) => <TankType tankType={tankType}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default TankTypeList;
<table>
<caption className="tableTitle">Associated Specifications</caption>
<thead>
    <tr>
        <th>Test and Material Name</th>
        <th>Test Number</th>
        <th>Max Limit</th>
        <th>Min Limit</th>
    </tr>
</thead>
<tbody>
{matchingSpecs.map((spec, i) =>
<tr key={i}>
    <td>{spec[Object.keys(spec)[0]]}</td> {/* Concat data in first object */}
    <td>{spec.TestNumber}</td>
    <td>{spec.maxLimit}</td>
    <td>{spec.minLimit}</td>
</tr>)}</tbody></table>
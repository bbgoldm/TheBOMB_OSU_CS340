import React from 'react';
import TankType from './TankType';

function TankTypeList({ tankTypes, onEdit, onDelete }) {
    return (
        <table id="tankTypes">
            <thead>
                <tr>
                    <th>Tank Type Name </th>
                    <th>Count of Tanks Using Tank Type </th>
                    <th>Tanks Using Tank Type </th>
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

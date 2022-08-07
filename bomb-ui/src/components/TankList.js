import React from 'react';
import Tank from './Tank';

function TankList({ tanks, ...rest }) {
    return (
        <table id="tanks">
            <thead>
                <tr>
                    <th>Tank Name</th>
                    <th>Tank Type</th>
                    <th>Pumpable Volume (bbls)</th>
                    <th>Free Volume (bbls)</th>
                    <th>Capacity (bbls)</th>
                    <th>Material</th>
                    <th>Src/Dest</th>
                    <th>Level (%)</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tanks.map((tank, i) => <Tank tank={tank}
                    {...rest}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default TankList;

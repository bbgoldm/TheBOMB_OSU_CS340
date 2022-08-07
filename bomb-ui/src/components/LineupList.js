import React from 'react';
import Lineup from './Lineup';

function LineupList({ tasks, tanks, lineups, onEdit, onDelete }) {
    return (
        <table id="lineups">
            <thead>
                <tr>
                    <th>Lineup ID</th>
                    <th>Task ID</th>
                    <th>Tank ID</th>
                    <th>Tank Name</th>
                    <th>Src/Dest</th>
                    <th>Tank Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {lineups.map((lineup, i) => <Lineup 
                    tasks={tasks}
                    tanks={tanks}
                    lineup={lineup}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default LineupList;

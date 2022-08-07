import React from 'react';
import Specification from './Specification';

function SpecificationList({ materials, tests, specifications, onEdit, onDelete }) {
    return (
        <table id="specifications">
            <thead>
                <tr>
                    <th>Specification ID</th>
                    <th>Material Name</th>
                    <th>Test Name</th>
                    <th>Max Limit</th>
                    <th>Min Limit</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
            </thead>
            <tbody>
                {specifications.map((specification, i) => <Specification
                    materials={materials}
                    tests={tests}
                    specification={specification}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default SpecificationList;
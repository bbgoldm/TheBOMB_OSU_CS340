import React from 'react';
import Material from './Material';

function MaterialList({ materials, ...rest }) {
    return (
        <table id="materials">
            <thead>
                <tr>
                    <th>Material ID</th>
                    <th>Material Name</th>
                    <th>Count of Tanks Using Material</th>
                    <th>Tanks Using Material</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {materials.map((material, i) => <Material
                    material={material}
                    {...rest}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default MaterialList;

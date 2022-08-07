import React from 'react';
import Test from './Test';

function TestList({ tests, ...rest }) {
    return (
        <table id="tests">
            <thead>
                <tr>
                    <th>Test ID</th>
                    <th>Test Number</th>
                    <th>Test Name</th>
                    <th>Test Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {tests.map((test, i) => <Test test={test}
                    {...rest}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default TestList;

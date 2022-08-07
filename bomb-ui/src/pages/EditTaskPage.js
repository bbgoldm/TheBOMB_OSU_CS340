import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import 'react-dropdown/style.css';


export const EditTaskPage = ({ taskToEdit }) => {
    const [taskVolume, setTaskVolume] = useState(parseInt(taskToEdit.taskVolume.replaceAll(',', '')));
    const [destinationTankID, setDestinationTankID] = useState([])
    const [sourceTankIDs, setSourceTankIDs] = useState([])
    const [destinationTank, setDestinationTank] = useState([]);
    const [sourceTank, setSourceTank] = useState([]);

    const history = useHistory();

    const editTask = async () => {
        const editedTask = { taskVolume };
        console.log(editedTask)

        let transaction = {}
        transaction.newTask = { taskVolume };
        transaction.newDestination = { destinationTankID }
        transaction.newSources = { sourceTankIDs }
        console.log(`Transaction is keys: ${Object.keys(transaction)} and values: ${Object.values(transaction)}`);
        console.log(`Transaction.newTask is keys: ${Object.keys(transaction.newTask)} and values: ${Object.values(transaction.newTask)}`)
        console.log(`Transaction.newDestination is keys: ${Object.keys(transaction.newDestination)} and values: ${Object.values(transaction.newDestination)}`)
        console.log(`Transaction.newSources is keys: ${Object.keys(transaction.newSources)} and values: ${Object.values(transaction.newSources)}`)

        // Add data validation to ensure that the volume is a number > 0:
        const volumeValid = taskVolume !== null && !isNaN(taskVolume) && taskVolume > 0;
        console.log(`volumeValid = ${volumeValid}`);

        // Add data validation to ensure a destination is chosen.
        const destinationValid = destinationTankID.length >= 1;
        console.log(`destinationTankID = ${destinationTankID}`)
        console.log(`destinationTankID.length = ${destinationTankID.length}`)
        console.log(`destinationValid = ${destinationValid}`)

        // Add data validation to ensure at least one source is chosen.
        const sourceValid = sourceTankIDs.length >= 1;
        console.log(`sourceTankIDs = ${sourceTankIDs}`)
        console.log(`sourceTankIDs.length = ${sourceTankIDs.length}`)
        console.log(`sourceValid = ${sourceValid}`)

        if (volumeValid && destinationValid && sourceValid) {
            const response = await fetch(`/tasks/${taskToEdit.taskID}`, {
                method: 'PUT',
                body: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 200) {
                alert("Successfully edited the task!");
            } else {
                alert(`Failed to edit task, status code = ${response.status}`);
            }
            history.push("/Tasks");
        } else {
            alert("Data validation failed.  Volume must be number greater than zero.  One destionation tank must be selected.  At least one source tank must be selected.")
        }
    };

    const onCancel = async () => {
        history.push("/Tasks");
    };

    const loadDestinationTanks = async () => {
        const response = await fetch('/destinationTankDropdown');
        const data = await response.json();
        setDestinationTank(data);
    }

    const loadSourceTanks = async () => {
        const response = await fetch('/sourceTankDropdown');
        const data = await response.json();
        setSourceTank(data);
    }

    // Call loadDestinationTanks and loadSourceTanks when page is initialized
    useEffect(() => {
        loadDestinationTanks();
        loadSourceTanks();
    }, []);

    console.log(`destinationTank = ${destinationTank}`);
    console.log(`sourceTank = ${sourceTank}`);

    return (
        <>
            <h2>Edit the Task</h2>
            <table id="newTask">
                <thead>
                    <tr>
                        <th>Task Volume</th>
                        <th>Destination Tank</th>
                        <th>Source Tanks</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="number"
                            value={taskVolume}
                            placeholder="Number > 0"
                            onChange={e => setTaskVolume(e.target.value)} />
                    </td>
                    <td>
                        <select name="destination_tank"
                            onChange={e => setDestinationTankID(e.target.value)} >
                            <option disabled="disabled" selected="selected">Select a destination tank.</option>
                            {destinationTank.map((destination, index) => <option key={index} value={destination.tankID}>{destination.tankName + ': ' + destination.tankInfo}</option>)}
                        </select>
                    </td>
                    <td>
                        <select name="source_tanks[]" multiple="multiple"
                            onChange={e => setSourceTankIDs(Array.from(e.target.selectedOptions, (option) => option.value))} >
                            {sourceTank.map((source, index) => <option key={index} value={source.tankID}>{source.tankName + ': ' + source.tankInfo}</option>)}
                        </select>
                    </td>
                </tbody>
            </table>

            {console.log(`Destination tank IDs: ${destinationTankID}`)}
            {console.log(`Source tank IDs: ${sourceTankIDs}`)}

            <div className='createCancel'>
                <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
                <div className='flex-right'><button onClick={editTask}> Save </button></div>
            </div>
        </>

    );
}

export default EditTaskPage;
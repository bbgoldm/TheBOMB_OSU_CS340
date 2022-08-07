import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import  Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = ['lbs', 'kgs']
const defaultOption = options[0]

export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        console.log(editedExercise)
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push("/")
    };

    const onCancel = async () => {
        history.push("/");
    };

    return (
        <>
        <h2>Edit the Exercise</h2>
        <table id="newExercise">
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date (mm-dd-yy)</th>
                </tr>
            </thead>
            <tbody>
                <td>
                    <input
                        type="text"
                        value={name}
                        placeholder="name of exercise"
                        onChange={e => setName(e.target.value)} />
                </td>
                <td>
                    <input
                        type="number"
                        value={reps}
                        placeholder="number > 0"
                        onChange={e => setReps(e.target.value)} />
                </td>
                <td>
                    <input
                        type="number"
                        value={weight}
                        placeholder="number > 0"
                        onChange={e => setWeight(e.target.value)} />
                </td>
                <td>
                    <select value={unit} onChange={e => setUnit(e.target.value)}>
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                    </select>
                </td>
                <td>
                    <input
                        type="text"
                        value={date}
                        placeholder="mm-dd-yy"
                        onChange={e => setDate(e.target.value)} />
                </td>
            </tbody>
        </table>
        
        <div className='createCancel'>
            <div className='flex-left'><button onClick={onCancel}>Cancel</button></div>
            <div className='flex-right'><button onClick={editExercise}> Save </button></div>
        </div>
        </>
        
    );
}

export default EditExercisePage;
import React, { useState } from 'react';

const options = ['lbs', 'kgs']
const defaultOption = options[0]

export default function SelectUnits(){
    const [choice, setChoice] = useState();
    return (
        <div>
            <select
              value={choice}
              defaultValue={'lbs'}
              onChange={(e) => setChoice(e.target.value)}
            >
                <option value={'lbs'}>lbs</option>
                <option value={'kgs'}>kgs</option>
            </select>
        </div>
    )
}
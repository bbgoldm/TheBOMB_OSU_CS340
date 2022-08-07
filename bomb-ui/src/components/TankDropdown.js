// From https://appdividend.com/2022/03/12/react-dropdown-select/
import React from 'react';
import Select from 'react-select';




function TankDropdown({}) {
    const TankIDAndName = [
        {tankID: 11, tankName: "T27"},
        {tankID: 12, tankName: "T168"},
        {tankID: 13, tankName: "T321"},
        {tankID: 14, tankName: "T90"},
        {tankID: 15, tankName: "T82"}
    ];
    const handleChange = (selectedOption) => {
        console.log("handleChange", selectedOption);
    }
    return(<Select options={TankIDAndName} onChange={handleChange} isMulti/>)
};

export default TankDropdown;
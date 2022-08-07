// From https://appdividend.com/2022/03/12/react-dropdown-select/
import React from 'react';
import AsyncSelect from 'react-select/async';




function TankDropdown({}) {
    const TankIDAndName = [
        {value: 11, label: "T27"},
        {value: 12, label: "T168"},
        {value: 13, label: "T321"},
        {value: 14, label: "T90"},
        {value: 15, label: "T82"}
        // {tankID: 11, tankName: "T27"},
        // {tankID: 12, tankName: "T168"},
        // {tankID: 13, tankName: "T321"},
        // {tankID: 14, tankName: "T90"},
        // {tankID: 15, tankName: "T82"}
    ];
    const handleChange = (selectedOption) => {
        console.log("handleChange", selectedOption);
    }
    // After SQL query then run this function
    const loadOptions = (searchValue, callback) => {
        setTimeout(() => {
            const filteredOptions = options.filter((option) => 
            option.label.toLowerCase().includes(searchValue.toLowerCase()));
            console.log("loadOptions", searchValue, filteredOptions);
            callback(filteredOptions);
        }, 2000);
    };
    return(<AsyncSelect loadOptions={loadOptions} defaultOptions onChange={handleChange} isMulti/>)
};

export default TankDropdown;
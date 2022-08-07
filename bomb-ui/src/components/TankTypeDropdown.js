// From https://appdividend.com/2022/03/12/react-dropdown-select/
// From https://www.youtube.com/watch?v=3u_ulMvTYZI
import React from 'react';
import Select from 'react-select';


function TankTypeDropdown({}) {
    const TankTypeIDAndName = [
        {tankTypeID: 11, tankTypeName: "Bullet"},
        {tankTypeID: 12, tankTypeName: "Cone Roof"},
        {tankTypeID: 13, tankTypeName: "External Floating Roof"},
        {tankTypeID: 14, tankTypeName: "Fixed Roof"},
        {tankTypeID: 15, tankTypeName: "Internal Floating Roof"},
        {tankTypeID: 16, tankTypeName: "Sphere"},
        {tankTypeID: 17, tankTypeName: "Dome"}
    ];
    const handleChange = (selectedOption) => {
        console.log("handleChange", selectedOption);
    }
    return(<Select options={TankTypeIDAndName} onChange={handleChange}/>)
};

export default TankTypeDropdown;
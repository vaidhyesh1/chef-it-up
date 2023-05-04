// import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import './userSelect.css'

const renderMenuItems = (userList) => {
    return userList && userList.length > 0 ? userList.map((user) => {
        return (
            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
        )
    }): [];
}

function UserSelect(props){
    const {userList , selectedUser, setSelectedUser} = props;

    const handleChange = (event) => {
        setSelectedUser(event.target.value);
    };
    
    return (
        <div className='select-container'>
            <InputLabel id="demo-simple-select-standard-label">Select user</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedUser}
                onChange={handleChange}
                label="Age"
                className='select'
                style={{width: '125%'}}
            >
                {renderMenuItems(userList)}
            </Select>
        </div>
    )
}

export default UserSelect
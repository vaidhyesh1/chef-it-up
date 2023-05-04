import * as React from 'react';
// import { useNavigate } from "react-router-dom";
import './recipeTable.css'
import { DataGrid } from '@mui/x-data-grid';
import { postUserFollows } from '../../Api.js'

const formatTableData = (userFollows, userList) => {
    const finalUserList =  userFollows && userFollows.length > 0 ? userFollows.map((follow, index) => { return {
        id: follow.id,
        number: index +1,
        userName: follow.name,
    }}) : []

    const followUserIds = userFollows && userFollows.length > 0 ? userFollows.map((follow) => follow.id) : []
    let counter = followUserIds.length

    userList.forEach((user) => {
        if (userFollows && userFollows.length > 0 && !followUserIds.includes(user.id)) {
            counter += 1
            finalUserList.push({
                id: user.id,
                number: counter,
                userName: user.name,
            })
        }
    })

    return finalUserList
}
  

function UserTable(props) {
    const {userFollows, userId, userList} = props
    // const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 20, flex:1},
        { field: 'userName', headerName: 'User Name', minWidth: 100, flex:1 },
    ];

    const rows = formatTableData(userFollows, userList)
    const ids = userFollows.map((r) => r.id)
    const [selectionModel, setSelectionModel] = React.useState(ids);

    React.useEffect(() => {
        setSelectionModel(ids)
    }, [userFollows])

    const handleSelectionModelChange = (newFollows) => {
        setSelectionModel(newFollows)
        postUserFollows(userId,newFollows)
    }

    return (
        <div style={{ height: 400, width: '80%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                rowSelectionModel={selectionModel}
                onRowSelectionModelChange={handleSelectionModelChange}
            />
        </div>
    )
}

export default UserTable
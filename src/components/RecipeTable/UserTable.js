import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './recipeTable.css'
import { DataGrid } from '@mui/x-data-grid';

const formatTableData = (userFollows) => {
    return userFollows && userFollows.length > 0 ? userFollows.map((follow, index) => { return {
        id: follow.id,
        number: index +1,
        userName: follow.name,
    }}) : []
}
  

function UserTable(props) {
    const {userFollows, userId} = props
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 20, flex:1},
        { field: 'userName', headerName: 'User Name', minWidth: 100, flex:1 },
    ];

    const rows = formatTableData(userFollows)
    const [selectionModel, setSelectionModel] = React.useState(() =>
        rows.map((r) => r.id),
    );

    return (
        <div style={{ height: 400, width: '80%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                selectionModel={selectionModel}
                onSelectionModelChange={setSelectionModel}
            />
        </div>
    )
}

export default UserTable
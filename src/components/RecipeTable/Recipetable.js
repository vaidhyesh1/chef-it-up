import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './recipeTable.css'
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material';

const formatTableData = (recipeList) => {
    return recipeList && recipeList.length > 0 ? recipeList.map((recipe, index) => { return {
        id: recipe.id,
        number: index +1,
        recipeName: recipe.name,
        tags: recipe.tags !== undefined ? recipe.tags : "",
        details: 'View'
    }}) : []
}

function RecipeTable(props) {
    const {recipeList, userId} = props
    const navigate = useNavigate();

    const columns = [
        { field: 'number', headerName: 'No.', minWidth: 100, flex:1},
        { field: 'recipeName', headerName: 'Recipe Name', minWidth: 100, flex:1 },
        { field: 'tags', headerName: 'Explanation', minWidth: 100, flex:1 },
        {
            field: "details",
            headerName: "More details",
            minWidth: 100,
            flex:1,
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
                navigate(`/recipe/${params.row.id}?userId=${userId}`);
              };
        
              return <Button onClick={onClick}>View</Button>;
            }
          }
    ];

    const rows = formatTableData(recipeList)
    return (
        <div style={{ height: 400, width: '80%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
            />
        </div>
    )
}

export default RecipeTable
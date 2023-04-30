import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './recipeTable.css'
import { DataGrid } from '@mui/x-data-grid';
// import { getGridSingleSelectOperators } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import { Chip, Stack } from "@mui/material"

const formatTableData = (recipeList) => {
    return recipeList && recipeList.length > 0 ? recipeList.map((recipe, index) => { return {
        id: recipe.id,
        number: index +1,
        recipeName: recipe.name,
        tags: recipe.tags,
        details: 'View'
    }}) : []
}

// const tagsSortComparator = (tags1, tags2) => {
//     return tags1.length - tags2.length;
//   };
  
// const tagsFilterOperators = getGridSingleSelectOperators()
//     .filter((operator) => operator.value === 'isAnyOf')
//     .map((operator) => {
//         const newOperator = { ...operator };
//         const newGetApplyFilterFn = (filterItem, column) => {
//             return (params) => {
//                     let isOk = true;
//                     filterItem?.value?.forEach((fv) => {
//                     isOk = isOk && params.value.includes(fv);
//                 });
//                 return isOk;
//             };
//         };
//         newOperator.getApplyFilterFn = newGetApplyFilterFn;
//         return newOperator;
// });

function ExploreTable(props) {
    const {recipeList, userId} = props
    const {filterItems, setFilterItems} = props
    const navigate = useNavigate();
    // console.log("filter item", filterItems)

    const rows = formatTableData(recipeList)
    const columns = [
        { field: 'number', headerName: 'No.', minWidth: 100, flex:1},
        { field: 'recipeName', headerName: 'Recipe Name', minWidth: 100, flex:1 },
        {
            field: "tags",
            headerName: "Tags",
            minWidth: 400,
            flex: 1,
            // type: "singleSelect",
            valueOptions: [...new Set(rows.map((o) => o.tags).flat())],
            renderCell: (params) => (
              <Stack direction="row" spacing={0.25}>
                {params.row.tags.map((tag) => (
                  <Chip color='info' label={tag} />
                ))}
              </Stack>
            ),
            // sortComparator: tagsSortComparator,
            // filterOperators: tagsFilterOperators
        },
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

    return (
        <div style={{ height: 400, width: '80%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                filterModel={filterItems}
                onFilterModelChange={(newFilterModel) => {
                    console.log(newFilterModel)
                    setFilterItems(newFilterModel)
                }}
            />  
        </div>
    )
}

export default ExploreTable
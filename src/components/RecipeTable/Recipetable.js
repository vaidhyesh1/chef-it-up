import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './recipeTable.css'
import { DataGrid } from '@mui/x-data-grid';
import {Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const formatTableData = (recipeList) => {
    return recipeList && recipeList.length > 0 ? recipeList.map((recipe, index) => { return {
        id: recipe.id,
        number: index +1,
        recipeName: recipe.name,
        details: 'View'
    }}) : []
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

function RecipeTable(props) {
    const {recipeList, userId} = props

    console.log('*** reciptable', recipeList)

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [recipeName, setRecipeName] = React.useState('');
    const [recipeDetails, setReceipeDetails] = React.useState('');

    const columns = [
        { field: 'number', headerName: 'No.', minWidth: 100, flex:1},
        { field: 'recipeName', headerName: 'Recipe Name', minWidth: 100, flex:1 },
        {
            field: "details",
            headerName: "More details",
            minWidth: 100,
            flex:1,
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking
        
                // const api = params.api;
                // const thisRow = {};
                // setRecipeName(params.row.recipeName)
                // const recipeDetails = getRecipe(params.row.recipeName)
                // setReceipeDetails(recipeDetails)
                // handleOpen()
                navigate(`/recipe/${params.row.id}?userId=${userId}`);
              };
        
              return <Button onClick={onClick}>View</Button>;
            }
          }
    ];

    const rows = formatTableData(recipeList)
    return (
        <div style={{ height: 400, width: '80%' }}>
            <div className='title-container'>
                <Typography variant="h6" component="h2" className='table-title'>
                    Recommended recipes:
                </Typography>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {recipeName}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {recipeDetails.recipe}
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default RecipeTable
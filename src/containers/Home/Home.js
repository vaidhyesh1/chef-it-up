import { useEffect, useState } from 'react'
import './home.css'
import Recommendations from '../Recommendations/Recommendations.js';
import Typography from '@mui/material/Typography';
import { getRecipeForUser } from '../../Api.js';

function Home(props){
    const {selectedUser} = props
    const [recipeList, setRecipeList] = useState([])

    useEffect(() => {
        if(selectedUser !== "") {
            getRecipeForUser(selectedUser).then(recipeList => {
                setRecipeList(recipeList)
                // console.log("recipeList", recipeList)
            })
        }
    }, [selectedUser])

    return (
        <div>
            <div className='home-body'>
                <div className='title-container'>
                    <Typography variant="h6" component="h2" className='table-title'>
                        Recommended recipes:
                    </Typography>
                </div>
                <Recommendations recipeList = {recipeList} userId = {selectedUser} />
            </div>
        </div>
    )
}

export default Home
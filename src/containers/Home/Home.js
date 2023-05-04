import { useEffect, useState } from 'react'
import './home.css'
import Recommendations from '../Recommendations/Recommendations.js';
import UserSelect from '../../components/UserSelect/UserSelect.js';
import Typography from '@mui/material/Typography';
import { getRecipeForUser } from '../../Api.js';

function Home(props){
    const {userList, selectedUser, setSelectedUser} = props
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
                <div>
                    <UserSelect userList = {userList} selectedUser = {selectedUser} setSelectedUser={setSelectedUser}/>
                </div>
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
import { useEffect, useState } from 'react'
import axios from "axios";
import './home.css'
import Header from '../../components/Header/Header.js'
import UserSelect  from '../../components/UserSelect/UserSelect.js'
import RecipeTable  from '../../components/RecipeTable/Recipetable.js'

const getUsers = async () => {
    let userList = await axios.get('https://vaidhyesh.pythonanywhere.com/users')
    return userList.data
}

const getRecipeForUser = async (userId) => {
    let recommendations = await axios.get(`https://vaidhyesh.pythonanywhere.com/recommendation?userId=${userId}`)
    return recommendations.data
}

function Home(){
    const [selectedUser, setSelectedUser] = useState('');
    const [userList, setUserList] = useState([])
    const [recipeList, setRecipeList] = useState([])

    useEffect(() => {
        getUsers().then(userList => {
            setUserList(userList)
        });
    }, [])

    const handleUserChange = async (newSelectedUser) => {
        setSelectedUser(newSelectedUser)
        const recipeListForUser = await getRecipeForUser(newSelectedUser)
        setRecipeList(recipeListForUser)
    }



    return (
        <div>
            <Header/>
            <div className='home-body'>
                <UserSelect userList = {userList} selectedUser = {selectedUser} setSelectedUser={handleUserChange}/>
                <RecipeTable recipeList = {recipeList} userId = {selectedUser}/>
            </div>
        </div>
    )
}

export default Home
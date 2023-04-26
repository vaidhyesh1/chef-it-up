import { useEffect, useState } from 'react'
import axios from "axios";
import './home.css'
import Header from '../../components/Header/Header.js'
import UserSelect  from '../../components/UserSelect/UserSelect.js'
import RecipeTable  from '../../components/RecipeTable/Recipetable.js'


const users = [
    'user 1',
    'user 2',
    'user 3'
]

const recipeForUsers = {
    'user 1': [
        'Grilled Cheese',
        'Omelette'
    ],
    'user 2': [
        'Dosa',
        'Sambar'
    ],
    'user 3': [
        'Omelette',
        'Grilled Cheese'
    ],
}

const recipes = {
    'Grilled Cheese': {
        'recipeName': 'Grilled Cheese',
        'ingredients': 'Bread, Butter, Cheese',
        'recipe': `Butter the toast – spread 1/2 Tbsp butter on one side of each slice of bread.
        Heat skillet – place a skillet over low to medium/low heat. A griddle should be at 275˚F. Immediately add 2 slices of bread with the butter-side-down.
        Add cheese – stack cheeses on one of the pieces of bread, cover with the other piece of toast and flip the sandwich over.
        Brown the toast – Continue sauteeing, flipping once, until both sides are golden brown and cheese is melted.
        Serve – cut the sandwich in half on the diagonal to serve.`
    },
    'Omelette': {
        'recipeName': 'Omelette',
        'ingredients': 'Eggs, Salt, Butter, Cheese',
        'recipe': `Beat eggs – in a small bowl, combine 2 eggs and a pinch of salt then beat with a fork until frothy.
        Heat skillet – place a small non-stick pan over medium heat and melt in 1/2 Tbsp of butter. Once butter is melted and bubbly, add beaten eggs and reduce heat to low.
        Pull cooked eggs with a spatula into the center, allowing the liquid eggs to fill in the space. Watch the video tutorial above to see this process in action.
        Flip – once eggs are nearly set, the omelette slides easily on the skillet and you can get a spatula underneath, flip it over. Turn off the heat.
        Fold – add cheese and your favorite toppings, fold the omlette and slide it onto a plate to serve.`
    },
    'Dosa': {
        'recipeName': 'Omelette',
        'ingredients': 'Eggs, Salt, Butter, Cheese',
        'recipe': `Beat eggs – in a small bowl, combine 2 eggs and a pinch of salt then beat with a fork until frothy.
        Heat skillet – place a small non-stick pan over medium heat and melt in 1/2 Tbsp of butter. Once butter is melted and bubbly, add beaten eggs and reduce heat to low.
        Pull cooked eggs with a spatula into the center, allowing the liquid eggs to fill in the space. Watch the video tutorial above to see this process in action.
        Flip – once eggs are nearly set, the omelette slides easily on the skillet and you can get a spatula underneath, flip it over. Turn off the heat.
        Fold – add cheese and your favorite toppings, fold the omlette and slide it onto a plate to serve.`
    },
    'Sambar': {
        'recipeName': 'Omelette',
        'ingredients': 'Eggs, Salt, Butter, Cheese',
        'recipe': `Beat eggs – in a small bowl, combine 2 eggs and a pinch of salt then beat with a fork until frothy.
        Heat skillet – place a small non-stick pan over medium heat and melt in 1/2 Tbsp of butter. Once butter is melted and bubbly, add beaten eggs and reduce heat to low.
        Pull cooked eggs with a spatula into the center, allowing the liquid eggs to fill in the space. Watch the video tutorial above to see this process in action.
        Flip – once eggs are nearly set, the omelette slides easily on the skillet and you can get a spatula underneath, flip it over. Turn off the heat.
        Fold – add cheese and your favorite toppings, fold the omlette and slide it onto a plate to serve.`
    }
}

const getUsers = async () => {
    let userList = await axios.get('https://vaidhyesh.pythonanywhere.com/users')
    return userList.data
}

const getRecipeForUser = async (userId) => {
    console.log('*** recipe for user', userId)
    let recommendations = await axios.get(`https://vaidhyesh.pythonanywhere.com/recommendation?userId=${userId}`)
    console.log('*** recommendations', recommendations.data)
    return recommendations.data
}

const getRecipe = (recipeName) => {

    return recipes[recipeName]
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
                <RecipeTable recipeList = {recipeList} getRecipe={getRecipe} userId = {selectedUser}/>
            </div>
        </div>
    )
}

export default Home
import './explorerecipes.css'
import { useEffect, useState } from 'react'
import RecipeTable from '../../components/RecipeTable/Recipetable.js';
import { getAllRecipes } from '../../Api.js'

function ExploreRecipe(props) {
    const [recipeList, setRecipeList] = useState([]);
    const {userId} = props

    useEffect(() => {
        getAllRecipes().then(recipes => {
            setRecipeList(recipes)
        })
    }, [])

    return (
        <div className='explore-recipes-body'>
            <h1>Explore New Recipes:</h1>
            <RecipeTable recipeList = {recipeList} userId = {userId}/>
        </div>
    )
}

export default ExploreRecipe
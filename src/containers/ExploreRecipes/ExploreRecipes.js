import './explorerecipes.css'
import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import ExploreTable from '../../components/RecipeTable/ExploreTable.js';
import UserSelect from '../../components/UserSelect/UserSelect.js';
import { getAllRecipes } from '../../Api.js'

function ExploreRecipe(props) {
    const [recipeList, setRecipeList] = useState([]);
    const {userList, userId, setSelectedUser} = props
    const location = useLocation();
    const tagData = location.state;
    const [filterItems, setFilterItems] = useState(
        {
            items: [
                {
                    field: "tags",
                    operator: "contains",
                    value: undefined
                }
            ]
        }
    )

    useEffect(() => {
        getAllRecipes().then(recipes => {
            // console.log(recipes)
            setRecipeList(recipes)
        })

        if(tagData !== null ) {
            setFilterItems({items: [
                {
                    field: "tags",
                    operator: "contains",
                    value: tagData.tag
                }
            ]})
        }
    }, [tagData])

    return (
        <div className='explore-recipes-body'>
            <div>
                <UserSelect userList = {userList} selectedUser = {userId} setSelectedUser={setSelectedUser}/>
            </div>
            <h1>Explore New Recipes:</h1>
            <ExploreTable recipeList = {recipeList} userId = {userId} filterItems={filterItems} setFilterItems={setFilterItems} />
        </div>
    )
}

export default ExploreRecipe
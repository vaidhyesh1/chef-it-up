import axios from "axios";

const baseURL = "https://vaidhyesh.pythonanywhere.com/"

// User APIs
export const getUsers = async () => {
    let userList = await axios.get(baseURL + 'users')
    return userList.data
}

export const getUserFollows = async (userId) => {
    let userList = await axios.get(baseURL + `user?userId=${userId}`)
    return userList.data
}

export const postUserFollows = async (userId, userList) => {
    return axios.post(baseURL + `user?userId=${userId}`, userList)
}

// Recipe APIs
export const getAllRecipes = async () => {
    const recipes = await axios.get(baseURL + `recipes`)
    return recipes.data
}

export const getRecipe = async (recipeId) => {
    const recipe = await axios.get(baseURL + `recipe?recipeId=${recipeId}`)
    return recipe.data
}

export const getRecipeForUser = async (userId) => {
    let recommendations = await axios.get(baseURL + `recommendation?userId=${userId}`)
    return recommendations.data
}

// Recommendation APIs
export const getRecommendations = async (recipeId, userId) => {
    const res = await axios.get(baseURL + `recommendationBasedOnClick?userId=${userId}&recipeId=${recipeId}`)
    return res.data
}
import './following.css'
import { useEffect, useState } from 'react'
import UserTable from '../../components/RecipeTable/UserTable.js';
import { getUserFollows } from '../../Api.js'

function Following(props) {
    const [userFollows, setUserFollows] = useState([]);
    const {userId} = props

    useEffect(() => {
        getUserFollows(userId).then(userFollows => {
            setUserFollows(userFollows.follows)
        })
    }, [])

    return (
        <div className='explore-recipes-body'>
            <h2>Users you follow:</h2>
            <UserTable userFollows = {userFollows} userId = {userId}/>
            <br />
        </div>
    )
}

export default Following
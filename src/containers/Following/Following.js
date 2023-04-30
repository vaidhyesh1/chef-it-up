import './following.css'
import { useEffect, useState } from 'react'
import UserTable from '../../components/RecipeTable/UserTable.js';
import { getUserFollows } from '../../Api.js'

function Following(props) {
    const [userFollows, setUserFollows] = useState([]);
    const {userId, userList} = props

    useEffect(() => {
        getUserFollows(userId).then(userFollows => {
            setUserFollows(userFollows.follows)
        })
    }, [userId])

    const allUsers = userList.map(user => user.id)

    return (
        <div className='explore-recipes-body'>
            <h2>Users you follow:</h2>
            <UserTable userFollows = {userFollows} userId = {userId} userList={userList}/>
            <br />
        </div>
    )
}

export default Following
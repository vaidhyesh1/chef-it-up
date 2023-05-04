import './following.css'
import { useEffect, useState } from 'react'
import UserTable from '../../components/RecipeTable/UserTable.js';
import UserSelect from '../../components/UserSelect/UserSelect.js';
import { getUserFollows } from '../../Api.js'

function Following(props) {
    const [userFollows, setUserFollows] = useState([]);
    const {userList, userId, setSelectedUser} = props

    useEffect(() => {
        getUserFollows(userId).then(userFollows => {
            setUserFollows(userFollows.follows)
        })
    }, [userId])

    // const allUsers = userList.map(user => user.id)

    return (
        <div className='explore-recipes-body'>
            <div>
                <UserSelect userList = {userList} selectedUser = {userId} setSelectedUser={setSelectedUser}/>
            </div>
            <h2>Users you follow:</h2>
            <UserTable userFollows = {userFollows} userId = {userId} userList={userList}/>
            <br />
        </div>
    )
}

export default Following
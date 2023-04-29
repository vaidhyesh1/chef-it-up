// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react'
import Home from './containers/Home/Home.js'
import Header from './components/Header/Header.js'
import Recipe from './containers/Recipe/Recipe.js'
import ExploreRecipes from './containers/ExploreRecipes/ExploreRecipes.js'
import UserSelect  from './components/UserSelect/UserSelect.js'
import { getUsers } from './Api.js'


function App() {

  const [selectedUser, setSelectedUser] = useState('');
  const [userList, setUserList] = useState([])

  useEffect(() => {
    getUsers().then(userList => {
        setUserList(userList)
    });
  }, [])

  const handleUserChange = async (newSelectedUser) => {
    setSelectedUser(newSelectedUser)
  }

  return (
    <div className="App">
      <Header />
      <div style={{textAlign: 'center'}}>
        <UserSelect userList = {userList} selectedUser = {selectedUser} setSelectedUser={handleUserChange}/>
      </div>
      <Routes>
        <Route path="/" element={<Home selectedUser = {selectedUser} />} />
        <Route path="/recipes" element={<ExploreRecipes userId = {selectedUser} />} />
        <Route path="/recipe/:recipeId" element={<Recipe />} />
      </Routes>
    </div>
  );
}

export default App;

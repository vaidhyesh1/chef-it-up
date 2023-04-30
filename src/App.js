// import logo from './logo.svg';
import './App.css';
import { useNavigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react'
import Home from './containers/Home/Home.js'
import Header from './components/Header/Header.js'
import Recipe from './containers/Recipe/Recipe.js'
import ExploreRecipes from './containers/ExploreRecipes/ExploreRecipes.js'
import Following from './containers/Following/Following.js'
import UserSelect  from './components/UserSelect/UserSelect.js'
import { getUsers } from './Api.js'

function App() {

  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState('');
  const [userList, setUserList] = useState([])

  useEffect(() => {
    getUsers().then(userList => {
      setUserList(userList)
    });
  }, [])

  const handleUserChange = async (newSelectedUser) => {
    setSelectedUser(newSelectedUser)
    navigate('/')
  }

  return (
    <div className="App">
      <Header />
      <div style={{textAlign: 'center', position: 'relative', left: '40%'}}>
        <UserSelect userList = {userList} selectedUser = {selectedUser} setSelectedUser={handleUserChange}/>
      </div>
      <Routes>
        <Route path="/" element={<Home selectedUser = {selectedUser} />} />
        <Route path="/recipes" element={<ExploreRecipes userId = {selectedUser} />} />
        <Route path="/recipe/:recipeId" element={<Recipe userId = {selectedUser} />} />
        <Route path="/following" element={<Following userId = {selectedUser} />} />
      </Routes>
    </div>
  );
}

export default App;

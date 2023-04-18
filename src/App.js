import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Home from './containers/Home/Home.js'

function App() {
  return (
    <div className="App">
      <Home/>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;

import './header.css'
import Typography from "@mui/material/Typography";
import chefHat from './chef-hat.png';

function Header() {
    return (
        <div className="header-container">
            <img src={chefHat} className='header-logo'/>
            <Typography variant="h6">CHEF IT UP</Typography>
        </div>
    )
}

export default Header
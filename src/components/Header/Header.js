import './header.css'
import * as React from 'react';
import Typography from "@mui/material/Typography";
import chefHat from './chef-hat.png';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "white"
    }
  });

function Header() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="header-container">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><img src={chefHat} className='header-logo' alt="Chef-It-Up-Logo"/></Link>
            <Typography variant="h6"><Link style={{ textDecoration: 'none', color: 'white' }} to="/">CHEF IT UP</Link></Typography>
            <div className='navigation-container'>
                <Box sx={{ width: '50%' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <StyledTab label="Home" component={Link} to="/" />
                        <StyledTab label="Explore" component={Link} to="/recipes" />
                        <StyledTab label="Following" component={Link} to="/following" />
                        <StyledTab label="About" component={Link} to="/about" />
                    </Tabs>
                </Box>
            </div>
        </div>
    )
}

export default Header
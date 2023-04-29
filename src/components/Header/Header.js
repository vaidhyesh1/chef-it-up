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
            <img src={chefHat} className='header-logo' alt="Chef-It-Up-Logo"/>
            <Typography variant="h6">CHEF IT UP</Typography>
            <div className='navigation-container'>
                <Box sx={{ width: '30%' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <StyledTab label="Home" component={Link} to="/" />
                        <StyledTab label="Explore" component={Link} to="/recipes" />
                    </Tabs>
                </Box>
            </div>
        </div>
    )
}

export default Header
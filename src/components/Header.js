import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  
const history =useHistory();
const user=localStorage.getItem("username");
const isLogged = user?true:false;

const handleLogout = () =>{
  localStorage.clear()
  history.push("/")

}
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        {
        (!hasHiddenAuthButtons) &&
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={()=>{history.push("/")}}
          
        >
        
          Back to explore
        </Button>
        
}
{
  (hasHiddenAuthButtons&&!isLogged) &&
  <Stack direction="row" spacing={2}>
    <Button variant="text" onClick={()=>{history.push("/login")}}>LogIn</Button>
    
    <Button variant="contained" onClick={()=>{history.push("/register")}}>Register</Button>
    
  </Stack>
}
{
  (hasHiddenAuthButtons&&isLogged) &&
  <Stack direction="row" spacing={2}>
    
    <Avatar alt={user} src="avatar.png" />
    <p style={{margin:"12px"}}>{user}</p>
    <Button onClick={handleLogout}>Logout</Button>
    

    
  </Stack>

}
      </Box>
        
    );
};

export default Header;
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import './navbarStyle.css'
import { Link } from "react-router-dom";

const Navbar = ({ setOpen }) => {
  const handleDrowerOpen = () => {
    setOpen(true);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrowerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={'/'} className='anchor-navbar'>Mail Delivery Service</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Paper, AppBar, Toolbar, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import { navbarStyle, NavButton, MenuButton, MenuList, MenuItems } from '../../style/navBarStyle';
import { Color } from "../../style/color";


const NavBar = (props) => {
    const classes = navbarStyle();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState('yin');
    const [value, setValue] = useState(null);
    const open = Boolean(anchorEl);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const scrollToView = name => {
        const anchor =  document.getElementById(name);
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    //handle menu close
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    //handle menu open
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const searchBar = () => <form className={classes.form}>
        <TextField
          id="search-bar"
          className={classes.textField}
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          InputProps={{
            disableUnderline: true,
            startAdornment: 
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>,
            endAdornment: value && (
              <IconButton
                onClick={() => setValue("")}
              ><ClearIcon/></IconButton>
            )
          }}
          inputProps={{
            sx: {
              "&::placeholder": {
                color: Color.GREY,
                marginTop: 15
              },
              width: '80%',
              display: 'flex',
              justifyContent: 'center'
            }
          }}
          onInput={(e) => {
          }}
          variant="standard"
          placeholder="Artists, songs, or poscasts"
          size="small"  
        />
    </form>

    return (
      <div className={classes.wrapper}>
        <AppBar position="sticky" sx={{ boxShadow: 'none', backgroundColor: scrollPosition===0?'transparent':'rgba(0, 0, 0, .5)'}}>
          <Toolbar className={classes.toolbar}>
           <div className={classes.container}>
            <NavButton
              onClick={()=>{}}
            >
              <ChevronLeftIcon style={{color: '#FFFFFF'}} />
            </NavButton>
            <NavButton
              onClick={()=>{}}
            >
              <ChevronRightIcon style={{color: '#FFFFFF'}} />
            </NavButton>
            {searchBar()}
           </div>
           <div className={classes.container}>
            
              <MenuButton
                id="menu-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <PersonIcon style={{color: '#FFFFFF'}}/>
                <Typography variant="body1">{user}</Typography>
              </MenuButton>
              <MenuList
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    backgroundColor: Color.DEEP_GREY,
                    minWidth: 200,
                    'box-shadow': '2px 1px #2b2b2b'
                  }
                }}
              >
                <MenuItems onClick={handleClose}>Account</MenuItems>
                <MenuItems onClick={handleClose}>Edit Profile</MenuItems>
                <MenuItems onClick={handleClose}>Change Password</MenuItems>
                <MenuItems onClick={handleClose}>Subscription</MenuItems>
                <MenuItems onClick={handleClose}>About</MenuItems>
                <MenuItems onClick={handleClose}>Log Out</MenuItems>
              </MenuList>
            
           </div>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default NavBar;
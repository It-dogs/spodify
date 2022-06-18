import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { navbarStyle } from '../../style/navBarStyle';

const NavBar = (props) => {
    const classes = navbarStyle();
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const scrollToView = name => {
        const anchor =  document.getElementById(name);
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
      <div className={classes.wrapper}>
        <AppBar position="sticky" className={classes.appBar} style={{ backgroundColor: scrollPosition===0?'transparent':'rgba(0, 0, 0, .5)'}}>
          <Toolbar className={classes.toolbar}>
           <Button
             className={classes.buttonLeft}
             size="large"
             onClick={()=>{}}
           >
             <ChevronLeftIcon style={{color: '#FFFFFF'}} />
           </Button>
           <Button
             className={classes.buttonRight}
             size="large"
             onClick={()=>{}}
           >
             <ChevronRightIcon style={{color: '#FFFFFF'}} />
           </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default NavBar;
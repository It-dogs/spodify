import React, { useState, useEffect, useRef } from "react";
import { createUseStyles } from 'react-jss';
import { Color } from '../../style/color';
import NavBar from '../NavBar';

const menuStyle = createUseStyles({
  container: {
    width: '100%'
  }
})

const Menu = (props) => {
    const classes = menuStyle();

    return (
      <div className={classes.container}>
        <NavBar />
      </div>
    );
}

export default Menu;
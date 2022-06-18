import React, { useState, useLayoutEffect, useRef } from "react";
import { createUseStyles } from 'react-jss';

import { Color }  from '../style/color';
import Sidebar from "../components/sidebar/sidebar";
import Menu from "../components/Menu";
import '../style/sidebarStyle.css';

const mainStyle = createUseStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    backgroundColor: Color.DEEP_BLACK
  },
})

export default function Main(props) {
  const classes = mainStyle();
  const ref = useRef(0);
  
  return (
    <div className={classes.container}>
      <Sidebar ref={ref} />
      <div className="appFrame"> 
        <Menu />
      </div>
    </div>
  ); 
}

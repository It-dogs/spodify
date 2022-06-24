import React, { useState, useLayoutEffect } from "react";
import { createUseStyles } from 'react-jss';
import axios from 'axios';

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
    width: '100%'
  }
})

export default function Main(props) {
  const classes = mainStyle();

  return (
    <div className={classes.container}>
      <Sidebar />
      <div className="appFrame"> 
        <Menu {...props} />
      </div>
    </div>
  ); 
}

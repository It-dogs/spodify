import React, { useState, useLayoutEffect } from "react";
import { createUseStyles } from 'react-jss';
import axios from 'axios';

import { Color }  from '../style/color';
import Sidebar from "../components/sidebar/sidebar";
import Menu from "../components/Menu";
import '../style/sidebarStyle.css';

const mainStyle = createUseStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }
})

export default function Dashboard(props) {
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

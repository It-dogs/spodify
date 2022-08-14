import React, { useState, useEffect, useRef } from "react";
import { createUseStyles } from 'react-jss';

import Sidebar from "../components/sidebar/sidebar";
import Menu from "../components/Menu";
import '../style/sidebarStyle.css';


const mainStyle = createUseStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    //border: 'solid', borderColor: 'blue'
  },
  frame: {
    width: state => `calc(100vw - ${state.width}px)`,
    //border: 'solid'
  }
})

export default function Dashboard(props) {
  const [width, setWidth] = useState(null);
  const classes = mainStyle({state: {width}});

  const updateWidthOfSidebar = val => setWidth(val);

  return (
    <div className={classes.container}>
      <Sidebar updateWidthOfSidebar={updateWidthOfSidebar}/>
      <div style={{width: `calc(95vw - ${width}px)`}} className="appFrame"> 
        <Menu {...props} />
      </div>
    </div>
  ); 
}

import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import NavBar from '../NavBar';
import Home from '../../home';
import emitter from '../../utils/emitter';
import '../../style/scrollBarStyle.css';
import _ from 'lodash';

const menuStyle = createUseStyles({
  container: {
    width: '100%',
    height: '100%',
    overflowY: 'auto'
  },
  homeContainer: {
    height: '100%', 
    flexDirection: 'column', 
    justifyContent: 'start',
    marginTop: 80
  }
})

const Menu = (props) => {
    const classes = menuStyle();
    const { token, playList, width } = props;
    const [currentPage, setCurrentPage] = useState('home');
    
    useEffect(() => {
      emitter.on('home', ()=>setCurrentPage('home'));
      emitter.on('search', ()=>setCurrentPage('search'));
      emitter.on('library', ()=>setCurrentPage('library'));
      emitter.on('create_playlist', ()=>setCurrentPage('create_playlist'));
      emitter.on('liked_songs', ()=>setCurrentPage('liked_songs'));
    
      return () => {
        emitter.off('home');
        emitter.off('search');
        emitter.off('library');
        emitter.off('create_playlist');
        emitter.off('liked_songs');
      }
    }, []);

    const handleMenuContent = () => <>
      <div className={classes.homeContainer} style={{display: currentPage==='home'? 'flex':'none'}}>
        <Home token={token} playList={playList} />
      </div>
    </>

    return (
      <div id='menuContainer' className={classes.container}>
        <NavBar width={width} />
        {handleMenuContent()}
      </div>
    );
}

export default Menu;
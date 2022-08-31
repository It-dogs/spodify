/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import classnames from 'classnames';
import { Box, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createUseStyles } from 'react-jss';
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Color } from '../../style/color';
import logo from '../../../image/logo_white.png';
import emitter from '../../utils/emitter';

const tableStyle = createUseStyles({
    container: {
        width: '100%',
        heigth: '100%'
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start'
    },
    box: {
        width: '100%'
    },
    appName: {
        color: '#FFFFFF',
        paddingTop: 27,
        paddingLeft: 5
    },
    itemText: {
        paddingTop: 2
    }
})


const list = (hoverItem, activeItem) => [
    ['Home', <HomeIcon style={{ color: activeItem.index==0? '#FFFFFF':(hoverItem.index==0? '#FFFFFF':Color.GREY) }}/>], 
    ['Search', <SearchOutlinedIcon style={{ color: activeItem.index==1? '#FFFFFF':(hoverItem.index==1? '#FFFFFF':Color.GREY) }}/>], 
    ['Your Library', <BookmarksOutlinedIcon style={{ color: activeItem.index==2? '#FFFFFF':(hoverItem.index==2? '#FFFFFF':Color.GREY) }}/>], 
    ['Create PlayList', <AddBoxIcon style={{ color: activeItem.index==3? '#FFFFFF':(hoverItem.index==3? '#FFFFFF':Color.GREY) }}/>], 
    ['Liked Songs', <FavoriteOutlinedIcon style={{ color: activeItem.index==4? '#b0003f':(hoverItem.index==4? '#b0003f':Color.GREY) }}/>]];

export default function ListTable(props) {
   const [hoverItem, setHoverItem] = useState({index: null});
   const [activeItem, setActiveItem] = useState({index: 0});
   let navigate = useNavigate();
   const classes = tableStyle();

   //emit signal for tab change in sidebar
   useEffect(() => {
      switch(activeItem.index) {
        case 0: 
          emitter.emit('home');
          navigate("/home");
          break;
        case 1: 
          emitter.emit('search');
          break;
        case 2: 
          emitter.emit('library');
          break;
        case 3: 
          emitter.emit('create_playlist');
          break;
        case 4: 
          emitter.emit('liked_songs');
          break;
      }
   }, [activeItem]);


   useEffect(() => {
    emitter.on('null', ()=>setActiveItem({index: null}));
    return () => {
      emitter.off('null');
    }
   }, [])

   return (
    <div className={classes.container}>
      <Box className={classnames(classes.box, classes.logoContainer)}>
        <Avatar alt="logo" src={logo} sx={{ marginTop:3, marginLeft:3, width: 45, height: 45 }} />
        <Typography className={classes.appName} variant="h5">Spodify</Typography>
      </Box>
      <Box className={classes.box}>
        <List>
          {list(hoverItem, activeItem).map((item, index) =>
            <ListItem 
                onMouseOver={()=>setHoverItem({index: index})}
                onMouseOut={()=>setHoverItem({index: null})}
            >
              <ListItemButton onClick={()=>setActiveItem({index: index})}>
                <ListItemIcon>
                  { item[1] }
                </ListItemIcon>
                <ListItemText 
                    primary={item[0]} 
                    className={classes.itemText}
                    sx={{color: activeItem.index==index? '#FFFFFF':(hoverItem.index==index? '#FFFFFF':Color.GREY)}}
                />
              </ListItemButton>
            </ListItem>  
          )}
        </List>
      </Box>
    </div>
   );

}

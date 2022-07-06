import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import NavBar from '../NavBar';
import Home from '../../home';
import emitter from '../../utils/emitter';
import spotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';
import { Typography } from "@mui/material";

//create instance for spotify web api
const spotify = new spotifyWebApi();

//const categories = {topLists: 'Top Lists'};  //Global Top 50

const menuStyle = createUseStyles({
  container: {
    width: '100%',
    height: '100%',
    overflowY: 'auto'
  }
})

const Menu = (props) => {
    const classes = menuStyle();
    const { token } = props;
    const [currentPage, setCurrentPage] = useState('home');
    //const [topList, setTopList] = useState([]);
    const [categories, setCategories] = useState([]);

    //listen to the tab change
    useEffect(() => {
      emitter.on('home', ()=>setCurrentPage('home'));
      emitter.on('search', ()=>setCurrentPage('search'));
      emitter.on('library', ()=>setCurrentPage('library'));
      emitter.on('create_playlist', ()=>setCurrentPage('create_playlist'));
      emitter.on('liked_songs', ()=>setCurrentPage('liked_songs'));
      
      //if token exist, register that token to the api
      token && spotify.setAccessToken(token);

     /*  //call spotify web api for list of categories
      spotify
        .getCategories()
          .then(data=> {
            console.log(data);
            let list = [];
            const categoryList = data.categoryList.categories.items;
            categoryList.forEach(item => {
              let temp = {};
              temp.id = item.id? item.id:null;
              temp.name = item.name? item.name:null;
              !_.isEmpty(temp) && list.push(temp);
            });
            setCategories(list);
          })
            .catch(err=>console.log(err)); */
    
      return () => {
        emitter.off('home');
        emitter.off('search');
        emitter.off('library');
        emitter.off('create_playlist');
        emitter.off('liked_songs');
      }
    }, [token]);

    useEffect(() => {
      
      //call spotify web api for list of categories
      spotify
        .getCategories()
          .then(data=> {
            console.log(data);
            let list = [];
            const categoryList = data.categories.items;
            categoryList.forEach(item => {
              let temp = {};
              temp.id = item.id? item.id:null;
              temp.name = item.name? item.name:null;
              !_.isEmpty(temp) && list.push(temp);
            });
            setCategories(list);
          })
            .catch(err=>console.log(err));

      /* spotify
        .getCategoryPlaylists('pop')
          .then(data => {
            //console.log(data.playlists.items);
            const playList = data.playlists.items;
            let list = [...topList];
            playList.forEach(item => {
              let temp = {};
              temp.id = item.id? item.id:null;
              temp.description = item.description? item.description:null;
              temp.url = item.images[0].url? item.images[0].url:null;
              temp.name = item.name? item.name:null;
              temp.tracks = item.tracks.href? item.tracks.href:null;
              !_.isEmpty(temp) && list.push(temp);
            });
            setTopList(list);
          })
            .catch(err=>console.log(err)); */
    }, []);


    const handleMenuContent = () => <>
      <div style={{display: currentPage==='home'? 'flex':'none', height: '100%', flexDirection: 'column', justifyContent: 'start' }}>
        {/* <Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{categories.topLists}</Typography> */}
        <Home token={token} categories={categories} spotify={spotify}/>
      </div>
    </>

    return (
      <div className={classes.container}>
        <NavBar />
        {handleMenuContent()}
      </div>
    );
}

export default Menu;
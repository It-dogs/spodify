import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import NavBar from '../NavBar';
import Home from '../../home';
import emitter from '../../utils/emitter';
import spotifyWebApi from 'spotify-web-api-js';
import '../../style/scrollBarStyle.css';
import _ from 'lodash';
import { Typography } from "@mui/material";

//create instance for spotify web api
//const spotify = new spotifyWebApi();

//const categories = {topLists: 'Top Lists'};  //Global Top 50

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
    const { token, spotify, categories, width } = props;
    const [currentPage, setCurrentPage] = useState('home');
    const [playList, setPlayList] = useState(null);
    //const [categories, setCategories] = useState([]);

    //listen to the tab change
    useEffect(() => {
      emitter.on('home', ()=>setCurrentPage('home'));
      emitter.on('search', ()=>setCurrentPage('search'));
      emitter.on('library', ()=>setCurrentPage('library'));
      emitter.on('create_playlist', ()=>setCurrentPage('create_playlist'));
      emitter.on('liked_songs', ()=>setCurrentPage('liked_songs'));
      
      //if token exist, register that token to the api
      //token && spotify.setAccessToken(token);

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
    }, []);

    async function handleRequest() {
      try { 
        let listObj = {};
        let data = await Promise.all(
          categories.map( category => {    //console.log(category.name);
            listObj[[category.name]] = [];
            spotify.getCategoryPlaylists(category?.id)
            .then(res => {
              const itemList = res.playlists.items; 
              itemList.forEach(item => {
                let temp = {}; 
                temp.id = item? item.id:null;
                temp.description = item? item.description:null;
                temp.url = item? item.images[0].url:null;
                temp.name = item? item.name:null;
                temp.tracks = item? item.tracks.href:null;
                (!_.isEmpty(temp) && category) && listObj[[category.name]].push(temp);
              }); //console.log(listObj[[category.name]]);
            })
            return listObj[[category.name]];
        }));
        //console.log(listObj);
        const res = await data;
        res && setPlayList(listObj);
      } catch (error) {
        console.log(error); 
      }
    };

    useEffect(() => {
      !_.isEmpty(categories) && handleRequest(); 
    }, [categories]);

    /* useEffect(() => {
      //call spotify web api for list of categories
      spotify
        .getCategories()
          .then(data=> {
            //console.log(data);
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
      }, []);
    */

    const handleMenuContent = () => <>
      <div className={classes.homeContainer} style={{display: currentPage==='home'? 'flex':'none'}}>
        {/* <Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{categories.topLists}</Typography> */}
        <Home token={token} playList={playList} categories={categories} spotify={spotify}/>
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
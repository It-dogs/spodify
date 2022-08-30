import React, { useState, useEffect, useLayoutEffect } from "react";
import { createUseStyles } from 'react-jss';
import Sidebar from "../components/sidebar/sidebar";
import Menu from "../components/Menu";
import _ from 'lodash';
import '../style/sidebarStyle.css';
import spotifyWebApi from 'spotify-web-api-js';

//create instance for spotify web api
const spotify = new spotifyWebApi();

const mainStyle = createUseStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    //border: 'solid', borderColor: 'blue'
  },
  /* frame: {
    width: state => `calc(100vw - ${state.width}px)`,
    //border: 'solid'
  } */
})

export default function Dashboard(props) {
  const { token } = props;
  const [width, setWidth] = useState(null);
  const [playList, setPlayList] = useState(null);
  const classes = mainStyle({state: {width}});

  const updateWidthOfSidebar = val => setWidth(val);

  useEffect(() => token && spotify.setAccessToken(token), [token]);

  async function handleRequest(categories) {  
    try {  //spotify web api for list of playlists of each category
      let data = await Promise.all(
        categories.map( category => {  
          return spotify.getCategoryPlaylists(category?.id).then(res => { 
            let listObj = {};
            listObj[[category.name]] = [];
            const itemList = res.playlists.items;
            itemList.forEach(item => {
              let temp = {}; 
              temp.id = item? item.id:null;
              temp.categoryId = item? category.id:null;
              temp.description = item? item.description:null;
              temp.url = item? item.images[0].url:null;
              temp.name = item? item.name:null;
              temp.tracks = item? item.tracks.href:null;
              (!_.isEmpty(temp) && category) && listObj[[category.name]].push(temp);
            }); 
            if(_.isEmpty(listObj[[category.name]])) delete listObj[[category.name]];
            return listObj; 
          });
      }));
      let obj;
      if(data) obj = data.reduce((x, y) => Object.assign(x, y)); 
      !_.isEmpty(obj) && setPlayList(obj);
    } catch (error) {
      console.log(error); 
    }
  };

  useLayoutEffect(() => {
    //spotify web api for list of categories
    spotify
      .getCategories()
        .then(data=> {
          let list = [];
          const categoryList = data.categories.items; 
          categoryList.forEach(item => {
            let temp = {};
            temp.id = item.id? item.id:null;
            temp.name = item.name? item.name:null;
            !_.isEmpty(temp) && list.push(temp);
          });
          return list;
        })
          .then(list => {
            !_.isEmpty(list) && handleRequest(list);
          })
            .catch(err=>console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      <Sidebar updateWidthOfSidebar={updateWidthOfSidebar} />
      <div style={{width: `calc(95vw - ${width}px)`}} className="appFrame"> 
        <Menu width={width} playList={playList} {...props} />
      </div>
    </div>
  ); 
}

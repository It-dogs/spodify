import React, { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState([]);
  const classes = mainStyle({state: {width}});

  const updateWidthOfSidebar = val => setWidth(val);

  useEffect(() => token && spotify.setAccessToken(token), [token]);

  useEffect(() => {
    //call spotify web api for list of categories
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
          setCategories(list);
        })
          .catch(err=>console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      <Sidebar updateWidthOfSidebar={updateWidthOfSidebar} />
      <div style={{width: `calc(95vw - ${width}px)`}} className="appFrame"> 
        <Menu width={width} categories={categories} spotify={spotify} {...props} />
      </div>
    </div>
  ); 
}

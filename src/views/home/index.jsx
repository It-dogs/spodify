import React, { useState, useEffect, useLayoutEffect, memo } from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowSize from "../utils/hook/useWindowSize";
import { createUseStyles } from 'react-jss';
import { Color } from '../style/color';
//import useForceUpdate from "../utils/hook/useForceUpdate";
import _ from 'lodash';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../style/swiperStyle.css';

const homeStyle = createUseStyles({
    container: {
      maxWidth: '100%',
      minHeight: 280,
      display: 'block',
      flexDirection: 'row',
      overflow: 'hidden'
    },
    card: {
      marginLeft: 25,
      width: 180, 
      height: 250, 
      marginTop: 20,
      borderRadius: 5,
      display: 'inline-block', 
      justifyContent: '100%', 
      background: Color.LIGHT_BLACK,
      '& :hover': {
        background:  Color.DEEP_GREY
      }  
    },
    text_title: {
      color: '#FFFFFF',
      fontWeight: 700
    },
    text_desc: {
      width: 150,
      color: Color.GREY,
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis'
    }
})
  
const Home = memo((props) => {
    const classes = homeStyle();
    const { playList/* , categories, spotify */ } = props;
    const size = useWindowSize(); 
    const [slide, setSlide] = useState(1);
    //const [playList, setPlayList] = useState(null);

    /* async function handleRequest() {
      try { 
        let listObj = {};
        let data = await Promise.all(
          categories.map( category => { //console.log(category.name);
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
    }; */


    /* useLayoutEffect(() => {
      //console.log(categories);
      //let listObj = {};
      !_.isEmpty(categories) && handleRequest();
      
      /* for(let i=0; i<categories.length; i++) {
        if(categories[i]) listObj[[(categories[i]).name]] = [];
        categories && spotify
         .getCategoryPlaylists(categories[i]?.id)
          .then(data => {
            const itemList = data.playlists.items;
            itemList.forEach(item => {
              let temp = {};
              temp.id = item.id? item.id:null;
              temp.description = item.description? item.description:null;
              temp.url = item.images[0].url? item.images[0].url:null;
              temp.name = item.name? item.name:null;
              temp.tracks = item.tracks.href? item.tracks.href:null;
              (!_.isEmpty(temp) && categories[i]) && listObj[[(categories[i]).name]].push(temp);
            });
            setPlayList(listObj);
          })
          //.then(() => setPlayList(listObj))
          .catch(err=>console.log(err));
      } 
      //!_.isEmpty(listObj) && setPlayList(listObj); 
    }, [categories]); */


    const slidePerView = size => {
      if(size.width>=1170 && size.width<1426) {
        setSlide(4);
      } else if(size.width<1170 && size.width>=1026) {
        setSlide(3);
      } else if(size.width<1026 && size.width>=736) {
        setSlide(2);
      } else if(size.width<736) {
        setSlide(1);
      } else setSlide(5);
    };

    useEffect(() => {
      size && slidePerView(size);
    }, [size]);

    /* useEffect(() => { 
      console.log(playList);
      //playList && Object.keys(playList).map((i)=>console.log(playList[i]));
    }, [playList]); */
    
    
    return (
      <>
       { playList && Object.keys(playList).map((category, index) => <>
            {<Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{category}</Typography>}
            <div className={classes.container}>
              <Swiper
                spaceBetween={18}
                slidesPerView={slide}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                allowTouchMove={false}
                navigation={true}
                pagination={{ clickable: true }}
              >
                {   
                    playList && playList[Object.keys(playList)[index]].map( item =>
                      <SwiperSlide>
                      <Card className={classes.card}>
                        <CardActionArea sx={{
                           width: '100%', 
                           display: 'flex', 
                           flexDirection: 'column',
                           justifyContent: 'start', 
                           alignItems: 'center',
                           paddingTop: 2.5 }}>
                          <CardMedia
                            sx={{width: 160, borderRadius: 1}}
                            component='img'
                            height='150'
                            src={item?.url}
                          />
                          <CardContent>
                            <Typography variant='body2' className={classes.text_title}>{item?.name}</Typography>
                            <Typography variant='body2' className={classes.text_desc}>{item?.description}</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      </SwiperSlide>)
                }
              </Swiper>
            </div></>) }
      </>
    ); 
})

export default Home;
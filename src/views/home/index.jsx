import React, { useState, useEffect, memo } from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ContentLoader from "react-content-loader";
import useWindowSize from "../utils/hook/useWindowSize";
import { createUseStyles } from 'react-jss';
import { Color } from '../style/color';
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
      //display: 'block',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
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
    loading: {
      width: 180, 
      height: 250, 
      borderRadius: 5,
      background: Color.LIGHT_BLACK,
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
    let { playList } = props;
    const size = useWindowSize(); 
    const [slide, setSlide] = useState(1);
    const dummy = [{}, {}, {}, {}];
    
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
    
    return (
      <>
       {  playList? Object.keys(playList).map((category, index) => <>
            {<Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{category}</Typography>}
            <div className={classes.container}>     
             {/*  <Swiper
                spaceBetween={18}
                slidesPerView={slide}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                allowTouchMove={false}
                navigation={true}
                pagination={{ clickable: true }}
              > */}
                {   
                    playList && playList[Object.keys(playList)[index]].map( item =>
                     /* <SwiperSlide> */
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
                      /* </SwiperSlide> */)
                }
              {/* </Swiper> */}
            </div></>):
            dummy.map(() => <>
              <div style={{height: 28}}>{
                <ContentLoader 
                  speed={1.5}
                  viewBox="0 0 100 160"
                  backgroundColor="#858585"
                  foregroundColor="#ababab"
                  {...props}
                >
                  <rect x="1" y="0" width="8" height=".8" />
                </ContentLoader>}
              </div>
              <div className={classes.container}>
                {dummy.map(() => <Card className={classes.loading}><CardContent>{
                  <ContentLoader 
                    speed={1.5}
                    viewBox="0 0 100 160"
                    backgroundColor="#858585"
                    foregroundColor="#ababab"
                    {...props}
                  >
                    <rect x="0" y="0" width="100%" height="90" />
                    <rect x="0" y="120" width="100%" height="5" />
                    <rect x="0" y="130" width="70%" height="5" />
                  </ContentLoader>
                }</CardContent></Card>)}
              </div>
            </>)  
        }
      </>
    ); 
});

export default Home;
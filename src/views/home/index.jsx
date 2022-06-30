import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, CardActionArea, CardActions, CardMedia, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowSize from "../utils/hook/useWindowSize";
import { createUseStyles } from 'react-jss';
import { Color } from '../style/color';
import 'swiper/css';

const homeStyle = createUseStyles({
    container: {
      maxWidth: '100%',
      height: 250,
      padding: 30,
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
      'text-overflow': 'ellipsis',
      //resize: 'horizontal',
    }
})
  
export default function Home(props) {
    const classes = homeStyle();
    const { topList } = props;
    const size = useWindowSize(); 
    const [slide, setSlide] = useState(1);

    useEffect(() => {
      //console.log(topList);
    }, [topList]);
    
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
      console.log(size);
      size && slidePerView(size);
    }, [size]);

   
    return (
      <div className={classes.container}>
        <Swiper
          spaceBetween={18}
          slidesPerView={slide}
          onSlideChange={() => console.log('slide change')}
          //onSwiper={(swiper) => console.log(swiper)}
        >
        { topList && topList.map( item =>
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
              height='140'
              src={item?.url}
            />
            <CardContent>
              <Typography variant='body2' className={classes.text_title}>{item?.name}</Typography>
              <Typography variant='body2' className={classes.text_desc}>{item?.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </SwiperSlide>
        )}
        </Swiper> 
      </div>
    ); 
}
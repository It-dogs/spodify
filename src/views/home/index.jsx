import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, CardActionArea, CardActions, CardMedia, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Color } from '../style/color';

const homeStyle = createUseStyles({
    container: {
      width: 'inherit',
      height: '100%',
      'justify-self': 'center',
      padding: 30,
      display: 'flex',
      flexDirection: 'row',
      'flex-wrap': 'wrap',
      justifyContent: 'space-between',
      overflowY: 'auto',
      border: 'solid', borderColor: '#FF11FF'
    },
    card: {
      width: 180, 
      height: 250, 
      marginTop: 20,
      borderRadius: 5,
      display: 'flex', 
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
  
    useEffect(() => {
      //console.log(topList);
    }, [topList]);

    return (
      <div className={classes.container}>
        { topList && topList.map( item =>

        <Card className={classes.card}>
          <CardActionArea sx={{
             width: '100%', 
             display: 'flex', 
             flexDirection: 'column',
             justifyContent: 'start', 
             alignItems: 'center',
             paddingTop: 1.5 }}>
            <CardMedia
              sx={{width: 150, borderRadius: 1}}
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

        )} 
      </div>
    ); 
}
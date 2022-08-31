import React, { useState, useEffect, memo } from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Color } from '../style/color';
import { useLocation } from "react-router-dom";
import { BorderColor } from "@mui/icons-material";

const style = createUseStyles({
    container: {
        maxWidth: '100%',
        minHeight: 280,
        flexWrap: 'wrap'
    },
    card: {
        marginLeft: 25,
        width: 180, 
        height: 250, 
        marginTop: 10,
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
        maxWidth: 150,
        color: Color.GREY,
        'white-space': 'nowrap',
        overflow: 'hidden',
        'text-overflow': 'ellipsis'
    }
})

const Category = memo((props) => {
    const classes = style();
    const location = useLocation();
    const { category, playList } = location.state;

    return (
      <><Typography variant='h5' sx={{color: '#FFFFFF', marginLeft: 2}}>{category}</Typography>
      <div className={classes.container}>
        {playList && playList.map(item =>
            <Card className={classes.card}> 
                <CardActionArea sx={{
                    width: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'start', 
                    alignItems: 'center',
                    paddingTop: 2.5 }}
                >
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
        )}
      </div></>
    );
});

export default Category;
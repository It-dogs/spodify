import React, { useState, useLayoutEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, TextField, Button, Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { styled } from '@mui/system';
import { Color }  from '../style/color';
import logo from '../../image/logo_green.png';

const ForgotPwStyle = createUseStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appName: {
        paddingLeft: 5
    },
    wrapper: {
        marginTop: 150,
        minWidth: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerWrapper: {
        width: '100%',
        marginTop: 20
    },
    labelText: {
        display: 'flex',
        'justify-self': 'flex-start'
    },
    link: {
        marginTop: 50
    }
})

const Title = styled(Typography)({
    fontSize: 25,
    fontWeight: 750,
    color: Color.DEEP_BLACK
})

const Label = styled(Typography)({
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 500,
    color: Color.GREY
})

const Input = styled(TextField)({
    width: '100%'
})

const SendButton = styled(Button)({
    width: '100%',
    marginTop: 15,
    color: Color.GREY,
    border: 'solid',
    borderColor: Color.GREY,
    background: 'transparent',
    borderRadius: 25,
    '&:hover': {
        background: Color.GREEN,
        color: '#FFFFFF',
        border: 'solid',
        borderColor: Color.GREY
    }
})

export default function ForgotPw(props) {
    const [email, setEmail] = useState(null);
    const classes = ForgotPwStyle();
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <AppBar sx={{ boxShadow: 'none', backgroundColor: Color.LIGHT_BLACK}}>
                <Toolbar sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box className={classes.box}>
                        <Avatar alt="logo" src={logo} sx={{ marginTop: 1 , width: 65, height: 65 }} />
                        <Typography className={classes.appName} variant="h5">Spodify</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <div className={classes.wrapper}>
                <Title>Forgot Password</Title>
                <div className={classes.innerWrapper}>
                  <div className={classes.labelText}>
                    <Label>Email adress</Label>
                  </div>
                  <Input 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <SendButton>SEND</SendButton> 
                <div className={classes.link}><Link component="button" color={Color.GREEN} onClick={()=>navigate('/')}>Go back to Log In</Link>  </div>
            </div>  
        </div>
    );
}  
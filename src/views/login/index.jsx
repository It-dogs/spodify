import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, Checkbox, Link } from "@mui/material";
import { loginStyle } from '../style/loginStyle';
import { useNavigate } from 'react-router-dom';
import { Color } from '../style/color';
import { Title, Label, Input, LoginButton, SignUpButton } from '../style/loginStyle';
import logo from '../../image/logo_green.png';
import * as authorization from "../../authorization";

export default function Login(props) {
    const [stateObj, setStateObj] = useState({email: 'spotify-clone@gmail.com', pw: 'abc123'});
    const { api_uri, client_id, redirect_uri, scopes } = authorization;
    const classes = loginStyle();
    const navigate = useNavigate();
 
    const handleLogin = () => {
      window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}/callback&scope=${scopes.join(
        " "
      )}&response_type=token&show_dialog=false`;
    }

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
            <Title>LOGIN</Title>
            <div className={classes.innerWrapper}>
              <div className={classes.labelText}>
                <Label>
                  Email adress
                </Label>
              </div>
              <Input 
                value={stateObj.email}
                onChange={(e)=>setStateObj({...stateObj, email: e.target.value})}
              />
              <div>
                <Label className={classes.labelText}>
                  Password
                </Label>
              </div>
              <Input 
                type="password"
                value={stateObj.pw}
                onChange={(e)=>setStateObj({...stateObj, pw: e.target.value})}
              />
              <div className={classes.linkPw}>
                <Link component="button" color={Color.GREY} onClick={()=>navigate('/forgot/password')}>Forgot your password?</Link>
              </div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'row', marginTop:8}}>
                   <Checkbox style={{color: Color.GREEN}} />
                   <Typography sx={{marginTop:1.2}}>Remember me</Typography>
                </div>
                <LoginButton
                  onClick={handleLogin}
                >
                  LOG IN
                </LoginButton>
              </div>
            </div>
            <Label> Dont have an account? </Label>
            <SignUpButton onClick={()=>navigate('/sign_up')}>
                SIGN UP 
            </SignUpButton>
          </div> 
        </div>
    ); 
}
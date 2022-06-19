import React, { useState, useLayoutEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, Link, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Lens from '@mui/icons-material/Lens';
import { Color } from '../style/color';
import { signUpStyle } from '../style/signUpStyle';
import { Title, Label, Input, SignUpButton } from '../style/signUpStyle';
import logo from '../../image/logo_green.png';

export default function SignUp(props) {
    const [stateObj, setStateObj] = useState({name:null, email:null, pw:null, gender:null});
    const classes = signUpStyle();
    const navigate = useNavigate();

    const RadioButtonsGroup = () => <FormControl sx={{diaplay:'flex', flexDirection:'row', color:Color.GREEN}}>
      <FormLabel sx={{marginTop:1.2, marginRight:2}}>Gender</FormLabel>
      <RadioGroup sx={{diaplay:'flex', flexDirection:'row'}} value={stateObj.gender} onChange={(e)=>setStateObj({...setStateObj, gender: e.target.value})}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>

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
            <Title>
              SIGN UP
            </Title>
            <div className={classes.innerWrapper}>
              <div className={classes.labelText}>
                <Label>
                  Profile name
                </Label>
              </div>
              <Input 
                value={stateObj.name}
                onChange={(e)=>setStateObj({...stateObj, name: e.target.value})}
              />
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
            </div>
            {RadioButtonsGroup()}
            <SignUpButton>
                SIGN UP 
            </SignUpButton>
            <div style={{display:'flex', flexDirection:'row'}}>
                <Label>Have an account?</Label>
                <div style={{marginTop:8, marginLeft:3}}>
                    <Link component="button" color={Color.GREEN} onClick={()=>navigate('/')}>Log in</Link>
                </div>
            </div>
          </div>
        </div>
    ); 
}
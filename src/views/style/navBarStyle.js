import { createUseStyles } from 'react-jss';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Color }  from './color';


export const navbarStyle = createUseStyles({
    wrapper: {
        width: '100%'
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        height: 32,
        backgroundColor: 'transparent',
        boxShadow: 'none'
    },
    container: {
        display: "flex",
        flexDirection: "row"
    },
    form: {
        marginLeft: 35,
        marginTop: 10
    },
    textField: {
        backgroundColor: '#FFFFFF',
        width: 350,
        height: 35,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center'
    },
    menu: {
        background: Color.DEEP_BLACK
    },
    linkPw: {
        marginTop: 250,
        border: 'solid'
    }
})

export const NavButton = styled(IconButton)({
    borderRadius: '50%',
    backgroundColor: Color.DEEP_BLACK,
    marginTop: 10,
    marginLeft: 15,
    width: 35,
    height: 35
})

export const MenuButton = styled(Button)({
    borderRadius: 25,
    minWidth: 80,
    backgroundColor: Color.DEEP_GREY,
    marginTop: 10,
    marginRight: 15,
    color: '#FFFFFF'
})

export const MenuList = styled(Menu)({
    'backdrop-filter': 'blur(1.5px) brightness(40%)',
    
})

export const MenuItems = styled(MenuItem)({
    background: Color.DEEP_GREY,
    color: '#FFFFFF',
    fontWeight: 500,
    '&:hover': {
        background: Color.GREY 
    }
})
import { createUseStyles } from 'react-jss';
import { Typography, TextField, Button } from "@mui/material";
import { styled } from '@mui/system';
import { Color }  from './color';

export const loginStyle = createUseStyles({
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
        justifyContent: 'center',
        //border: 'solid'
    },
    innerWrapper: {
        width: '100%',
        marginTop: 20
    },
    labelText: {
        display: 'flex',
        'justify-self': 'flex-start'
    }
})

export const Title = styled(Typography)({
    fontSize: 35,
    fontWeight: 750,
    color: Color.GREEN
})

export const Label = styled(Typography)({
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 500,
    color: Color.GREY
})

export const Input = styled(TextField)({
    width: '100%'
})

export const LoginButton = styled(Button)({
    width: 100,
    marginTop: 15,
    color: '#FFFFFF',
    background: Color.GREEN,
    border: 'solid',
    borderRadius: 25,
    '&:hover': {
        background: '#005e23',
        border: 'solid',
        borderColor: Color.DEEP_BLACK
    }
})

export const SignUpButton = styled(Button)({
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


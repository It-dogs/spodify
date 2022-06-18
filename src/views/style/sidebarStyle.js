import { createUseStyles } from 'react-jss';
import { Color }  from './color';


export const sidebarStyle = createUseStyles({
    sidebar: {
        flex: 1,
        'flex-grow': 0,
        'flex-shrink': 0,
        minWidth: 250,
        maxWidth: 300,
        display: 'flex',
        borderRight: '1px solid',
        borderRightColor: Color.LIGHT_BLACK,
        flexDirection: 'row',
        background:  Color.DEEP_BLACK,
        'box-shadow': '-8px 2px 22px -7px rgba(0, 0, 0, 0.25)',
        'z-index': 2,
    },
    'sidebar, sidebarContent': {
        flex: 1
    },
    appFrame: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: Color.LIGHT_BLACK,
        height: '100vh',
        maxHeight: '100%',
        'box-shadow': '8px 2px 32px -2px rgba(0, 0, 0, 0.25)',
        'z-index': 1
    },
    'sidebar, sidebarResizer': {
        background: '#aabbcc',
        'flex-grow': 0,
        'flex-shrink': 0,
        'flex-basis': 6,
        'justify-self': 'flex-end',
        cursor: 'col-resize',
        resize: 'horizontal',
    }

})
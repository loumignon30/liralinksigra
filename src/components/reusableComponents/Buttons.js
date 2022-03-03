import React from 'react'
import { Button as MButton } from '@mui/material';
import '../../App.css'
import { makeStyles  } from '@mui/styles';

export default function Buttons(props) {
    const { text, size, color, variant, onClick, classNameB, ...other } = props  // ... = other properties    

    return (
        <MButton style={{margin:'12px', textTransform:'capitalize', 
        backgroundColor: "black !important"}}
            variant={variant || "contained"}
            size={size  || "large"}
            text={text}
            color={color || "primary"}
            onClick={onClick}
            //className={classes.root}
            {...other}
           
            >
                {text}
        </MButton>
    )
}

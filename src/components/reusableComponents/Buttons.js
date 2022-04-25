import React from 'react'
import { Button as MButton } from '@mui/material';
import '../../App.css'
import { makeStyles } from '@mui/styles';

export default function Buttons(props) {

    

    const { text, size, color, variant, onClick, classNameB, width,
         ...other
         } = props  // ... = other properties    

    return (
        <MButton style={{margin:'12px', textTransform:'none', 
        backgroundColor: "black !important",
        width: props.width,
        fontSize:"8px",
        maxWidth: '100%', maxHeight: '30px', minWidth: '10%', minHeight: '30px'
        }}
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

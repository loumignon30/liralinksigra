import { TextField } from '@mui/material';
import React from 'react';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';

export default function Input(props) {

    const propsInput = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color,
        width: props.width,
        marginLeft: props.marginLeft,
        height: props.height
    }
    const classes = useStylesSearchTable(propsInput);

    const { name, placeHolder, value, onChange, type, className, height,
        error = null, disabled, width, marginLeft, ...other } = props;

    return (
        <TextField 
            //helperText="Validation needed"
            variant="outlined"
            size="small"
            name={name}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            type={type}
            margin="dense"
            {...other}
            className={classes.inputStyle}
            {...(error && { error: true, helperText: error })}
            inputProps={{
                 style: {
                     fontSize: '12px', marginBottom: '0px',
                     paddingBottom: '10px',
                     shrink: true
                 }
             }}
        />
    )
}

import { fabClasses, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';

export default function Input(props) {

    const propsTableGrid = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color,
        width: props.width,
        marginLeft: props.marginLeft,
        height: props.height
    }
    const classes = useStylesSearchTable(propsTableGrid);

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

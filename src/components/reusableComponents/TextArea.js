import { TextareaAutosize } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'

export default function TextArea(props) {
    const useStyles = makeStyles({
        root: {
            background: props.backGroundColor || "white",
            color: props.color || "blak",
            width: props.width || "65%",
            maxHeight: props.height || "130px",
            height: "130px",
             marginTop: "5px",
             fontFamily: 'Times New Roman,  Times, serif',
             borderRadius: "12px"
        }
    });

    const { name, placeHolder, value, onChange, type, className,
        error = null, disabled, minRow, width, height, other } = props;

    const classes = useStyles();

    return (
        <TextareaAutosize
           // helperText="Validation needed"
            variant="outlined"
            size="small"
            name={name}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            type={type}
            margin="dense"
           // minRows={minRow}
            {...other}
            className={classes.root}
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

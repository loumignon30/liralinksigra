import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'

const useStyles = makeStyles(theme =>({
    root: {
        //top: theme.spacing(6)
    }
}))

// For the Alert (<Alert> ) need to install npm i -s @material-ui/lab
export default function Notifications(props) {

    const {notify, setNotify} = props
    const classes = useStyles();

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return; // is returning the isOpen: false from setNotify
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar style={{marginTop: '25px'}}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            onClose ={handleClose}
            >

            <Alert
                severity={notify.type}
                onClose ={handleClose}>
                {notify.message}
                </Alert>

        </Snackbar>
    )
}

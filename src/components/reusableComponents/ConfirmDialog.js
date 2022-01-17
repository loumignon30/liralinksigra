import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, 
    Paper, Typography } 
from '@mui/material'
import { NotListedLocation } from '@mui/icons-material';
import React from 'react'
import Controls from '../../components/reusableComponents/Controls'
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(theme =>({
    dialog: {
       // padding:theme.spacing(2),
        position:'absolute',
        //top:theme.spacing(5)
    },
    DialogTitle: {
        textAlign: 'center'
    },
    DialogContent: {
        textAlign: 'center'
    },
     DialogActions:{
         justifyContent:'center'
     },

     titleIcon: {
        // backgroundColor: theme.palette.secondary.light,
       //  color: theme.palette.secondary.main,
        // '&:hover': {
             //backgroundColor: theme.palette.secondary.light,
           //  cursor: 'default'
        // },
         //'& .MuiSvg-root': {
           //  fontSize: '8rem'
        // }
     }
}))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    const classes=useStyle();
    

    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.DialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocation/>
                </IconButton>

            </DialogTitle>

            <DialogContent className={classes.DialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>

                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>

            </DialogContent>

            <DialogActions>
                <Controls.Buttons
                text="no"
                color="default"
                onClick={()=> setConfirmDialog({
                    ...confirmDialog,
                    isOpen:false
                })}
                />
                <Controls.Buttons
                text="Yes"
                color="secondary"
                onClick={confirmDialog.onConfirm}
                />

            </DialogActions>

        </Dialog>
    )
}

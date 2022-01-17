import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { boxSizing, typography } from '@mui/system';
import React, { useState } from 'react';
import Controls from "../reusableComponents/Controls"
import "./popup.css";

export default function Popup(props) {

    const useStyles = makeStyles(themes => ({
        dialogWrapper: {
            //paddingTop: (5),
            marginTop: 95,
            paddingRight: 0,
            height: props.height || 500,
            width: props.width || 700,
            position: 'absolute',
            top: props.marginTop || 0,
            //position: 'absolute',
            //top: (5)
        },
        pageHeaderStyle: {
            paddingBottom: 30
        }
    }))

    const { title, children, openPopup, setOpenPopup, className, pageHeader, buttonColor,
        height, width, closeButtonDisplay, marginTop} = props;
    const classes = useStyles();
    const [closeButtonDisplayForHere, setCloseButtonDisplayForHere] = useState(closeButtonDisplay)

    if(closeButtonDisplayForHere === undefined){  // if the close button is called ouside the Year component 
        setCloseButtonDisplayForHere(true);
    }
   

    return (
        <Dialog maxWidth="lg" classes={{ paper: classes.dialogWrapper }}  // xs, sm, md, lg, xl,
            open={openPopup}
            className={className}
        >
            <div>
                <DialogTitle>

                    <div className="dialogTitleMain">

                        <span className="dialogTitleSubDiv">
                            {title}
                        </span>

                        {closeButtonDisplayForHere ?
                            <button className="buttonPopup"
                                onClick={() => { setOpenPopup(false) }}>
                                X
                            </button> :
                            null
                        }

                        {/* <Controls.Buttons className="button"
                        text="X"
                        color= {buttonColor}
                        onClick={()=>{setOpenPopup(false)}} /> */}
                    </div>

                </DialogTitle>
            </div>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

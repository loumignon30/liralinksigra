import React from 'react'
import { Paper, Card, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import "./pageHeader.css"
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';

export default function PageHeader(props) {

    const propsTableGrid = {  // grid style: SearchTableStyle.js
        backGroundColor: props.backGroundColor,
        color: props.color,
        width: props.width,
        marginLeft: props.marginLeft,
        height: props.height
    }

    const useStyles = makeStyles({
        root: {
             '&.css-10vhb4s': {  // '&.css-4z9bxz-MuiPaper-root': {
                
          background: props.backGroundColor || "darkBlue",
          color: props.color || "white",
          marginTop: "4px",
          marginLeft: "4px",
          marginRight: "4px",
          width: "100%"
            }
          }
      });
    const { title, subTitle, icon, backGroundColor, color } = props;
    //const classes = useStylesSearchTable(propsTableGrid);


    const classes = useStyles();
    return (
        <div>
            <Paper elevation={1} square
                className={classes.root}
            >
                <div className={"pageHeader2"}>
                    <Card className={"imageIcon"}>
                        {icon}
                    </Card>
                    <div >
                        <Typography
                            variant="h5"
                            component="div">{title}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            component="div">{subTitle}
                        </Typography>
                    </div>

                </div>

            </Paper>
        </div>
    )
}
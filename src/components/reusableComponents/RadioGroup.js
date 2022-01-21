import { FormControl, Radio, FormLabel, RadioGroup as MuiRadioG, FormControlLabel } from '@mui/material';
import React from 'react';
import "../../App.css";
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';

export default function RadioGroup(props) {

    const propsTableGrid = {  // grid style: SearchTableStyle.js
        // backGroundColor: props.backGroundColor,
        // color: props.color,
        // width: props.width,
        // marginLeft: props.marginLeft,
        // height: props.height
    }
    const classes = useStylesSearchTable(propsTableGrid);
    const { name, label, value, onChange, items, className } = props; // will be extracted from props parameters
    
    return (
        <FormControl>
        <MuiRadioG  row
        name={name}
        value={value} 
        onChange={onChange}
        className={classes.radioButton}>
            {
                items.map(item => (
                    <FormControlLabel
                    key={item.id}
                    value={item.id}
                    label={item.title}
                    control={<Radio/>}
                    />
                )
                )
            }
        </MuiRadioG>
        
        </FormControl>

    )
}

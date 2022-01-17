import { FormControl, Radio, FormLabel, RadioGroup as MuiRadioG, FormControlLabel } from '@mui/material';
import React from 'react';
import "../../App.css";

export default function RadioGroup(props) {
    const { name, label, value, onChange, items, className } = props; // will be extracted from props parameters
    
    return (
        <FormControl>
        <MuiRadioG  row
        name={name}
        value={value} 
        onChange={onChange}
        className={className}>
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

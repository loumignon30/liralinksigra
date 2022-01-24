import { FormControl, InputLabel, MenuItem, Select as MuiSelect } 
from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";


export default function Select(props) {
    const {name, label, value, onChange, options, className, typeOfSelect,
        variant} = props;
        const { t } = useTranslation();


    return (
      
        <FormControl
        variant={variant || "outlined"}
        size="small"
        >
        <MuiSelect
        // label={label || null }
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        >
            <MenuItem value="">{t('sexo_none')}</MenuItem>
            {typeOfSelect===1?
            options.map(item =>
                (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
               )
            ):
            options.map(item =>
                (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
               )
            )}
            {/* {
                options.map(item =>
                    (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                   )
                )
            } */}
        </MuiSelect>
        

        </FormControl>
    )
}

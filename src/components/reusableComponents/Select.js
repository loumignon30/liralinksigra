import { FormControl, MenuItem, Select as MuiSelect }
    from '@mui/material';
import React from 'react';
import useStylesSearchTable from '../../components/reusableComponents/SearchTableStyle';

export default function Select(props) {

    const propsSelect = {  // grid style: SearchTableStyle.js
        width: props.width,
        height: props.height
    }
    const classes = useStylesSearchTable(propsSelect);

    const { name, label, value, onChange, options, typeOfSelect,
        variant, width, height } = props;

    return (

        <FormControl
            variant={variant || "outlined"}
            size="small"
            className={classes.selectStyle}
        >
            <MuiSelect
                // label={label || null }
                name={name}
                value={value}
                onChange={onChange}

            >
                <MenuItem value=""></MenuItem>  {/* {t('sexo_none')}*/}
                {typeOfSelect === 1 ?
                    options.map(item =>
                    (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                    )
                    ) :
                    typeOfSelect === 2 ?
                        options.map(item =>
                        (
                            <MenuItem key={item.id}
                                value={item.id}>{item.tipoDenuncia}
                            </MenuItem>
                        )
                        ) :
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

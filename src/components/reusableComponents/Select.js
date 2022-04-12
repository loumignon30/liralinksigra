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
        variant, width, height, error = null } = props;

    return (

        <FormControl
            variant={variant || "outlined"}
            size="small"
            className={classes.selectStyle}
            // inputRef={register({ required: true })}
        >
            <MuiSelect
                // label={label || null }
                name={name}
                value={value}
                onChange={onChange}
                {...(error && { error: true })}

            >
                <MenuItem value=""></MenuItem>  
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
                        typeOfSelect === 3 ?
                        options.map(item =>
                        (
                            <MenuItem key={item.id}
                                value={item.id}>{item.descricao}
                            </MenuItem>
                        )
                        ) :
                        typeOfSelect === 4 ?
                        options.map(item =>
                        (
                            <MenuItem key={item.id}
                                value={item.id}>{item.motivo}
                            </MenuItem>
                        )
                        ):
                        typeOfSelect === 5 ?
                        options.map(item =>
                        (
                            <MenuItem key={item.id}
                                value={item.id}>{item.nome}
                            </MenuItem>
                        )
                        ):
                        typeOfSelect === 6 ?
                        options.map(item =>
                        (
                            <MenuItem key={item.id}
                                value={item.id}>{item.pais}
                            </MenuItem>
                        )
                        ):
                        typeOfSelect === 7 ?
                        options.map(item =>
                        (
                            <MenuItem key={item.id}
                                value={item.id}>{item.cidade}
                            </MenuItem>
                        )
                        ):
                        typeOfSelect === 8 ?
                        options.map(item =>
                        (
                            <MenuItem key={item.id}
                                value={item.pais}>{item.pais}
                            </MenuItem>
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

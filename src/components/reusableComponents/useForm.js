import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'

export function useForm(initialFieldValues, validateOnChange=false, validate) {  
    // validateOnChange=false = some forms don't need real time validation form 
    // validate  = from the form which is calling
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({}); // emplty object = {}


    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        })

        if(validateOnChange)  {  
            // checking is the form is asking the feature of single form validation
           validate({[name]: value})
        }

    }

    return {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors
    }
}

export function Form(props) {
const { children, ...other } = props;  // other receives on submit from the form that is calling him
    return (
        <form autoComplete="off" {...other}>
            {props.children}   {/* showinf inner child - data from the form */}
        </form>

    )
}


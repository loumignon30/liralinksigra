import {
  FormControl,
  FormLabel,
  Checkbox as MyCheckBox,
  FormControlLabel,
  Box,
} from "@mui/material";
import React from "react";

export default function CheckBox(props) {
  const { name, label, value, onChange } = props;
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MyCheckBox
            name={name}
            color="primary"
            checked={value}
            onChange={onChange}
          />
        }
        label={
          <Box
            component="div"
            fontSize={10}
            style={{ 
                flexDirection: 'row',
                flex: 1,
                margin: 10,
                width: "140px",
                marginLeft: "-10px",
                color: "black"
                //  width: "calc(100% - -10px)"
         }}
          >
              {label}
            
          </Box>
        }

        //  label={label}
      />


    </FormControl>
  );
}

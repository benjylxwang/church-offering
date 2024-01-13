import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

export const CurrencyInput = React.forwardRef(
  (props: NumericFormatProps & TextFieldProps, ref) => {
    return (
      <NumericFormat
        fullWidth
        {...props}
        inputRef={ref}
        customInput={TextField}
        decimalScale={2}
        fixedDecimalScale
        InputProps={{
          startAdornment: "£",
        }}
      />
    );
  }
);

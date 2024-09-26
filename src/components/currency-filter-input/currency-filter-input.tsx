import React, {FC} from 'react';
import {NumericFormat, OnValueChange} from "react-number-format";
import {TextField} from "@mui/material";

interface ICurrencyFilterInput {
    onValueChange: OnValueChange;
    defaultValue: number | string | undefined;
}
const CurrencyFilterInput: FC<ICurrencyFilterInput> = ({ onValueChange, defaultValue }) => {

    return (
        <NumericFormat
            InputProps={{
                inputProps: {
                    min: 0
                }
            }}
            variant="outlined"
            prefix="$"
            sx={{
                '& .MuiOutlinedInput-root': {
                    color: "#ffffff",
                    '& input': {
                        padding: "8px 5px",
                    },
                    '& fieldset': {
                        borderRadius: 0,
                        borderColor: "primaryText.main"
                    },
                    "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "primaryText.main"
                        },
                    },
                }
            }}
            defaultValue={defaultValue}
            customInput={TextField}
            thousandSeparator
            onValueChange={onValueChange}
        />
    );
};

export default React.memo(CurrencyFilterInput);
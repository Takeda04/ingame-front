import React, {useState} from 'react';
import {TextField, InputAdornment} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import {FilledInputProps} from "@mui/material/FilledInput";
import {TextFieldVariants} from "@mui/material/TextField/TextField";
import {Theme} from "@mui/material/styles";
import {SxProps} from "@mui/system";

interface CustomTelInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    errorText?: string;
    InputProps?: Partial<FilledInputProps>;
    placeholder?: string;
    variant?: TextFieldVariants;
    sx?: SxProps<Theme>;
}

const formatPhoneNumber = (phone: string) => {
    phone = phone.replace(/\D/g, '');

    if (phone.length <= 2) {
        return phone;
    } else if (phone.length <= 5) {
        return `${phone.slice(0, 2)} ${phone.slice(2)}`;
    } else if (phone.length <= 7) {
        return `${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5)}`;
    } else {
        return `${phone.slice(0, 2)} ${phone.slice(2, 5)}-${phone.slice(5, 7)}-${phone.slice(7, 9)}`;
    }
};

const CustomTelInput: React.FC<CustomTelInputProps> = ({
                                                           value,
                                                           onChange,
                                                           label,
                                                           errorText,
                                                           InputProps,
                                                           placeholder,
                                                           variant,
                                                           sx,
                                                           ...props
                                                       }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        onChange(formattedValue);
    };

    return (
        <TextField
            {...props}
            value={value}
            onChange={handleChange}
            variant={variant}
            placeholder={placeholder}
            sx={sx}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PhoneIcon/>
                    </InputAdornment>
                ),
                ...InputProps
            }}
        />
    );
};
export default CustomTelInput;

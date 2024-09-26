"use client";
import React, {FC} from 'react';
import Button from "@mui/material/Button";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface IButtonProps {
    size: "small" | "medium" | "large";
    sx?: SxProps<Theme>;
    label: string;
    fullWidth?: boolean;
    variant?: "text" | "outlined" | "contained";
    type?: "button" | "submit";
    onClick?: (e: React.MouseEvent) => void;
}

const AppButton: FC<IButtonProps> = ({size, sx, label, fullWidth, variant, type, onClick}) => {

    switch (size) {
        case "large":
            return (
                <Button
                    type={type}
                    size="large"
                    variant={variant || "contained"}
                    fullWidth={fullWidth}
                    onClick={onClick}
                    sx={{
                        borderRadius: 0,
                        fontFamily: '"Inter", sans-serif',
                        fontSize: 24,
                        lineHeight: "24px",
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontWeight: 700,
                        ...sx,
                    }}
                >
                    {label}
                </Button>
            )
        case "small":
            return (
                <Button
                    type={type}
                    size="large"
                    variant={variant || "contained"}
                    fullWidth={fullWidth}
                    onClick={onClick}
                    sx={{
                        borderRadius: 0,
                        fontSize: 18,
                        lineHeight: "20px",
                        fontWeight: 700,
                        ...sx,
                    }}
                >
                    {label}
                </Button>
            )

    }
};

export default AppButton;
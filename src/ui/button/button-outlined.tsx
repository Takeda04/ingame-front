"use client";
import React, {FC} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";

interface IButtonOutlinedProps {
    label: string;
    buttonSx?: SxProps<Theme>;
    lineColor?: string;
    onClick?: () => void;
    sx?: SxProps<Theme>;
}
const ButtonOutlined: FC<IButtonOutlinedProps> = ({ label, buttonSx, lineColor, onClick, sx }) => {
    const theme = useTheme();

    return (
        <Button
            onClick={onClick}
            sx={{
                borderRadius: 0,
                position: "relative",
                borderWidth: "3px",
                overflow: "hidden",
                border: "none",
                padding: "3px",
                backgroundColor: "#D3176D",
                "&:hover": {
                    backgroundColor: "#D3176D",
                },
                ...sx
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    zIndex: 10,
                    margin: "-18px",
                    top: 0,
                    right: 0,
                    width: "35px",
                    height: "35px",
                    transform: "rotate(45deg)",
                    backgroundColor: "#D3176D",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "3px",
                        position: "absolute",
                        background: lineColor ? lineColor : "#000000",
                        zIndex: 11,
                        bottom: "3px",
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: lineColor ? lineColor : "#000000",
                    padding: {xs: "10px 22px",md: "15px 30px"},
                    color: theme.palette.primaryText.main,
                    fontWeight: 600,
                    fontSize: {xs: 16,md: 25},
                    lineHeight: {xs: "19px", md: "30px"},
                    ...buttonSx
                }}
            >
                {label}
            </Box>
        </Button>
    );
};

export default ButtonOutlined;
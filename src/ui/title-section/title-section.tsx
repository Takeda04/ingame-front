"use client";
import React, {FC} from 'react';
import {Typography, useTheme} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface ITitleSection {
    sx?: SxProps<Theme>;
    label: string;
}
const TitleSection: FC<ITitleSection> = ({ sx, label }) => {
    const theme = useTheme();

    return (
        <Typography
            variant="h2"
            component="h2"
            sx={{
                fontSize: {xs: 18,sm: 40},
                lineHeight: {xs: "22px", sm: "49px"},
                fontWeight: 600,
                color: theme.palette.primaryText.main,
                ...sx,
            }}
        >
            {label}
        </Typography>
    );
};

export default TitleSection;
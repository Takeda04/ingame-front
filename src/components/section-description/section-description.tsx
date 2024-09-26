"use client";
import React, {FC} from 'react';
import {Divider, Typography, useTheme} from "@mui/material";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";

interface ISectionDescriptionProps {
    label: string;
    hasOnlyDivider?: boolean;
    sxTitle?: SxProps<Theme>;
}

const SectionDescription: FC<ISectionDescriptionProps> = ({label, hasOnlyDivider, sxTitle}) => {
    const theme = useTheme();

    if (hasOnlyDivider) {
        return (
            <Divider
                sx={{
                    borderColor: theme.palette.primary.main,
                    width: "134px",
                    margin: "20px 0"
                }}
            />
        )
    }

    return (
        <>
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: {xs: 12, sm: 22},
                    lineHeight: {xs: "14px", sm: "27px"},
                    color: theme.palette.primaryText.main,
                    mt: "10px",
                    ...sxTitle,
                }}
            >
                {label}
            </Typography>
            <Divider
                sx={{
                    borderColor: theme.palette.primary.main,
                    width: "134px",
                    margin: {xs: "10px 0", sm: "20px 0"},
                }}
            />
        </>
    );
};

export default SectionDescription;
import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";

interface IAboutDescriptionProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const AboutDescription: FC<IAboutDescriptionProps> = ({sx, children}) => {
    return (
        <Typography
            component="p"
            sx={{
                lineHeight: "20px",
                fontSize: {xs: 14, md: 16},
                color: "#B2B2B2",
                mt: "15px",
                ...sx,
            }}
        >
            {children}
        </Typography>
    );
};

export default AboutDescription;
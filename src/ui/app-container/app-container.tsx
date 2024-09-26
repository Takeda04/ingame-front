import React, {FC} from 'react';
import Box from "@mui/material/Box";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";
interface IAppContainer {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}
const AppContainer: FC<IAppContainer> = ({ children, sx }) => {
    return (
        <Box
            sx={{
                maxWidth: '1260px',
                width: "100%",
                padding: "0 20px",
                margin: "0 auto",
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default AppContainer;
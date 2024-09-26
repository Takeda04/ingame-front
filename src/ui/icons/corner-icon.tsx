import React, {FC} from 'react';
import {SvgIcon} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import Box from "@mui/material/Box";

interface ICornerIcon {
    sx?: SxProps<Theme>;
}
const CornerIcon: FC<ICornerIcon> = ({ sx }) => {
    return (
       <Box></Box>
    );
};

export default CornerIcon;
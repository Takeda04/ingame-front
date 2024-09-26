import { SvgIcon } from '@mui/material';
import React, {FC} from 'react';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface IArrowProps {
    sx?: SxProps<Theme>;
}
const ArrowIcon: FC<IArrowProps> = ({ sx }) => {
    return (
        <SvgIcon
            sx={sx}
        >
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 8.20007L0 0.733398H14L7 8.20007Z" fill="#D3176D"/>
            </svg>
        </SvgIcon>
    );
};


export default ArrowIcon;
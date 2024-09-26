import { SvgIcon, SxProps } from '@mui/material';
import React, {FC} from 'react';
import {Theme} from "@mui/material/styles";

interface ITrashIconProps {
    sx?: SxProps<Theme>;
}

const TrashIcon: FC<ITrashIconProps> = ({ sx }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path d="M1 18H13V4H1V18ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FB6F6F"/>
            </svg>
        </SvgIcon>
    );
};

export default TrashIcon;
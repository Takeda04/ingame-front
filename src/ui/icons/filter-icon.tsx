import React, {FC} from 'react';
import { SvgIcon } from '@mui/material';
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";

interface IFilterIconProps {
    sx?: SxProps<Theme>;
}

const FilterIcon: FC<IFilterIconProps> = ({ sx }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                <rect y="1.5" width="18" height="0.75" fill="white"/>
                <rect y="6" width="18" height="0.75" fill="white"/>
                <rect y="10.5" width="18" height="0.75" fill="white"/>
                <rect x="11.25" width="3.75" height="3.75" fill="#D3176D"/>
                <rect x="3" y="4.5" width="3.75" height="3.75" fill="#D3176D"/>
                <rect x="11.25" y="9" width="3.75" height="3.75" fill="#D3176D"/>
            </svg>
        </SvgIcon>
    );
};

export default FilterIcon;
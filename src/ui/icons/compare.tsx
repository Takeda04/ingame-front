import React, {FC} from 'react';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {SvgIcon} from "@mui/material";

interface ICompareProps {
    sx?: SxProps<Theme>;
}
const Compare: FC<ICompareProps> = ({ sx }) => {
    return (
        <SvgIcon
            sx={sx}
        >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 6.96774V0H25V24H0V13.1613H8.25V6.96774H15.75Z" fill="white"/>
                <rect x="18" y="2" width="5" height="20" fill="#1A1A1A"/>
                <rect x="10" y="9" width="6" height="13" fill="#1A1A1A"/>
                <rect x="2" y="15" width="6" height="7" fill="#1A1A1A"/>
            </svg>

        </SvgIcon>
    );
};

export default Compare;
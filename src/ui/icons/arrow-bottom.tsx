import React, {FC} from 'react';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {SvgIcon} from "@mui/material";

interface IArrowButtonProps {
    sx?: SxProps<Theme>;
}

const ArrowBottom: FC<IArrowButtonProps> = ({sx}) => {
    return (
        <SvgIcon
            sx={{
                fontSize: 16,
                ...sx
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                <path d="M7 8.19909L0 0.732422H14L7 8.19909Z" fill="#D3176D"/>
            </svg>
        </SvgIcon>
    );
};

export default ArrowBottom;
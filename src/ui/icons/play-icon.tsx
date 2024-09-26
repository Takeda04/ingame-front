import {SvgIcon} from '@mui/material';
import React, {FC} from 'react';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface IPlayIconProps {
    sx?: SxProps<Theme>;
}

const PlayIcon: FC<IPlayIconProps> = ({
                                          sx
                                      }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                <path
                    d="M9.1081 5.45209L3.26648 0.672571C1.96061 -0.395861 0 0.533233 0 2.22049V11.7795C0 13.4668 1.96061 14.3959 3.26647 13.3274L9.1081 8.54791C10.0861 7.74771 10.0861 6.25229 9.1081 5.45209Z"
                    fill="white"/>
            </svg>
        </SvgIcon>
    );
};

export default PlayIcon;
import React, {FC} from 'react';
import {SvgIcon} from "@mui/material";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";

interface ITimeIconProps {
    sx?: SxProps<Theme>;
}
const TimeIcon: FC<ITimeIconProps> = ({ sx }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 4.83203H8.16667V8.9987H12.3333V10.6654H6.5V4.83203Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M17.3327 8.99935C17.3327 13.6018 13.6018 17.3327 8.99935 17.3327C4.39685 17.3327 0.666016 13.6018 0.666016 8.99935C0.666016 4.39685 4.39685 0.666016 8.99935 0.666016C13.6018 0.666016 17.3327 4.39685 17.3327 8.99935ZM15.666 8.99935C15.666 10.7675 14.9636 12.4632 13.7134 13.7134C12.4632 14.9636 10.7675 15.666 8.99935 15.666C7.23124 15.666 5.53555 14.9636 4.2853 13.7134C3.03506 12.4632 2.33268 10.7675 2.33268 8.99935C2.33268 7.23124 3.03506 5.53555 4.2853 4.2853C5.53555 3.03506 7.23124 2.33268 8.99935 2.33268C10.7675 2.33268 12.4632 3.03506 13.7134 4.2853C14.9636 5.53555 15.666 7.23124 15.666 8.99935Z"
                      fill="white"/>
            </svg>
        </SvgIcon>
    );
};

export default TimeIcon;
import React, {FC} from 'react';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {SvgIcon} from "@mui/material";

interface IPhoneIconsProps {
    sx?: SxProps<Theme>;
}

const PhoneIcon: FC<IPhoneIconsProps> = ({ sx }) => {
    return (
        <SvgIcon sx={sx}>
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_354_348)">
                    <path
                        d="M5.99061 10.4869L5.73389 10.7436L5.89854 11.0672C7.32691 13.8743 9.62702 16.1639 12.4316 17.6008L12.7557 17.7669L13.0131 17.5094L15.1215 15.4011C15.2457 15.2769 15.429 15.2376 15.5833 15.2905L15.5832 15.2905L15.5886 15.2923C16.7124 15.6635 17.9249 15.8637 19.1667 15.8637C19.4176 15.8637 19.625 16.0711 19.625 16.3221V19.6667C19.625 19.9176 19.4176 20.125 19.1667 20.125C10.4441 20.125 3.375 13.0559 3.375 4.33333C3.375 4.08239 3.58239 3.875 3.83333 3.875H7.1875C7.43844 3.875 7.64583 4.08239 7.64583 4.33333C7.64583 5.58337 7.84564 6.78491 8.21597 7.90735C8.2667 8.07214 8.22905 8.24843 8.09895 8.37853L5.99061 10.4869Z"
                        fill="#D3176D" stroke="#D3176D"/>
                </g>
                <defs>
                    <clipPath id="clip0_354_348">
                        <rect width="23" height="23" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                </defs>
            </svg>

        </SvgIcon>
    );
};

export default PhoneIcon;
import React, {FC} from 'react';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {SvgIcon} from "@mui/material";

interface IBasketProps {
    sx?: SxProps<Theme>;
}
const BasketIcon: FC<IBasketProps> = ({ sx }) => {
    return (
        <SvgIcon
            sx={sx}
        >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.29967 0.433872L11.2341 6.13984H24.7578V21.1662V23.9512H22.6689V21.1662H11.6426V23.9531H9.35582V21.1662V8.01813L3.53759 2.38326H3.05176e-05V6.48499e-05H4.83359L5.29967 0.433872Z"
                    fill="white"/>
                <rect x="22.5039" y="18.9121" width="10.5184" height="10.5184" transform="rotate(-180 22.5039 18.9121)"
                      fill="#1A1A1A"/>
            </svg>
        </SvgIcon>
    );
};


export default BasketIcon;
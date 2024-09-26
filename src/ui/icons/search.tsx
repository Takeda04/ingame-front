import React, {FC} from 'react';
import {SvgIcon} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface ISearchIconProps {
    sx?: SxProps<Theme>;
}
const SearchIcon: FC<ISearchIconProps> = ({ sx }) => {
    return (
        <SvgIcon
            sx={sx}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.8947 24L15.1579 16.8421H0V0H17.2632V14.7368L24 21.0526L21.8947 24Z" fill="white"/>
                <rect x="2.52539" y="2.52637" width="11.7895" height="11.7895" fill="#1A1A1A"/>
            </svg>
        </SvgIcon>
    );
};

export default SearchIcon;
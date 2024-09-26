import {SvgIcon, Theme, SxProps} from '@mui/material';
import React, {FC} from 'react';

interface IAvatarIcon {
    sx?: SxProps<Theme>;
}

const AvatarIcon: FC<IAvatarIcon> = ({ sx }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="85" height="90" viewBox="0 0 85 90" fill="none">
                <rect x="3" y="3.5" width="78.8467" height="83" fill="#EFEFEF" stroke="#D3176D" stroke-width="6"/>
                <path
                    d="M48.4328 24.6787H36.4178V28.6837H32.4128V40.6987H36.4178V28.6837H48.4328V24.6787ZM48.4328 40.6987H36.4178V44.7037H48.4328V40.6987ZM48.4328 28.6837H52.4378V40.6987H48.4328V28.6837ZM26.4053 52.7137H30.4103V48.7087H54.4403V52.7137H30.4103V60.7237H54.4403V52.7137H58.4453V64.7287H26.4053V52.7137Z"
                    fill="#D3176D"/>
            </svg>
        </SvgIcon>
    );
};

export default AvatarIcon;
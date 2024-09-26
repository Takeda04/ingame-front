import React, {FC} from 'react';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import { SvgIcon } from '@mui/material';

interface IQuoteIconProps {
    sx?: SxProps<Theme>;
}

const QuoteIcon: FC<IQuoteIconProps> = ({
                                            sx
                                        }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 34 24" fill="none">
                <path d="M2.4 24H9.6L14.4 14.4V0H0V14.4H7.2L2.4 24ZM21.6 24H28.8L33.6 14.4V0H19.2V14.4H26.4L21.6 24Z"
                      fill="black"/>
            </svg>
        </SvgIcon>
    );
};

export default QuoteIcon;
import React, {FC} from 'react';
import {SvgIcon} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

interface IArrowLeftProps {
    sx?: SxProps<Theme>;
}
const ArrowLeftIcon: FC<IArrowLeftProps> = ({ sx }) => {
    return (
        <SvgIcon
            sx={sx}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 8 12" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M7.08831 5.41071C7.24454 5.56698 7.3323 5.77891 7.3323 5.99988C7.3323 6.22085 7.24454 6.43277 7.08831 6.58904L2.37415 11.3032C2.29727 11.3828 2.20532 11.4463 2.10365 11.49C2.00198 11.5336 1.89263 11.5566 1.78198 11.5576C1.67133 11.5585 1.5616 11.5375 1.45919 11.4956C1.35677 11.4537 1.26373 11.3918 1.18548 11.3135C1.10724 11.2353 1.04536 11.1423 1.00346 11.0398C0.961561 10.9374 0.940476 10.8277 0.941438 10.717C0.942399 10.6064 0.965388 10.497 1.00906 10.3954C1.05274 10.2937 1.11622 10.2017 1.19581 10.1249L5.32081 5.99988L1.19581 1.87488C1.04401 1.71771 0.960019 1.50721 0.961918 1.28871C0.963817 1.07021 1.05146 0.861201 1.20596 0.706695C1.36047 0.552188 1.56948 0.464546 1.78798 0.462647C2.00648 0.460749 2.21698 0.544744 2.37415 0.696543L7.08831 5.41071Z"
                      fill="#6B6B6B"/>
            </svg>
        </SvgIcon>
    );
};

export default ArrowLeftIcon;
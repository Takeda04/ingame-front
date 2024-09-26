import React, {FC} from 'react';
import {SvgIcon} from "@mui/material";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";

interface IMemoryIconPros {
    sx?: SxProps<Theme>;
}
const MemoryIcon: FC<IMemoryIconPros> = ({ sx }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="18" viewBox="0 0 28 18" fill="none">
                <path
                    d="M1.5 0.25C1.16848 0.25 0.850537 0.381696 0.616116 0.616117C0.381696 0.850537 0.25 1.16848 0.25 1.5V16.5C0.25 16.8315 0.381696 17.1495 0.616116 17.3839C0.850537 17.6183 1.16848 17.75 1.5 17.75H5.25V15.25H7.75V17.75H10.25V15.25H12.75V17.75H15.25V15.25H17.75V17.75H20.25V15.25H22.75V17.75H26.5C26.8315 17.75 27.1495 17.6183 27.3839 17.3839C27.6183 17.1495 27.75 16.8315 27.75 16.5V1.5C27.75 1.16848 27.6183 0.850537 27.3839 0.616117C27.1495 0.381696 26.8315 0.25 26.5 0.25H1.5ZM5.25 5.25H12.75V9H5.25V5.25ZM15.25 5.25H22.75V9H15.25V5.25Z"
                    fill="#AAA7A7"/>
            </svg>
        </SvgIcon>
    );
};

export default MemoryIcon;
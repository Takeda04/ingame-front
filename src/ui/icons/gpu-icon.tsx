import React, {FC} from 'react';
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";
import {SvgIcon} from "@mui/material";

interface GpuIconProps {
    sx?: SxProps<Theme>;
}
const GpuIcon: FC<GpuIconProps> = ({ sx }) => {
    return (
        <SvgIcon sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path
                    d="M0.75 23.25V5.75C0.75 4.375 1.23958 3.19792 2.21875 2.21875C3.19792 1.23958 4.375 0.75 5.75 0.75H14.5C15.875 0.75 17.0521 1.23958 18.0312 2.21875C19.0104 3.19792 19.5 4.375 19.5 5.75V7H17V5.75C17 5.0625 16.7554 4.47417 16.2663 3.985C15.7771 3.49583 15.1883 3.25083 14.5 3.25H5.75C5.0625 3.25 4.47417 3.495 3.985 3.985C3.49583 4.475 3.25083 5.06333 3.25 5.75V20.75H17V18.25H19.5V23.25H0.75ZM10.125 17C11.5 17 12.6771 16.5104 13.6562 15.5312C14.6354 14.5521 15.125 13.375 15.125 12C15.125 10.625 14.6354 9.44792 13.6562 8.46875C12.6771 7.48958 11.5 7 10.125 7C8.75 7 7.57292 7.48958 6.59375 8.46875C5.61458 9.44792 5.125 10.625 5.125 12C5.125 13.375 5.61458 14.5521 6.59375 15.5312C7.57292 16.5104 8.75 17 10.125 17ZM10.125 14.5C9.4375 14.5 8.84917 14.2554 8.36 13.7663C7.87083 13.2771 7.62583 12.6883 7.625 12C7.62417 11.3117 7.86917 10.7233 8.36 10.235C8.85083 9.74667 9.43917 9.50167 10.125 9.5C10.8108 9.49833 11.3996 9.74333 11.8913 10.235C12.3829 10.7267 12.6275 11.315 12.625 12C12.6225 12.685 12.3779 13.2738 11.8913 13.7663C11.4046 14.2587 10.8158 14.5033 10.125 14.5ZM18.25 12V9.5H19.375C19.5625 9.5 19.7292 9.45333 19.875 9.36C20.0208 9.26667 20.1458 9.12583 20.25 8.9375C20.5625 8.33333 20.9946 7.85917 21.5462 7.515C22.0979 7.17083 22.7075 6.99917 23.375 7H24.5V9.5H23.375C23.1875 9.5 23.0208 9.54708 22.875 9.64125C22.7292 9.73542 22.6042 9.87583 22.5 10.0625C22.1875 10.6667 21.7554 11.1408 21.2038 11.485C20.6521 11.8292 20.0425 12.0008 19.375 12H18.25ZM18.25 17V14.5H19.375C19.5625 14.5 19.7292 14.4533 19.875 14.36C20.0208 14.2667 20.1458 14.1258 20.25 13.9375C20.5625 13.3333 20.9946 12.8592 21.5462 12.515C22.0979 12.1708 22.7075 11.9992 23.375 12H24.5V14.5H23.375C23.1875 14.5 23.0208 14.5471 22.875 14.6412C22.7292 14.7354 22.6042 14.8758 22.5 15.0625C22.1875 15.6667 21.7554 16.1408 21.2038 16.485C20.6521 16.8292 20.0425 17.0008 19.375 17H18.25Z"
                    fill="#AAA7A7"/>
            </svg>
        </SvgIcon>
    );
};

export default GpuIcon;
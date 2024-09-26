import React, {FC} from 'react';
import {SvgIcon} from "@mui/material";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import Box from "@mui/material/Box";

interface ILogoProps {
    sx?: SxProps<Theme>;
}
const Logo: FC<ILogoProps> = ({ sx }) => {
    return (
        <Box>
            <SvgIcon sx={sx}>
                <svg width="114" height="17" viewBox="0 0 114 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.57705 16H0.131977V0.831507H2.57705V16ZM7.28625 16H4.84118V4.74815H7.08249V8.23464H7.24097C7.58056 6.33292 9.07477 4.52175 11.9274 4.52175C15.0516 4.52175 16.5911 6.62723 16.5911 9.23078V16H14.146V9.88732C14.146 7.78185 13.1952 6.71779 10.8633 6.71779C8.39559 6.71779 7.28625 7.9856 7.28625 10.4307V16ZM25.7428 16.2264C21.2828 16.2264 18.317 13.1474 18.317 8.41575C18.317 3.68409 21.5092 0.605112 26.354 0.605112C30.6556 0.605112 33.644 2.77851 33.644 6.28764V6.46875H30.9499V6.28764C30.9499 4.11424 29.433 2.93698 26.2861 2.93698C22.6412 2.93698 20.8979 4.63495 20.8979 8.41575C20.8979 12.1966 22.6185 13.8719 26.1729 13.8719C29.7953 13.8719 31.2216 12.8757 31.2216 10.3175V10.1137H25.6069V8.25728H33.644V16H31.4253V12.7173H31.2668C30.6329 14.9359 28.7086 16.2264 25.7428 16.2264ZM39.0106 16.2264C36.6787 16.2264 35.2072 15.1397 35.2072 13.2833C35.2072 11.54 36.6108 10.6344 38.8295 10.3854L43.946 9.84204V9.1855C43.946 7.32906 43.131 6.67251 40.9803 6.67251C38.8974 6.67251 37.8786 7.35169 37.8786 9.00438V9.09494H35.4562V9.00438C35.4562 6.44611 37.5843 4.52175 41.1614 4.52175C44.7384 4.52175 46.3458 6.46875 46.3458 9.16286V16H44.1045V13.1927H43.946C43.3574 15.0944 41.5689 16.2264 39.0106 16.2264ZM37.6522 13.1248C37.6522 14.0304 38.2635 14.4605 39.6672 14.4605C42.2254 14.4605 43.946 13.5097 43.946 11.291L39.5313 11.789C38.2635 11.9475 37.6522 12.2418 37.6522 13.1248ZM50.9735 16H48.5284V4.74815H50.7697V8.14408H50.9056C51.1999 6.265 52.4224 4.52175 55.2297 4.52175C57.788 4.52175 59.169 6.08388 59.486 8.23464H59.6218C59.9161 6.31028 61.1839 4.52175 64.0365 4.52175C66.957 4.52175 68.4286 6.51403 68.4286 9.23078V16H66.0061V9.88732C66.0061 7.66865 65.1232 6.71779 62.9498 6.71779C60.55 6.71779 59.6897 7.94032 59.6897 10.4307V16H57.2673V9.88732C57.2673 7.66865 56.407 6.71779 54.2336 6.71779C51.8112 6.71779 50.9735 7.94032 50.9735 10.4307V16ZM76.2751 16.2264C72.5849 16.2264 70.1624 14.1436 70.1624 10.3854C70.1624 6.87626 72.5622 4.52175 76.2298 4.52175C79.7163 4.52175 82.0935 6.44611 82.0935 9.86468C82.0935 10.2722 82.0708 10.5891 82.0029 10.9287H72.449C72.5396 13.1021 73.6037 14.2568 76.2072 14.2568C78.5617 14.2568 79.5352 13.487 79.5352 12.1513V11.9702H81.9803V12.1739C81.9803 14.5737 79.6258 16.2264 76.2751 16.2264ZM76.1846 6.44611C73.6942 6.44611 72.6075 7.55545 72.4717 9.57037H79.7843V9.52509C79.7843 7.44225 78.5844 6.44611 76.1846 6.44611Z"
                        fill="#D3176D"/>
                    <path
                        d="M86.551 16H83.472V12.4909H86.551V16ZM93.0551 16.2264C89.8856 16.2264 88.3461 14.1209 88.3461 11.5174V4.74815H90.7685V10.8608C90.7685 12.9663 91.742 14.0304 94.1192 14.0304C96.6095 14.0304 97.7641 12.7625 97.7641 10.3175V4.74815H100.187V16H97.9452V12.5135H97.8094C97.4472 14.4152 95.953 16.2264 93.0551 16.2264ZM113.456 16H101.797V13.8945L107.524 8.77799L109.902 6.98946V6.80835L107.524 6.8989H102.136V4.74815H113.116V6.85362L106.981 12.2418L104.898 13.7813V13.9624L106.981 13.8492H113.456V16Z"
                        fill="white"/>
                </svg>
            </SvgIcon>
        </Box>
    );
};

export default Logo;
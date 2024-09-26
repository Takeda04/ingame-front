import React, {FC} from 'react';
import Tab from '@mui/material/Tab';
import {TabOwnProps} from "@mui/material/Tab/Tab";

const CustomTab: FC<TabOwnProps> = ({ value, label, ...other }) => (
    <Tab
        label={label}
        value={value}
        sx={{
            color: theme => theme.palette.primaryText.main,
            fontWeight: {xs: 600, md: 500},
            fontSize: {xs: 12, md: 22},
            lineHeight: "27px"
        }}
        {...other}
    />
);

export default CustomTab;
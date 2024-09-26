"use client";
import React, {FC} from 'react';
import NavigationLink from "@/components/navigation-link/navigation-link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";

interface IBreadcrumbProps {
    list: {
        label: string;
        link?: string;
    }[];
    sx?: SxProps<Theme>;
}

const Breadcrumb: FC<IBreadcrumbProps> = ({list, sx}) => {

    return (
        <Box
            sx={{
                padding: "25px 0",
                display: "flex",
                alignItems: "center",
                ...sx
            }}
        >
            {list.map((item, idx) => (
                <React.Fragment key={idx}>
                    {item.link ? (
                        <NavigationLink
                            href="/"
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 14,
                                    lineHeight: "17px",
                                    color: theme => theme.palette.primaryText.main
                                }}
                            >
                                {item.label}
                            </Typography>
                        </NavigationLink>
                    ) : (
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px",
                                color: theme => theme.palette.primaryText.main
                            }}
                        >
                            {item.label}
                        </Typography>
                    )}
                    {idx !== (list.length - 1) && (
                        <Box
                            sx={{
                                width: "7px",
                                height: "7px",
                                backgroundColor: theme => theme.palette.primary.main,
                                borderRadius: "50%",
                                margin: "0 12px"
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default Breadcrumb;
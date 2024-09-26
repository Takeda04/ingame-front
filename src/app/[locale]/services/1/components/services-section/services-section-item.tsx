"use client";
import React from 'react';
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {List, ListItem} from "@mui/material";
import { useTranslations } from 'next-intl';


type Props = {
    id:number,
    title: string,
    desc: string,
    imgSrc: string,
    list: string[]
}

const ServicesSectionItem = ({ComingProps}: { ComingProps: Props}) => {
    const t = useTranslations("ServicePages.1.whatWeCanDo")
    return (
        <Box
            sx={{
                backgroundColor: "#000000",
                padding: "30px 20px",
                display: "flex",
                maxWidth: "504px",
                width: "100%",
                gap: "12px"
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "136px",
                    height: "160px",
                }}
            >
                <Image
                    src={ComingProps.imgSrc}
                    fill
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    alt="services-img"
                />
            </Box>
            <Box>
                <Typography
                    component="h5"
                    sx={{
                        color: theme => theme.palette.primaryText.main,
                        fontSize: 17,
                        lineHeight: "20px"
                    }}
                >
                    {t(ComingProps.title)}
                </Typography>
                <Box
                    sx={{
                        color: "#C7C7C7",
                        mt: "8px",
                        fontSize: 13,
                        lineHeight: "15px"
                    }}
                >
                    <Typography
                        component="p"
                        sx={{
                            color: "#C7C7C7",
                            fontSize: 13,
                            lineHeight: "15px"
                        }}
                    >
                        {t(ComingProps.desc)}
                        </Typography>
                    <List sx={{ listStyleType: 'disc' }}>
                        {Array.isArray(ComingProps.list) && ComingProps.list.map((item) => (
                            <ListItem
                                key={item}
                                sx={{
                                    display: 'list-item',
                                    listStylePosition: "inside",
                                    color: "#C7C7C7",
                                    fontSize: 13,
                                    lineHeight: "15px",
                                    padding: "0 0 0 6px",
                                    fontFamily: "ClashDisplay-Variable, sans-serif",
                                    mt: "2px"
                                }}
                            >
                                {t(`${ComingProps.id}.list.${item}`)}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default ServicesSectionItem;
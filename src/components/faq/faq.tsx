"use client";
import {Box, Collapse, Typography} from '@mui/material';
import React, {FC, useState} from 'react';
import AppContainer from "@/ui/app-container/app-container";
import TitleSection from "@/ui/title-section/title-section";
import SectionDescription from "@/components/section-description/section-description";
import ArrowBottom from "@/ui/icons/arrow-bottom";

interface IFaqProps {
    list: {
        question: string;
        answer: string;
    }[];
    title: string;
}

const Faq: FC<IFaqProps> = ({list, title}) => {
    const [open, setOpen] = useState(Array(list.length).fill(false));

    const handleClick = (index: number) => {
        let newOpen = [...open];
        const isOpen = !newOpen[index];
        if (isOpen) {
            newOpen = newOpen.map(() => false);
        }
        newOpen[index] = isOpen;
        setOpen(newOpen);
    };

    return (
        <Box
            sx={{
                backgroundColor: theme => theme.palette.secondary.main,
                paddingTop: {xs: "24px", sm: "100px"},
                paddingBottom: "70px"
            }}
        >
            <AppContainer
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TitleSection
                    label={title}
                />
                <SectionDescription
                    label=""
                    hasOnlyDivider={true}
                />

                <Box
                    sx={{
                        listStyleType: 'disc',
                        listStylePosition: "inside",
                        width: "100%"
                    }}
                >
                    {list.map((item, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                borderBottomWidth: "1px",
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                borderColor: "#757575",
                                borderStyle: "solid",
                                padding: {xs: "22px 0", sm: "23px 20px"},
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    alignItems: "center"
                                }}
                                onClick={() => handleClick(idx)}
                            >
                                <Typography
                                    sx={{
                                        display: 'list-item',
                                        color: theme => theme.palette.primaryText.main,
                                        fontFamily: "ClashDisplay-Variable, sans-serif",
                                        fontSize: {xs: 12, sm: 20},
                                        lineHeight: "24px",
                                        fontWeight: 600,
                                    }}
                                >{item.question}</Typography>
                                <ArrowBottom
                                    sx={{
                                        transition: "all .3s",
                                        transform: open[idx] ? "rotate(180deg)" : "rotate(0)"
                                    }}
                                />
                            </Box>
                            <Collapse in={open[idx]} timeout="auto" unmountOnExit>
                                <Typography
                                    sx={{
                                        marginTop: "20px",
                                        color: theme => theme.palette.primaryText.main,
                                        fontSize: {xs: 11, md: 16}
                                    }}
                                    dangerouslySetInnerHTML={{__html: item.answer}}
                                />
                            </Collapse>
                        </Box>
                    ))}
                </Box>
            </AppContainer>
        </Box>
    );
};

export default Faq;
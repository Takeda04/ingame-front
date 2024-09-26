"use client";
import React, {FC, useState} from 'react';
import {Box, Card, CardContent, Typography, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";
import { useTranslations } from 'next-intl';

interface IServicesQuestionInner {
    polygon: string;
    sx?: SxProps<Theme>;
    label: string;
    icon?: React.JSX.Element | null;
}

const ServicesQuestionInner: FC<IServicesQuestionInner> = ({polygon, sx, label, icon}) => {
    return (
        <Card
            sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                clipPath: polygon,
                backfaceVisibility: "hidden",
                ...sx,
            }}
        >
            <Box
                sx={{
                    backgroundColor: theme => theme.palette.primary.main,
                    padding: "2px",
                    width: "100%",
                    height: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        width: 44,
                        height: 47,
                        borderWidth: "1px 1px 0px 0px",
                        borderStyle: "solid",
                        borderColor: theme => theme.palette.primary.main,
                        position: "absolute",
                        right: "8px",
                        top: "8px",
                        zIndex: 1
                    }}
                />
                <Box
                    sx={{
                        width: 44,
                        height: 47,
                        borderWidth: "0px 0px 1px 1px",
                        borderStyle: "solid",
                        borderColor: theme => theme.palette.primary.main,
                        position: "absolute",
                        left: "8px",
                        bottom: "8px",
                        zIndex: 1
                    }}
                />
                <CardContent
                    sx={{
                        backgroundColor: theme => theme.palette.secondary.main,
                        clipPath: polygon,
                        width: "100%",
                        height: "100%",
                        display: 'flex',
                        flexDirection: 'column',
                        padding: "23px 23px",
                    }}
                >
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2}}>
                        {icon}
                    </Box>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            color: theme => theme.palette.primaryText.main,
                            fontSize: 16,
                            lineHeight: "22px",
                            mt: "5px"
                        }}
                    >
                        {label}
                    </Typography>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: '22px',
                            right: '22px',
                            padding: "9px",
                            backgroundColor: theme => theme.palette.primary.main,
                        }}
                    >
                        <ArrowForwardIcon
                            sx={{
                                color: "#000000"
                            }}
                        />
                    </IconButton>
                </CardContent>
            </Box>
        </Card>
    );
}
export const ServicesQuestionItem = ({trKey} : {trKey?:string}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const polygon = "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };
const t = useTranslations("ServicePages")
    return (
        <Box
            sx={{
                perspective: '1000px',
                width: '200px',
                height: '231px',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                position: "relative"
            }}
            onClick={handleCardClick}
        >

            <ServicesQuestionInner
                polygon={polygon}
                label={t(`1.questions.${trKey ? trKey : "1"}.titleFront`)}
                icon={
                    <FlashOnIcon
                        sx={{
                            fontSize: 40,
                            color: theme => theme.palette.primaryText.main
                        }}
                    />
                }
            />

            <ServicesQuestionInner
                polygon={polygon}
                sx={{
                    transform: "rotateY(180deg)",
                    top: 0,
                    left: 0,
                    bottom: 5
                }}
                label={t(`1.questions.${trKey ? trKey : "1"}.titleBack`)}
                icon={null}
            />
        </Box>
    );
};


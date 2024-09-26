"use client";
import AppContainer from '@/ui/app-container/app-container';
import {Box} from '@mui/material';
import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import AppButton from "@/ui/button/button";
import Image from "next/image";
import OrderAnUpgrade from "@/components/order-an-upgrade/order-an-upgrade";
import { useTranslations } from 'next-intl';

const ServicesHero = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleOpen = () => {
        setIsOpen(true);
    }

    const t = useTranslations("ServicePages")
    const td = useTranslations("OrderAnUpgrade")
    return (
        <>
            <OrderAnUpgrade
                isOpen={isOpen}
                onClose={handleClose}
                title={td("title")}
                list={[
                    {
                        title: td("steps.outerServices.title"),
                        services: [
                            {
                                title: td("steps.outerServices.services.1.title"),
                                list: [0, 1, 2, 3, 4].map((idx)=> td(`steps.outerServices.services.1.list.${idx}`)) 
                            },
                            {
                                title: td("steps.outerServices.services.2.title"),
                                list: [0, 1, 2, 3, 4, 5].map((idx)=> td(`steps.outerServices.services.2.list.${idx}`))
                            }
                        ],
                        hasOtherServices: true,
                    },
                    {
                        title: td("steps.additional.title"),
                        services: [
                            {
                                title: td("steps.additional.services.1.title"),
                                list: [0, 1, 2, 3, 4, 5].map((idx)=> td(`steps.additional.services.1.list.${idx}`))
                            },
                            {
                                title: td("steps.additional.services.2.title"),
                                list: [0, 1].map((idx)=> td(`steps.additional.services.2.list.${idx}`))
                            }
                        ],
                        hasOtherServices: false,
                    },
                    {
                        title: td("steps.deadlines.title"),
                        services: [
                            {
                                title: td("steps.deadlines.services.1.title"),
                                list: [0, 1, 2, 3, 4].map((idx)=> td(`steps.deadlines.services.1.list.${idx}`))
                            },
                            {
                                title: td("steps.deadlines.services.2.title"),
                                list: [0, 1, 2, 3, 4].map((idx)=> td(`steps.deadlines.services.2.list.${idx}`))
                            }
                        ],
                        hasOtherServices: false,
                    }
                ]}
            />
            <Box
                sx={{
                    backgroundColor: "#000000",
                    height: "786px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <AppContainer
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap"
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "527px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: {xs: "center", sm: "flex-start"},
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: {xs: 25, sm: 60},
                                lineHeight: "73px",
                                color: theme => theme.palette.primaryText.main,
                            }}
                        >
                            {t("1.title")}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 16,
                                lineHeight: "19px",
                                color: "#B2B2B2",
                                mt: "8px",
                                textAlign: {xs: "center", sm: "left"}
                            }}
                        >
                            {t("1.description")}
                        </Typography>
                        
                        <AppButton
                            size={"large"}
                            variant="outlined"
                            label={t("1.btn")}
                            onClick={handleOpen}
                            sx={{
                                color: theme => theme.palette.primaryText.main,
                                borderWidth: "3px",
                                fontSize: {xs: 16, sm: 25},
                                fontWeight: 600,
                                textTransform: "math-auto",
                                padding: {xs: "10px 22px", sm: "14px 23px"},
                                mt: "15px",
                                width: "max-content",
                                "&:hover": {
                                    borderWidth: "3px",
                                }
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            position: "relative",
                            width: 626,
                            height: {xs: 250, sm: 397},
                            order: {xs: -1, sm: 1},
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/service-hero-bg.png"
                            alt="hero-bg"
                            sx={{
                                position: "absolute",
                                objectFit: "contain",
                                left: {xs: "-50px", sm: "-322px"},
                                bottom: "-80px",
                                width: {xs: "344px", sm: "777px"},
                                height: "491px"
                            }}
                        />

                        <Box
                            component="img"
                            src="/images/service-hero-bg.png"
                            alt="hero-bg"
                            sx={{
                                position: "absolute",
                                objectFit: "contain",
                                left: "130px",
                                bottom: "-132px",
                                width: "777px",
                                height: "491px",
                                display: {xs: "none", sm: "block"}
                            }}
                        />
                        <Image
                            src="/images/service-hero-img.png"
                            alt="hero-img"
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%"
                            }}
                            fill
                        />
                    </Box>
                </AppContainer>
            </Box>
        </>
    );
};

export default ServicesHero;

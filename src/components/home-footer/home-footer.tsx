"use client";
import AppContainer from '@/ui/app-container/app-container';
import {Box, Button, Typography} from '@mui/material';
import React, { useState } from 'react';
import EnergyIcon from "@/ui/icons/energy-icon";
import Image from "next/image";
import ContactModal from "@/layout/header/components/contact-modal";
import {useTranslations} from "next-intl";

const HomeFooter = () => {
    const t = useTranslations("HomeFooter");
    const [isModalOpened, setIsModalOpened] = useState(false);


    const closeContactModal = () => {
        setIsModalOpened(false);
    }

    const handleOpenModal = () => {
        setIsModalOpened(true);
    }

    return (
        <>
            <ContactModal
                isOpen={isModalOpened}
                handleClose={closeContactModal}
            />
            <Box
                sx={{
                    backgroundColor: "secondary.main",
                    paddingBottom: {xs: "24px", md: "100px"},
                    paddingTop: {xs: "24px", md: "10px"},
                }}
            >
                <AppContainer>
                    <Box
                        sx={{
                            backgroundColor: "secondary.light",
                            padding: {xs: "20px", md: "70px 172px"},
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                            zIndex: 1
                        }}
                    >
                        <Typography
                            component="h2"
                            variant="h2"
                            sx={{
                                fontWeight: 600,
                                fontSize: {xs: 14, md: 38},
                                lineHeight: {xs: "19px", md: "46px"},
                                color: "primaryText.main",
                                textAlign: "center"
                            }}
                        >
                            {t("title")}
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: {xs: 12, md: 18},
                                lineHeight: {xs: "17px", md: "24px"},
                                color: "primaryText.main",
                                mt: {xs: 0, md: "20px"},
                                textAlign: "center"
                            }}
                        >
                            {t("description")}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleOpenModal}
                            sx={{
                                color: theme => "primaryText.main",
                                fontSize: {xs: 16, md: 20},
                                lineHeight: "24px",
                                mt: {xs: "24px", md: "32px"},
                                padding: "14px 26px",
                                borderRadius: 0,
                                fontWeight: 600,
                            }}
                        >
                            <EnergyIcon
                                sx={{
                                    mr: "6px"
                                }}
                            />
                            {t("btn")}
                        </Button>
                        <Box
                            sx={{
                                width: {xs: 180, md: 387},
                                height: {xs: 83, md: 184},
                                position: {xs: "relative", md: "absolute"},
                                bottom: "22px",
                                right: 0,
                                zIndex: -1,
                                marginTop: {xs: "27px", md: 0}
                            }}
                        >
                            <Image
                                src="/blog-and-news-img.svg"
                                alt="image"
                                fill
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </Box>
                    </Box>
                </AppContainer>
            </Box>
        </>
    );
};

export default HomeFooter;
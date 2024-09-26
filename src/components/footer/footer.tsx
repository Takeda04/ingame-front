"use client";
import React from 'react';
import Box from "@mui/material/Box";
import AppContainer from '@/ui/app-container/app-container';
import Typography from "@mui/material/Typography";
import PhoneIcon from "@/ui/icons/phone-icon";
import TimeIcon from "@/ui/icons/time-icon";
import InstagramIcon from "@/ui/icons/instagram-icon";
import TelegramIconFilled from "@/ui/icons/telegram-icon-filled";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import LocationIcon from "@/ui/icons/location-icon";
import {useTranslations} from "next-intl";

const Footer = () => {
    const t = useTranslations("Footer");

    return (
        <Box
            sx={{
                backgroundColor: "#131212",
                paddingTop: "42px",
                paddingBottom: "39px",

            }}
        >
            <AppContainer
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "35px",
                    flexWrap: "wrap",
                    flexDirection: {xs: "column", sm: "row"}
                }}
            >
                <Box
                    sx={{}}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: "17px",
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        {t("contacts")}
                    </Typography>
                    <a href="tel:+998974710099">
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px",
                                color: "#777676",
                                mt: "9px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <PhoneIcon/>
                            +998 97 471 00 99
                        </Typography>
                    </a>
                    <a href="tel:+998974610099">
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px",
                                color: "#777676",
                                mt: "9px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <PhoneIcon/>
                            +998 97 461 00 99
                        </Typography>
                    </a>
                    <a href="tel:+998974810099">
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px",
                                color: "#777676",
                                mt: "9px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <PhoneIcon/>
                            +998 97 481 00 99
                        </Typography>
                    </a>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 14,
                            lineHeight: "17px",
                            color: "#777676",
                            mt: "9px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <TimeIcon/>
                        10:00-20:00
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 14,
                            lineHeight: "17px",
                            color: "#777676",
                            mt: "9px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            maxWidth: 300
                        }}
                    >
                        <LocationIcon/>
                        {t("address")}
                    </Typography>
                </Box>
                <Box
                    sx={{}}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: "17px",
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        {t("socials")}
                    </Typography>
                    <a href="https://www.instagram.com/ingameuz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                       target="_blank">
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px",
                                color: "#777676",
                                mt: "9px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <InstagramIcon/>
                            Instagram
                        </Typography>
                    </a>
                    <a href="https://t.me/ingameuz"
                       target="_blank">
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px",
                                color: "#777676",
                                mt: "9px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <TelegramIconFilled/>
                            Telegram
                        </Typography>
                    </a>
                </Box>

                <Box
                    sx={{
                        height: "100%",
                        maxWidth: "507px",
                        width: "100%",
                        ml: {xs: 0, sm: "39px"}
                    }}
                >
                    <YMaps>
                        <Map width="100%" defaultState={{center: [41.339579, 69.271787], zoom: 12}}>
                            <Placemark defaultGeometry={[41.339579, 69.271787]}/>
                        </Map>
                    </YMaps>
                </Box>
            </AppContainer>
        </Box>
    );
};

export default Footer;
"use client";
import React, {FC} from 'react';
import Slider from "react-slick";
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import ButtonOutlined from "@/ui/button/button-outlined";
import {useLocale, useTranslations} from "next-intl";
import {Banner} from "@/http/banners-api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

interface IHomeSliderProps {
    banners: Banner[];
}

const HomeSlider: FC<IHomeSliderProps> = ({banners}) => {
    const theme = useTheme();
    const localActive = useLocale() as "ru" | "uz";
    const t = useTranslations("Buttons");
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Box
            sx={{
                overflowX: "hidden"
            }}
        >
            <Slider {...settings}>
                {banners.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            height: "660px",
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        <AppContainer
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: {xs: "column", md: "row"},
                                width: "100%",
                                height: "100%",
                                justifyContent: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    zIndex: 5,
                                    width: "100%",
                                    height: {xs: 'min-content', md: "100%"},
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: {xs: "center", md: "normal"}
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.primaryText.main,
                                        fontWeight: 500,
                                        fontSize: {xs: 25, md: 80},
                                        lineHeight: {xs: "30px", md: "98px"},
                                    }}
                                >
                                    {item.name[localActive]}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: theme.palette.primaryText.main,
                                        fontSize: {xs: 14, md: 22},
                                        lineHeight: {xs: "17px", md: "27px"},
                                        fontWeight: 500,
                                        maxWidth: "721px",
                                        marginTop: "6px",
                                        textAlign: {xs: "center", md: "start"},
                                    }}
                                    dangerouslySetInnerHTML={{ __html: item.description[localActive] }}
                                />

                                <Box
                                    sx={{
                                        marginTop: "20px",
                                    }}
                                >
                                    <a href={item.url}>
                                        <ButtonOutlined
                                            label={t("detail")}
                                        />
                                    </a>
                                </Box>
                            </Box>
                        </AppContainer>
                        <Box
                            component="img"
                            sx={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0
                            }}
                            alt="banner"
                            src={item.image}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default HomeSlider;
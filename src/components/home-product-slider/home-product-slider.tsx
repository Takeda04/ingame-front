"use client";
import {Box, useTheme} from '@mui/material';
import React, {FC} from 'react';
import AppContainer from "@/ui/app-container/app-container";
import {Product} from "@/http/products-api";
import HomeProductSliderList from "@/components/home-product-slider/components/home-product-slider-list";
import TitleSection from "@/ui/title-section/title-section";
import {useTranslations} from "next-intl";

interface IHomeProductSlider {
    type: "stock" | "new_items";
    products: Product[];
}

const HomeProductSlider: FC<IHomeProductSlider> = ({products, type}) => {
    const theme = useTheme();
    const t = useTranslations("Home");

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.main,
                padding: "30px 0"
            }}
        >
            <AppContainer>
                <TitleSection
                    label={
                        type === "stock" ? t("novelty") : t("shares")
                    }
                />
                <HomeProductSliderList products={products}/>
            </AppContainer>
        </Box>
    );
};

export default HomeProductSlider;
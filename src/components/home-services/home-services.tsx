"use client";
import React, {FC} from 'react';
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import TitleSection from "@/ui/title-section/title-section";
import HomeServicesList from "@/components/home-services/components/home-services-list";
import {useTranslations} from "next-intl";

interface IHomeServicesProps {
}
const HomeServices: FC<IHomeServicesProps> = () => {
    const t = useTranslations("Services");

    return (
        <Box
            sx={{
                backgroundColor: theme => theme.palette.secondary.main,
                padding: {xs: "20px 0", sm: "60px 0"}
            }}
        >
            <AppContainer>
                <TitleSection
                    label={t("title")}
                />

                <HomeServicesList/>
            </AppContainer>
        </Box>
    );
};

export default HomeServices;
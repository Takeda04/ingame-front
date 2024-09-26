"use client";
import AppContainer from '@/ui/app-container/app-container';
import {Box, useTheme} from '@mui/material';
import React, {FC} from 'react';
import TitleSection from "@/ui/title-section/title-section";
import HomeCatalogList from "@/components/home-slider/home-catalog/components/home-catalog-list";
import SectionDescription from "@/components/section-description/section-description";
import {useTranslations} from "next-intl";
import {ICatalog} from "@/http/catalog-api";

interface IHomeCatalogProps {
    catalogs: ICatalog;
}

const HomeCatalog: FC<IHomeCatalogProps> = ({catalogs}) => {
    const theme = useTheme();
    const t = useTranslations("Home");

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.light
            }}
        >
            <AppContainer
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: {xs: "24px 0", sm: "40px 0"}
                }}
            >

                <TitleSection
                    label={`${t("catalog")} INGAME.UZ`}
                />

                <SectionDescription
                    label={t("catalogDescription")}
                />


                <HomeCatalogList catalogs={catalogs}/>
            </AppContainer>
        </Box>
    );
};

export default HomeCatalog;
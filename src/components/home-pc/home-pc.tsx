"use client";
import React, {FC} from 'react';
import TitleSection from "@/ui/title-section/title-section";
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import {useTheme} from "@mui/material";
import HomePCList from "@/components/home-pc/components/home-pc-list";
import {Desktop} from "@/http/desktops-api";
import {useTranslations} from "next-intl";

interface IHomePCProps {
    desktops: Desktop[];
}

const HomePC: FC<IHomePCProps> = ({ desktops }) => {
    const theme = useTheme()
    const t = useTranslations("Home");

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.main,
                padding: "60px 0"
            }}
        >
            <AppContainer>
                <TitleSection
                    label={t("ourPc")}

                />
                <HomePCList desktops={desktops}/>
            </AppContainer>
        </Box>
    );
};

export default HomePC;
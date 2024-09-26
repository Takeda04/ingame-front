"use client";
import AppContainer from '@/ui/app-container/app-container';
import {Box} from '@mui/material';
import React, {FC} from 'react';
import TitleSection from "@/ui/title-section/title-section";
import HomeNewsList from "@/components/home-news/components/home-news-list";
import {News} from "@/http/news-api";
import {useTranslations} from "next-intl";

interface IHomeNews {
    news: News[];
}
const HomeNews: FC<IHomeNews> = ({ news }) => {
    const t = useTranslations("News");

    return (
        <Box
            sx={{
                padding: "40px 0",
                backgroundColor: theme => theme.palette.secondary.main,
            }}
        >
            <AppContainer>
                <TitleSection
                    label={t("title")}
                />
                <HomeNewsList news={news}/>
            </AppContainer>
        </Box>
    );
};

export default HomeNews;
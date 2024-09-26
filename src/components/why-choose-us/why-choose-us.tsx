"use client";
import {Box} from '@mui/material';
import React, {FC} from 'react';
import AppContainer from "@/ui/app-container/app-container";
import TitleSection from "@/ui/title-section/title-section";
import SectionDescription from "@/components/section-description/section-description";
import WhyChooseUsSlider from "@/components/why-choose-us/components/why-choose-us-slider";
import {CommitFromClients} from "@/http/comments-api";
import {useTranslations} from "next-intl";

interface IWhyChooseUs {
    commitsFromClients: CommitFromClients[];
}

const WhyChooseUs: FC<IWhyChooseUs> = ({commitsFromClients}) => {
    const t = useTranslations("WhyChooseUs");

    return (
        <Box
            sx={{
                backgroundColor: theme => theme.palette.secondary.main,
                padding: {xs: "20px 0", sm: "45px 0"},
                // overflowX: "hidden"
            }}
        >
            <Box
                sx={{
                    maxWidth: '1260px',
                    width: "100%",
                    padding: "0 20px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >

                <TitleSection
                    label={t("title")}
                />
                <SectionDescription
                    label={t("description")}
                />
            </Box>

            <AppContainer>
                <Box
                    sx={{
                        mt: "50px"
                    }}
                >
                    <WhyChooseUsSlider
                        commitsFromClients={commitsFromClients}
                    />
                </Box>
            </AppContainer>
        </Box>
    );
};

export default WhyChooseUs;
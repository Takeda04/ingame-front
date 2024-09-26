import React from 'react';
import Box from "@mui/material/Box";
import ServicesHero from "@/components/services-hero/services-hero";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import AppContainer from "@/ui/app-container/app-container";
import ServicesQuestion from "@/components/services-question/services-question";
import ServicesSection from "@/app/[locale]/services/1/components/services-section/services-section";
import Faq from "@/components/faq/faq";
import WhyChooseUs from "@/components/why-choose-us/why-choose-us";
import HomeFaq from "@/components/home-faq/home-faq";
import HomeNews from "@/components/home-news/home-news";
import {getAllCommitsFromClients} from "@/http/comments-api";
import { getTranslations } from 'next-intl/server';

const Page = async () => {
    const {data: commitsFromClients} = await getAllCommitsFromClients();
    const tb = await getTranslations("Breadcrumbs")
    const t = await getTranslations("ServicePages.1")
    return (
        <Box
            sx={{
                overflowX: "hidden"
            }}
        >
            <AppContainer>
                <Breadcrumb
                    list={[
                        {
                            label:  tb("main"),
                            link: "/"
                        },
                        {
                            label: tb("services")
                        },
                        {
                            label: t("title")
                        }
                    ]}
                />
            </AppContainer>
            <ServicesHero/>
            <ServicesQuestion/>
            <ServicesSection/>
            <Faq
                title={t("faq.title")}
                list={new Array(5).fill(1).map((item, idx) => ({
                    question: t(`faq.${idx + 1}.question`),
                    answer: t(`faq.${idx + 1}.answer`)
                }))}
            />
            <WhyChooseUs commitsFromClients={commitsFromClients}/>
            <HomeFaq/>
            <HomeNews news={[]}/>
        </Box>
    );
};

export default Page;
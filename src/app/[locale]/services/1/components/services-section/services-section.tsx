import React from 'react';
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import SectionDescription from "@/components/section-description/section-description";
import ServicesSectionItem from "@/app/[locale]/services/1/components/services-section/services-section-item";
import { useTranslations } from 'next-intl';

const ServicesSection = () => {
    const t = useTranslations("ServicePages.1")
    return (
        <Box>
            <AppContainer
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <SectionDescription
                    label={t("whatWeCanDo.title")}
                    sxTitle={{
                        fontWeight: 600,
                        fontSize: {xs: 18, sm: 40},
                        lineHeight: {xs: "22px", sm: "49px"},
                        mt: "55px"
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "45px 20px",
                        justifyContent: "center",
                        mt: "30px"
                    }}
                >
                    {[
                    {
                        id: 1,
                        title: "1.title",
                        desc: "1.desc",
                        imgSrc: "/images/service1/uvelichit-mochnost.png",
                        list: ["0", "1", "2", "3"],
                    },
                    {
                        id: 2,
                        title: "2.title",
                        desc: "2.desc",
                        imgSrc: "/images/service1/provesti-to.png",
                        list: ["0", "1", "2", "3"],
                    },
                    {
                        id: 3,
                        title: "3.title",
                        desc: "3.desc",
                        imgSrc: "/images/service1/ustranit-problemy.png",
                        list: ["0", "1"]
                    },
                    {
                        id: 4,
                        title: "4.title",
                        desc: "4.desc",
                        imgSrc: "/images/service1/ulichshit-disayn.png",
                        list: ["0", "1", "2", "3"]
                    }
                    
                    ].map((item, idx) => (
                        <ServicesSectionItem key={idx} ComingProps={item}/>
                    ))}
                </Box>

            </AppContainer>
        </Box>
    );
};

export default ServicesSection;
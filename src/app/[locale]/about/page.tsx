import React from 'react';
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import TitleSection from "@/ui/title-section/title-section";
import Typography from "@mui/material/Typography";
import SectionDescription from "@/components/section-description/section-description";
import AboutDescription from "@/app/[locale]/about/components/about-description";
import WhyChooseUs from "@/components/why-choose-us/why-choose-us";
import HomeFooter from "@/components/home-footer/home-footer";
import HomeFaq from '@/components/home-faq/home-faq';
import {getAllCommitsFromClients} from "@/http/comments-api";
import {getTranslations} from 'next-intl/server';
import AboutUsSection from '@/app/[locale]/about/components/aboutus-section';

const Page = async () => {
    const {data: commitsFromClients} = await getAllCommitsFromClients();
    const t = await getTranslations("About")
    return (
        <Box
            sx={{
                paddingTop: "30px",
                overflowX: "hidden"
            }}
        >
            <AppContainer>
                <TitleSection
                    label={t("team.title")}
                />
                <AboutDescription>{t("team.desc")}</AboutDescription>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        backgroundColor: "#141414",*/}
                {/*        width: "100%",*/}
                {/*        height: "700px",*/}
                {/*        mt: "45px"*/}
                {/*    }}*/}
                {/*>*/}
                {/*</Box>*/}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: "45px",
                    }}
                >
                    <SectionDescription
                        label={t("aboutUs.title")}
                        sxTitle={{
                            fontSize: {xs: 18, sm: 40},
                            fontWeight: 600,
                        }}
                    />
                </Box>

                <AboutUsSection/>
            </AppContainer>
            <Box
                sx={{
                    mt: "57px",
                    padding: {xs: "20px 0", sm: "45px 0"},
                    backgroundColor: "secondary.light"
                }}
            >
                <AppContainer>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <SectionDescription
                            label={t("whyChooseUs.title")}
                            sxTitle={{
                                fontWeight: 600,
                                fontSize: {xs: 18, sm: 40},
                                lineHeight: {xs: "22px", md: "49px"},
                                mt: 0
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            mt: "32px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "10px",
                        }}
                    >
                        {
                            [0, 1, 2, 3].map((item) => (

                                <Box
                                    key={item}
                                    sx={{
                                        padding: {xs: "18px 2px", sm: "22px 19px"},
                                        backgroundColor: "secondary.main",
                                        maxWidth: "275px",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#B2B2B2",
                                            fontWeight: 500,
                                            fontSize: {xs: 11, sm: 18},
                                            lineHeight: "22px",
                                            textAlign: "center"
                                        }}
                                    >
                                        {t(`whyChooseUs.blocks.${item}`)}
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </AppContainer>
            </Box>

            <WhyChooseUs commitsFromClients={commitsFromClients}/>

            <Box
                sx={{
                    margin: "45px 0"
                }}
            >
                <AppContainer
                    sx={{}}
                >
                    <TitleSection
                        label="Оплата и доставка"
                    />
                    <AboutDescription>
                        Компания была основана в 2009 году. Мы — официальный партнер таких известных технологических
                        гигантов как NVIDIA, Intel, Microsoft. Нам также удалось реализовать несколько успешных
                        совместных
                        проектов с такими известными игровыми компаниями как Wargaming, UbiSoft, Electronic Arts,
                        Bethesda и
                        Mail.Games.

                        Главный офис и производственный центр расположены в Москве. Шоурум с компьютерами и периферией
                        находятся в Москве. Мы осуществляем доставку компьютеров по всей России и миру. Наша компания
                        работает как с частными, так и с юридическими лицами.
                    </AboutDescription>
                    <Box
                        sx={{
                            display: "flex",
                            mt: "32px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "10px",
                        }}
                    >
                        <Box
                            sx={{
                                padding: {xs: "18px 2px", sm: "22px 19px"},
                                backgroundColor: "secondary.light",
                                maxWidth: "275px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#B2B2B2",
                                    fontWeight: 500,
                                    fontSize: {xs: 11, sm: 18},
                                    lineHeight: "22px",
                                    textAlign: "center"
                                }}
                            >
                                съешь же ещё этих мягких французских булок, да выпей чаю съешь
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                padding: {xs: "18px 2px", sm: "22px 19px"},
                                backgroundColor: "secondary.light",
                                maxWidth: "275px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#B2B2B2",
                                    fontWeight: 500,
                                    fontSize: {xs: 11, sm: 18},
                                    lineHeight: "22px",
                                    textAlign: "center"
                                }}
                            >
                                съешь же ещё этих мягких французских булок, да выпей чаю съешь
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                padding: {xs: "18px 2px", sm: "22px 19px"},
                                backgroundColor: "secondary.light",
                                maxWidth: "275px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#B2B2B2",
                                    fontWeight: 500,
                                    fontSize: {xs: 11, sm: 18},
                                    lineHeight: "22px",
                                    textAlign: "center"
                                }}
                            >
                                съешь же ещё этих мягких французских булок, да выпей чаю съешь
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                padding: {xs: "18px 2px", sm: "22px 19px"},
                                backgroundColor: "secondary.light",
                                maxWidth: "275px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#B2B2B2",
                                    fontWeight: 500,
                                    fontSize: {xs: 11, sm: 18},
                                    lineHeight: "22px",
                                    textAlign: "center"
                                }}
                            >
                                съешь же ещё этих мягких французских булок, да выпей чаю съешь
                            </Typography>
                        </Box>
                    </Box>

                    <AboutDescription>
                        Компания была основана в 2009 году. Мы — официальный партнер таких известных технологических
                        гигантов как NVIDIA, Intel, Microsoft. Нам также удалось реализовать несколько успешных
                        совместных
                        проектов с такими известными игровыми компаниями как Wargaming, UbiSoft, Electronic Arts,
                        Bethesda и
                        Mail.Games.

                        Главный офис и производственный центр расположены в Москве. Шоурум с компьютерами и периферией
                        находятся в Москве. Мы осуществляем доставку компьютеров по всей России и миру. Наша компания
                        работает как с частными, так и с юридическими лицами.
                    </AboutDescription>
                </AppContainer>
            </Box>

            <Box
                sx={{
                    backgroundColor: "secondary.light",
                    padding: {xs: "20px 0", sm: "45px 0"}
                }}
            >
                <AppContainer>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <SectionDescription
                            label="Гарантии"
                            sxTitle={{
                                fontWeight: 600,
                                fontSize: {xs: 18, sm: 40},
                                lineHeight: {xs: "22px", md: "49px"},
                                mt: 0
                            }}
                        />
                    </Box>
                    <AboutDescription>
                        Компания была основана в 2009 году. Мы — официальный партнер таких известных технологических
                        гигантов как NVIDIA, Intel, Microsoft. Нам также удалось реализовать несколько успешных
                        совместных
                        проектов с такими известными игровыми компаниями как Wargaming, UbiSoft, Electronic Arts,
                        Bethesda и
                        Mail.Games.

                        Главный офис и производственный центр расположены в Москве. Шоурум с компьютерами и периферией
                        находятся в Москве. Мы осуществляем доставку компьютеров по всей России и миру. Наша компания
                        работает как с частными, так и с юридическими лицами.
                        <br/>
                        <br/>
                        Компания была основана в 2009 году. Мы — официальный партнер таких известных технологических
                        гигантов как NVIDIA, Intel, Microsoft. Нам также удалось реализовать несколько успешных
                        совместных
                        проектов с такими известными игровыми компаниями как Wargaming, UbiSoft, Electronic Arts,
                        Bethesda и
                        Mail.Games.

                        Главный офис и производственный центр расположены в Москве. Шоурум с компьютерами и периферией
                        находятся в Москве. Мы осуществляем доставку компьютеров по всей России и миру. Наша компания
                        работает как с частными, так и с юридическими лицами.
                        <br/>
                        <br/>
                        Компания была основана в 2009 году. Мы — официальный партнер таких известных технологических
                        гигантов как NVIDIA, Intel, Microsoft. Нам также удалось реализовать несколько успешных
                        совместных
                        проектов с такими известными игровыми компаниями как Wargaming, UbiSoft, Electronic Arts,
                        Bethesda и
                        Mail.Games.

                        Главный офис и производственный центр расположены в Москве. Шоурум с компьютерами и периферией
                        находятся в Москве. Мы осуществляем доставку компьютеров по всей России и миру. Наша компания
                        работает как с частными, так и с юридическими лицами.
                    </AboutDescription>
                </AppContainer>
            </Box>
            <HomeFaq/>
            <HomeFooter/>
        </Box>
    );
};

export default Page;
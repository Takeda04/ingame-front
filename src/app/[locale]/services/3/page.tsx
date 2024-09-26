import AppContainer from '@/ui/app-container/app-container';
import {Box, Typography, SvgIcon} from '@mui/material';
import React from 'react';
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Image from "next/image";
import SectionDescription from '@/components/section-description/section-description';
import HomeFaq from "@/components/home-faq/home-faq";
import HomeFooter from "@/components/home-footer/home-footer";
import ServicesHero from './components/services-hero/services-hero';
import { useTranslations } from 'next-intl';

const Page = () => {
    const tb = useTranslations("Breadcrumbs")
    const t = useTranslations("ServicePages.3")
    return (
        <Box>
            <AppContainer>
                <Breadcrumb
                    list={[
                        {
                            label: tb(`main`),
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

            <Box
                sx={{
                    paddingTop: "45px"
                }}
            >
                <AppContainer
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <SectionDescription
                        label={t("howItWorks.title")}
                        sxTitle={{
                            fontSize: {xs: 30,},
                            fontWeight: 600,
                            lineHeight: "37px"
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "30px",
                            width: "100%",
                            mt: "40px"
                        }}
                    >
                        {[
                            {
                                label: t("howItWorks.steps.1"),
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="104" height="89" viewBox="0 0 104 89"
                                         fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M92.5312 1.51899C93.7873 0.990276 95.1623 0.807927 96.5129 0.990918C97.8634 1.17391 99.1403 1.71555 100.21 2.55947C101.281 3.40339 102.105 4.51873 102.598 5.78941C103.091 7.06009 103.234 8.43965 103.013 9.78449L91.484 79.7159C90.3657 86.4615 82.9643 90.3299 76.7779 86.9698C71.6031 84.1587 63.9171 79.8277 57.0037 75.3087C53.5471 73.0466 42.9585 65.8028 44.2598 60.6483C45.3782 56.2411 63.1698 39.6796 73.3365 29.8332C77.3269 25.9647 75.5071 23.7332 70.7948 27.2915C59.093 36.1263 40.305 49.5616 34.0932 53.3436C28.6133 56.6782 25.7565 57.2476 22.3405 56.6782C16.1083 55.6412 10.3286 54.0349 5.61124 52.0778C-0.763257 49.4345 -0.453174 40.6708 5.60616 38.119L92.5312 1.51899Z"
                                              fill="white"/>
                                    </svg>
                                )
                            },
                            {
                                label: t("howItWorks.steps.2"),
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="127" height="109"
                                         viewBox="0 0 127 109" fill="none">
                                        <path
                                            d="M26.2619 105.904L0.9375 83.3145L6.88541 76.6471L32.0936 99.1294L66.4583 65.8596C68.06 64.3117 70.1985 63.4436 72.4258 63.437C74.6532 63.4303 76.7968 64.2856 78.4078 65.8238L94.6025 81.3036L119.538 54.6117L126.062 60.7116L101.122 87.4123C100.317 88.2747 99.3481 88.9685 98.2724 89.4538C97.1968 89.9391 96.0355 90.2061 94.8559 90.2393C93.6763 90.2726 92.5018 90.0714 91.4005 89.6475C90.2992 89.2236 89.293 88.5854 88.4401 87.7698L72.4554 72.4912L38.1979 105.649C36.6073 107.19 34.4929 108.072 32.2791 108.118C30.0652 108.165 27.9157 107.377 26.2619 105.904ZM126.062 32.1562H108.188L117.125 18.75L126.062 32.1562ZM90.3125 0.875H72.4375V9.8125H90.3125V18.75H76.9062V27.6875H90.3125V36.625H72.4375V45.5625H90.3125C92.6818 45.559 94.953 44.6162 96.6283 42.9408C98.3037 41.2655 99.2465 38.9943 99.25 36.625V9.8125C99.25 7.44213 98.3084 5.16884 96.6323 3.49273C94.9562 1.81663 92.6829 0.875 90.3125 0.875ZM63.5 45.5625H36.6875V27.6875C36.6875 25.3171 37.6291 23.0438 39.3052 21.3677C40.9813 19.6916 43.2546 18.75 45.625 18.75H54.5625V9.8125H36.6875V0.875H54.5625C56.9329 0.875 59.2062 1.81663 60.8823 3.49273C62.5584 5.16884 63.5 7.44213 63.5 9.8125V18.75C63.5 21.1204 62.5584 23.3937 60.8823 25.0698C59.2062 26.7459 56.9329 27.6875 54.5625 27.6875H45.625V36.625H63.5V45.5625ZM18.8125 36.625V0.875H9.875V5.34375H0.9375V14.2812H9.875V36.625H0.9375V45.5625H27.75V36.625H18.8125Z"
                                            fill="white"/>
                                    </svg>
                                )
                            },
                            {
                                label: t("howItWorks.steps.3"),
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="102" height="106"
                                         viewBox="0 0 102 106" fill="none">
                                        <path
                                            d="M82.0353 10.2987L84.882 28.3121L101.262 36.6654L93.002 52.9987L101.309 69.3321L84.7886 77.6854L81.942 95.6987L63.7886 92.8521L50.862 105.732L37.8886 92.6654L19.8753 95.6521L16.982 77.4987L0.695312 69.1921L9.00198 52.8588L0.741979 36.6654L17.122 28.2188L19.9686 10.3454L38.0286 13.3321L51.002 0.21875L63.9286 13.1454L82.0353 10.2987ZM39.3353 29.6654C37.4788 29.6654 35.6983 30.4029 34.3856 31.7157C33.0728 33.0284 32.3353 34.8089 32.3353 36.6654C32.3353 38.5219 33.0728 40.3024 34.3856 41.6152C35.6983 42.9279 37.4788 43.6654 39.3353 43.6654C41.1918 43.6654 42.9723 42.9279 44.2851 41.6152C45.5978 40.3024 46.3353 38.5219 46.3353 36.6654C46.3353 34.8089 45.5978 33.0284 44.2851 31.7157C42.9723 30.4029 41.1918 29.6654 39.3353 29.6654ZM62.6686 62.3321C60.8121 62.3321 59.0317 63.0696 57.7189 64.3823C56.4061 65.6951 55.6686 67.4756 55.6686 69.3321C55.6686 71.1886 56.4061 72.9691 57.7189 74.2818C59.0317 75.5946 60.8121 76.3321 62.6686 76.3321C64.5252 76.3321 66.3056 75.5946 67.6184 74.2818C68.9311 72.9691 69.6686 71.1886 69.6686 69.3321C69.6686 67.4756 68.9311 65.6951 67.6184 64.3823C66.3056 63.0696 64.5252 62.3321 62.6686 62.3321ZM34.2486 76.3321L74.3353 36.2454L67.7553 29.6654L27.6686 69.7521L34.2486 76.3321Z"
                                            fill="white"/>
                                    </svg>
                                )
                            }
                        ].map((item) => (
                            <Box
                                key={item.label}
                                sx={{
                                    backgroundColor: "#000000",
                                    maxWidth: "255px",
                                    width: "100%",
                                    height: "244px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <SvgIcon
                                    sx={{
                                        fontSize: 122
                                    }}
                                >
                                    {item.icon}
                                </SvgIcon>
                                <Typography
                                    color="primaryText.main"
                                    sx={{
                                        mt: "14px",
                                        fontWeight: 600,
                                        fontSize: 17,
                                        lineHeight: "20px",
                                        maxWidth: "158px",
                                        textAlign: "center"
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            mt: "80px",
                            display: "flex",
                            gap: "24px",
                            width: "100%",
                            flexWrap: "wrap",
                            justifyContent: "center"
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: "592px",
                                width: "100%",
                                position: "relative",
                                height: "394px",
                            }}
                        >
                            <Image
                                src="/services-3-img.jpeg"
                                alt="service image"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                                fill
                            />
                        </Box>
                        <Box
                            sx={{
                                maxWidth: "544px",
                                width: "100%",
                                gap: "18px",
                                display: "flex",
                                flexDirection: "column",
                                paddingBottom: {xs: "30px", sm: "72px"}
                            }}
                        >
                            {[
                                {
                                    label: t("howItWorks.args.1.title"),
                                    description: t("howItWorks.args.1.desc")
                                },
                                {
                                    label: t("howItWorks.args.2.title"),
                                    description: t("howItWorks.args.2.desc")
                                },
                                {
                                    label: t("howItWorks.args.3.title"),
                                    description: t("howItWorks.args.3.desc")
                                },
                                {
                                    label: t("howItWorks.args.4.title"),
                                    description: t("howItWorks.args.4.desc")
                                }
                            ].map((item) => (
                                <Box
                                    key={item.label}
                                    sx={{
                                        backgroundColor: "primary.main",
                                        padding: "10px 17px",

                                    }}
                                >
                                    <Typography
                                        color="primaryText.main"
                                        sx={{
                                            fontSize: 20,
                                            lineHeight: "25px",
                                            fontWeight: 600
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                    <Typography
                                        color="primaryText.main"
                                        sx={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            lineHeight: "17px",
                                            mt: "5px"
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </AppContainer>

                <Box
                    sx={{
                        backgroundColor: "#0F0F0F",
                        padding: "40px 0"
                    }}
                >
                    <AppContainer
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <SectionDescription
                            label={t("KeyFeatures.title")}
                            sxTitle={{
                                fontSize: {xs: 28, sm: 40},
                                lineHeight: {xs: "40px", sm: "50px"},
                                fontWeight: 600,

                            }}
                        />

                        <Box
                            sx={{
                                mt: "40px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "24px",
                                width: "100%"
                            }}
                        >
                            {[
                                {
                                    label: t("KeyFeatures.1.title"),
                                    description: t("KeyFeatures.1.desc")
                                },
                                {
                                    label: t("KeyFeatures.2.title"),
                                    description: t("KeyFeatures.2.desc")
                                }
                            ].map((item, idx) => (
                                <Box
                                    key={item.label}
                                    sx={{
                                        backgroundColor: "#252525",
                                        padding: {xs: "0 20px", sm: "0 60px"},
                                        display: "flex",
                                        width: "100%",
                                        gap: "10px",
                                        flexDirection: (idx + 1) % 2 === 0 ? "row-reverse" : "row",
                                        flexWrap: "wrap",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "353px",
                                            maxWidth: "529px",
                                            width: "100%",
                                            position: "relative"
                                        }}
                                    >
                                        {/*<Image*/}
                                        {/*    src="https://s3-alpha-sig.figma.com/img/dc77/2337/07fe25069091d8faa1d54ae19e8f5bd8?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ODxnU5U99Z7ijjjd-bqS3PlnwB-xS0vlMtD~1vCiRw-alDuIxBVdOHzvmOmJSxu9yR0I1kdcYhaQJiWaTCzy~dT7hCRTi-Ocu5Uf3HrCB66FknZ7yhvjQbGdEdkV5AB~J2bpJ1d3Anj5KHtZ5o29tXwkUXzRM6ftVcd4yPvh6v3Rr9iZI7tWZrtR9kWIM6VS1BBZfK6mIEuhkzYTzh18m0urUYzaFQDCwkGqgSZC86QYCnjjeUgxZmMZyM6UeWEq-7tM3myoUKtZW8pRQWFX0I0eAvgliYPkPpH4-akrYKXK13xTL4ubSOrzk26XlVd2QMzM9HL2JHFVN2jkNDO4Ww__"*/}
                                        {/*    alt="service image"*/}
                                        {/*    fill*/}
                                        {/*    style={{*/}
                                        {/*        width: "100%",*/}
                                        {/*        height: "100%",*/}
                                        {/*        objectFit: "cover"*/}
                                        {/*    }}*/}
                                        {/*/>*/}
                                    </Box>
                                    <Box
                                        sx={{
                                            maxWidth: "558px",
                                            width: "100%",
                                            paddingTop: "44px",
                                            paddingBottom: "25px",
                                            display: "flex",
                                            flexDirection: "column"
                                        }}
                                    >
                                        <Typography
                                            color="primaryText.main"
                                            sx={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                                lineHeight: "24px"
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                        <Typography
                                            color="primaryText.main"
                                            sx={{
                                                mt: "16px",
                                                fontSize: 16,
                                                lineHeight: "19px",
                                                fontWeight: 500,
                                                mb: "20px"
                                            }}
                                        >
                                            {item.description}
                                        </Typography>

                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: "2px",
                                                backgroundColor: "primary.main",
                                                mt: "auto",
                                                position: "relative",
                                                "&::after": {
                                                    width: "10px",
                                                    height: "10px",
                                                    backgroundColor: "primary.main",
                                                    display: "block",
                                                    content: '""',
                                                    right: 0,
                                                    top: "calc(50% - 5px)",
                                                    position: "absolute"
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                paddingTop: "40px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <SectionDescription
                                label={t("Experience.title", {year: "7"})}
                                sxTitle={{
                                    fontSize: {xs: 28, sm: 40},
                                    lineHeight: {xs: "40px", sm: "50px"},
                                    fontWeight: 600,

                                }}
                            />

                        </Box>
                        <Box
                            sx={{
                                mt: "40px",
                                display: "flex",
                                gap: "24px",
                                width: "100%",
                                flexWrap: "wrap",
                                justifyContent: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: "554px",
                                    width: "100%",
                                    gap: "18px",
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                {[
                                    {
                                        label: t("Experience.1.prefix", {year: "7"}),
                                        description: t("Experience.1.longDesc", {year: "7"})
                                    },
                                    {
                                        label: t("Experience.2.prefix", {count: "50 000"}),
                                        description: t("Experience.2.longDesc", {count: "50 000"})
                                    },
                                    {
                                        label: t("Experience.3.prefix", {count: "32"}),
                                        description: t("Experience.3.longDesc", {count: "32"})
                                    },
                                    {
                                        label: t("Experience.4.prefix", {count: "64"}),
                                        description: t("Experience.4.longDesc", {count: "64"})
                                    },
                                    {
                                        label: t("Experience.5.prefix", {count: "44"}),
                                        description: t("Experience.5.longDesc", {count: "44"})
                                    }
                                ].map((item) => (
                                    <Box
                                        key={item.label}
                                        sx={{
                                            backgroundColor: "primary.main",
                                            padding: "10px 17px",

                                        }}
                                    >
                                        <Typography
                                            color="primaryText.main"
                                            sx={{
                                                fontSize: 20,
                                                lineHeight: "25px",
                                                fontWeight: 600
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                        <Typography
                                            color="primaryText.main"
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                lineHeight: "17px",
                                                mt: "5px"
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    maxWidth: "592px",
                                    width: "100%",
                                    position: "relative",
                                    minHeight: "392px",
                                    order: {xs: -1, lg: 1}
                                }}
                            >
                                {/*<Image*/}
                                {/*    src="https://s3-alpha-sig.figma.com/img/8c92/f951/dd6a67b7517195972d3140536b753ab4?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ca0d2ti1Ze8j1tN~wnw0L~d62YbyjxVm5-AkD6fMV84M6Gy-G6iXIHQsxObVx1j5cxB2jwjujePsu3tlD17XaYbY1SjgMeSiAyVTr~ODiMRMGygo7cqP1zDY8LRia4uflAkx1mvHdY4DDWiCWZCAnKn0o69GTdcjQIQYnnpfrXHoxlRR9KtXsYP2pLUN-0MQNKbnQk1YrYTX0cnbFMqALgE4tz7Hvpm2zmrXmdCtyho9X3l4JXiWVtypEVxB8ISJp5qCKy1TER6Hc04ybHfrFkWt0anfChDULUwaOJLFvmD0vLHAy2BDyB5COyyzyewA3~7jTBkFr1o6TC2q52WtXw__"*/}
                                {/*    alt="service image"*/}
                                {/*    style={{*/}
                                {/*        width: "100%",*/}
                                {/*        height: "100%",*/}
                                {/*        objectFit: "cover"*/}
                                {/*    }}*/}
                                {/*    fill*/}
                                {/*/>*/}
                            </Box>
                        </Box>

                    </AppContainer>
                </Box>

            </Box>

            <HomeFaq/>

            <HomeFooter/>

        </Box>
    );
};

export default Page;
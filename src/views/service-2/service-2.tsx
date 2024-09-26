"use client";
import React, {FC, useState} from 'react';
import ServicesImg from "@/components/services-img/services-img";
import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import AppContainer from "@/ui/app-container/app-container";
import {Box, Card, CardContent, CardMedia, SvgIcon, Tab, Tabs, Typography} from '@mui/material';
import SectionDescription from "@/components/section-description/section-description";
import TitleSection from "@/ui/title-section/title-section";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import ServiceCard from "@/app/[locale]/services/2/components/service-card/service-card";
import TrashIcon from "@/ui/icons/trash-icon";
import HomeFooter from "@/components/home-footer/home-footer";
import {ServicePrice} from "@/http/service-api";
import { useTranslations } from 'next-intl';

interface IThirdService {
    servicePrices: ServicePrice[];
}
const SecondService: FC<IThirdService> = ({ servicePrices }) => {
    const [value, setValue] = useState('1');

    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };
    const t = useTranslations("ServicePages.2") 
    const tb = useTranslations("Breadcrumbs")
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
                            label: tb("main"),
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
            <ServicesImg
                title={t("title")}
                text={t("desc")}
                img={<Image
                    src="/service-hero-1-img.png"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }}
                    alt="service img"
                    fill
                />}
            />

            <Box
                sx={{
                    padding: "40px 0"
                }}
            >
                <AppContainer
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <TitleSection
                        label={t("CompCarry.title")}
                    />
                    <SectionDescription
                        label={t(`CompCarry.desc`)}
                    />
                    <Box
                        sx={{
                            display: "grid",
                            width: "100%",
                            justifyItems: "center",
                            mt: {xs: "20px", sm: "50px"},
                            gridTemplateColumns: {
                                xs: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                                lg: "repeat(3, 1fr)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                width: {xs: "300px", sm: "479px"},
                                height: {xs: "300px", sm: "430px"},
                                position: "relative"
                            }}
                        >
                            <Image
                                src="/taking-care-computer.png"
                                fill
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                                alt="taking care computer image"
                            />
                        </Box>
                        {[
                            [
                                {
                                    label: t("CompCarry.negative.1"),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                                             viewBox="0 0 50 50"
                                             fill="none">
                                            <path
                                                d="M25 46.875C12.9375 46.875 3.125 37.0625 3.125 25C3.125 12.9375 12.9375 3.125 25 3.125C37.0625 3.125 46.875 12.9375 46.875 25C46.875 37.0625 37.0625 46.875 25 46.875ZM25 6.25C14.6562 6.25 6.25 14.6562 6.25 25C6.25 35.3438 14.6562 43.75 25 43.75C35.3438 43.75 43.75 35.3438 43.75 25C43.75 14.6562 35.3438 6.25 25 6.25Z"
                                                fill="#D3176D"/>
                                            <path
                                                d="M31.25 32.8125C30.9688 32.8125 30.6875 32.75 30.4375 32.5938L22.625 27.9063C22.3947 27.766 22.2046 27.5686 22.0731 27.3331C21.9417 27.0976 21.8735 26.8322 21.875 26.5625V14.0625C21.875 13.1875 22.5625 12.5 23.4375 12.5C24.3125 12.5 25 13.1875 25 14.0625V25.6875L32.0625 29.9062C32.3534 30.0845 32.5783 30.3528 32.703 30.6704C32.8277 30.988 32.8454 31.3376 32.7536 31.6661C32.6617 31.9947 32.4652 32.2844 32.1939 32.4913C31.9226 32.6981 31.5912 32.8109 31.25 32.8125Z"
                                                fill="#D3176D"/>
                                        </svg>
                                    )
                                },
                                {
                                    label: t("CompCarry.negative.2"),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42"
                                             viewBox="0 0 42 42" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M3.945 1.81872C4.18778 1.27379 4.63703 0.847578 5.19397 0.633801C5.75092 0.420024 6.36996 0.43618 6.915 0.678715L32.688 12.1627L33.771 9.77771C33.9555 9.37198 34.2564 9.0302 34.6355 8.79573C35.0146 8.56126 35.4548 8.44466 35.9002 8.46073C36.3457 8.4768 36.7763 8.62481 37.1375 8.88599C37.4987 9.14716 37.7742 9.50974 37.929 9.92772L40.329 16.4077C40.5363 16.9652 40.5144 17.582 40.2682 18.1234C40.0219 18.6647 39.5714 19.0866 39.015 19.2967L32.565 21.7267C32.1479 21.8848 31.6932 21.9154 31.2587 21.8145C30.8242 21.7136 30.4295 21.4859 30.1247 21.1602C29.8199 20.8345 29.6188 20.4256 29.5469 19.9853C29.475 19.5451 29.5356 19.0934 29.721 18.6877L30.825 16.2577L5.085 4.79172C4.54007 4.54894 4.11386 4.09969 3.90009 3.54274C3.68631 2.9858 3.70246 2.36375 3.945 1.81872ZM3.75 16.5007C2.95435 16.5007 2.19129 16.8168 1.62868 17.3794C1.06607 17.942 0.75 18.7051 0.75 19.5007V40.5007C0.75 40.8985 0.908035 41.2801 1.18934 41.5614C1.47064 41.8427 1.85218 42.0007 2.25 42.0007H9.75C10.1478 42.0007 10.5294 41.8427 10.8107 41.5614C11.092 41.2801 11.25 40.8985 11.25 40.5007V19.5007C11.25 18.7051 10.9339 17.942 10.3713 17.3794C9.80871 16.8168 9.04565 16.5007 8.25 16.5007H3.75ZM16.629 21.8797C17.1915 21.3171 17.9544 21.0009 18.75 21.0007H23.25C24.0456 21.0007 24.8087 21.3168 25.3713 21.8794C25.9339 22.442 26.25 23.2051 26.25 24.0007V40.5007C26.25 40.8985 26.092 41.2801 25.8107 41.5614C25.5294 41.8427 25.1478 42.0007 24.75 42.0007H17.25C16.8522 42.0007 16.4706 41.8427 16.1893 41.5614C15.908 41.2801 15.75 40.8985 15.75 40.5007V24.0007C15.7502 23.2051 16.0664 22.4422 16.629 21.8797ZM33.75 25.5007C32.9543 25.5007 32.1913 25.8168 31.6287 26.3794C31.0661 26.942 30.75 27.7051 30.75 28.5007V40.5007C30.75 40.8985 30.908 41.2801 31.1893 41.5614C31.4706 41.8427 31.8522 42.0007 32.25 42.0007H39.75C40.1478 42.0007 40.5294 41.8427 40.8107 41.5614C41.092 41.2801 41.25 40.8985 41.25 40.5007V28.5007C41.25 27.7051 40.9339 26.942 40.3713 26.3794C39.8087 25.8168 39.0457 25.5007 38.25 25.5007H33.75Z"
                                                  fill="#D3176D"/>
                                        </svg>
                                    )
                                },
                            {
                                    label: t("CompCarry.negative.3"),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43"
                                             viewBox="0 0 43 43" fill="none">
                                            <path
                                                d="M21.4974 22.3945C19.8343 22.3945 18.2393 23.0552 17.0632 24.2312C15.8872 25.4072 15.2266 27.0022 15.2266 28.6654C15.2266 30.3285 15.8872 31.9235 17.0632 33.0995C18.2393 34.2755 19.8343 34.9362 21.4974 34.9362C23.1605 34.9362 24.7555 34.2755 25.9315 33.0995C27.1076 31.9235 27.7682 30.3285 27.7682 28.6654C27.7682 27.0022 27.1076 25.4072 25.9315 24.2312C24.7555 23.0552 23.1605 22.3945 21.4974 22.3945ZM18.8099 28.6654C18.8099 27.9526 19.093 27.269 19.597 26.765C20.1011 26.261 20.7846 25.9779 21.4974 25.9779C22.2102 25.9779 22.8937 26.261 23.3977 26.765C23.9017 27.269 24.1849 27.9526 24.1849 28.6654C24.1849 29.3781 23.9017 30.0617 23.3977 30.5657C22.8937 31.0697 22.2102 31.3529 21.4974 31.3529C20.7846 31.3529 20.1011 31.0697 19.597 30.5657C19.093 30.0617 18.8099 29.3781 18.8099 28.6654Z"
                                                fill="#D3176D"/>
                                            <path
                                                d="M31.4007 9.16515L25.705 1.17969L4.76225 17.9103L3.60125 17.8977V17.9156H2.6875V39.4156H40.3125V17.9156H38.5889L35.1597 7.8841L31.4007 9.16515ZM34.8031 17.9156H16.8363L30.2182 13.3541L32.9452 12.4815L34.8031 17.9156ZM27.8604 10.3727L14.0467 15.0812L24.9866 6.34148L27.8604 10.3727ZM6.27083 32.5518V24.7759C7.02723 24.509 7.71429 24.0761 8.28163 23.5091C8.84897 22.9421 9.28221 22.2552 9.54958 21.499H33.4504C33.7176 22.2556 34.1507 22.9427 34.7181 23.5101C35.2854 24.0774 35.9726 24.5106 36.7292 24.7777V32.5536C35.9726 32.8207 35.2854 33.2538 34.7181 33.8212C34.1507 34.3886 33.7176 35.0757 33.4504 35.8323H9.55317C9.28475 35.0757 8.85077 34.3885 8.28291 33.8209C7.71505 33.2534 7.02764 32.8198 6.27083 32.5518Z"
                                                fill="#D3176D"/>
                                        </svg>
                                    )
                                }
                            ],
                            [
                                {
                                    label: t("CompCarry.negative.4"),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="39"
                                             viewBox="0 0 40 39" fill="none">
                                            <path
                                                d="M12.5 10V8.5C12.5 6.51088 13.2902 4.60322 14.6967 3.1967C16.1032 1.79018 18.0109 1 20 1C21.9891 1 23.8968 1.79018 25.3033 3.1967C26.7098 4.60322 27.5 6.51088 27.5 8.5V10M33.5 10H6.5C4.9087 10 3.38258 10.6321 2.25736 11.7574C1.13214 12.8826 0.5 14.4087 0.5 16V32.5C0.5 34.0913 1.13214 35.6174 2.25736 36.7426C3.38258 37.8679 4.9087 38.5 6.5 38.5H33.5C35.0913 38.5 36.6174 37.8679 37.7426 36.7426C38.8679 35.6174 39.5 34.0913 39.5 32.5V16C39.5 14.4087 38.8679 12.8826 37.7426 11.7574C36.6174 10.6321 35.0913 10 33.5 10Z"
                                                stroke="#D3176D" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path
                                                d="M15.5 20.5C15.5 19.61 15.7639 18.74 16.2584 17.9999C16.7529 17.2599 17.4557 16.6831 18.2779 16.3425C19.1002 16.0019 20.005 15.9128 20.8779 16.0865C21.7508 16.2601 22.5526 16.6887 23.182 17.318C23.8113 17.9474 24.2399 18.7492 24.4135 19.6221C24.5872 20.495 24.4981 21.3998 24.1575 22.2221C23.8169 23.0443 23.2401 23.7471 22.5001 24.2416C21.76 24.7361 20.89 25 20 25V26.5M20.006 32.5C19.8071 32.5 19.6163 32.421 19.4757 32.2803C19.335 32.1397 19.256 31.9489 19.256 31.75C19.256 31.5511 19.335 31.3603 19.4757 31.2197C19.6163 31.079 19.8071 31 20.006 31C20.2049 31 20.3957 31.079 20.5363 31.2197C20.677 31.3603 20.756 31.5511 20.756 31.75C20.756 31.9489 20.677 32.1397 20.5363 32.2803C20.3957 32.421 20.2049 32.5 20.006 32.5Z"
                                                stroke="#D3176D" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )
                                },
                                {
                                    label: t("CompCarry.negative.5"),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="35"
                                             viewBox="0 0 41 35" fill="none">
                                            <path
                                                d="M0.789062 34.6237L20.4974 0.582031L40.2057 34.6237H0.789062ZM20.4974 29.2487C21.005 29.2487 21.4309 29.0767 21.7749 28.7327C22.1189 28.3887 22.2903 27.9635 22.2891 27.457C22.2879 26.9506 22.1159 26.5254 21.7731 26.1814C21.4303 25.8374 21.005 25.6654 20.4974 25.6654C19.9898 25.6654 19.5645 25.8374 19.2217 26.1814C18.8789 26.5254 18.7069 26.9506 18.7057 27.457C18.7045 27.9635 18.8765 28.3893 19.2217 28.7345C19.5669 29.0797 19.9921 29.2511 20.4974 29.2487ZM18.7057 23.8737H22.2891V14.9154H18.7057V23.8737Z"
                                                fill="#D3176D"/>
                                        </svg>
                                    )
                                },
                                {
                                    label: t("CompCarry.negative.6"),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41"
                                             viewBox="0 0 41 41" fill="none">
                                            <g clipPath="url(#clip0_1256_2514)">
                                                <path
                                                    d="M21.7812 38.4375C19.8062 38.4384 17.886 37.7873 16.3189 36.5853C14.7517 35.3833 13.6251 33.6975 13.114 31.7897C12.6029 29.8819 12.7358 27.8588 13.4921 26.0343C14.2484 24.2097 15.5859 22.6859 17.2969 21.6993L17.9375 21.3303V6.40625C17.934 5.49963 18.2519 4.62111 18.8348 3.92671C19.4177 3.23231 20.2279 2.76697 21.1214 2.61334C22.0149 2.45971 22.9339 2.62773 23.7153 3.08757C24.4966 3.5474 25.0897 4.26928 25.3892 5.125H21.7812V7.6875H25.625V10.25H21.7812V12.8125H25.625V15.375H21.7812V17.9375H25.625V21.3303L26.2656 21.6993C27.9766 22.6859 29.3141 24.2097 30.0704 26.0343C30.8267 27.8588 30.9596 29.8819 30.4485 31.7897C29.9374 33.6975 28.8108 35.3833 27.2436 36.5853C25.6765 37.7873 23.7563 38.4384 21.7812 38.4375ZM28.1875 19.8799V6.40625C28.1875 4.70721 27.5126 3.07775 26.3112 1.87635C25.1097 0.674942 23.4803 0 21.7812 0C20.0822 0 18.4528 0.674942 17.2513 1.87635C16.0499 3.07775 15.375 4.70721 15.375 6.40625V19.8799C13.318 21.2542 11.7576 23.2537 10.9241 25.583C10.0907 27.9122 10.0284 30.4478 10.7465 32.8151C11.4646 35.1825 12.925 37.2561 14.9121 38.7298C16.8991 40.2035 19.3074 40.9991 21.7812 40.9991C24.2551 40.9991 26.6634 40.2035 28.6504 38.7298C30.6375 37.2561 32.0979 35.1825 32.816 32.8151C33.5341 30.4478 33.4718 27.9122 32.6384 25.583C31.8049 23.2537 30.2445 21.2542 28.1875 19.8799Z"
                                                    fill="#D3176D"/>
                                                <path
                                                    d="M21.7812 23.0625C23.4803 23.0625 25.1097 23.7374 26.3112 24.9388C27.5126 26.1403 28.1875 27.7697 28.1875 29.4688C28.1875 31.1678 27.5126 32.7972 26.3112 33.9987C25.1097 35.2001 23.4803 35.875 21.7812 35.875C20.0822 35.875 18.4528 35.2001 17.2513 33.9987C16.0499 32.7972 15.375 31.1678 15.375 29.4688C15.375 27.7697 16.0499 26.1403 17.2513 24.9388C18.4528 23.7374 20.0822 23.0625 21.7812 23.0625Z"
                                                    fill="#D3176D"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1256_2514">
                                                    <rect width="41" height="41" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    )
                                }
                            ]
                        ].map((parent, idx) => (
                            <Box
                                key={idx}
                                sx={{}}
                            >
                                {parent.map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: "34px"
                                        }}
                                    >
                                        <SvgIcon
                                            sx={{
                                                fontSize: 43
                                            }}
                                        >
                                            {item.icon}
                                        </SvgIcon>
                                        <Typography
                                            sx={{
                                                ml: "10px",
                                                color: theme => theme.palette.primaryText.main,
                                                fontSize: {xs: 14, sm: 16},
                                                lineHeight: "19px",
                                                fontWeight: 500
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            mt: "20px"
                        }}
                    >
                        <SectionDescription
                            label={t("CompCarry.selfRepair.title")}
                        />

                        <Box
                            sx={{
                                display: "grid",
                                justifyItems: "center",
                                gap: "48px",
                                mt: "40px",
                                gridTemplateColumns: {
                                    xs: "repeat(1, 1fr)",
                                    sm: "repeat(2, 1fr)",
                                    md: "repeat(3, 1fr)",
                                    lg: "repeat(4, 1fr)"
                                }
                            }}
                        >
                            {[
                                {
                                    label: t("CompCarry.selfRepair.cases.1"),
                                    src: "/risk-of-electric-shock.jpeg"
                                },
                                {
                                    label: t("CompCarry.selfRepair.cases.2"),
                                    src: "/loss-of-important-data.jpeg"
                                },
                                {
                                    label: t("CompCarry.selfRepair.cases.3"),
                                    src: "/wasting-time.jpeg"
                                },
                                {
                                    label: t("CompCarry.selfRepair.cases.4"),
                                    src: "/wnforeseen-expenses.jpeg"
                                }
                            ].map((item, idx) => (
                                <Card
                                    sx={{
                                        minWidth: "255px",
                                        width: "100%",
                                        borderRadius: 0,
                                        backgroundColor: "#000000"
                                    }}
                                    key={idx}
                                >
                                    <CardContent
                                        sx={{
                                            padding: "20px"
                                        }}
                                    >
                                        <CardMedia
                                            sx={{height: 160}}
                                            image={item.src}
                                            title="green iguana"
                                        />

                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 17,
                                                lineHeight: "20px",
                                                color: theme => theme.palette.primaryText.main,
                                                mt: "20px"
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                    </Box>

                </AppContainer>
            </Box>

            <Box
                sx={{
                    backgroundColor: theme => theme.palette.secondary.light,
                    padding: "40px 0"
                }}
            >
                <AppContainer
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    <TitleSection
                        label={t(`WhyShouldRegCheck.title`)}
                    />
                    <SectionDescription
                        label={t(`WhyShouldRegCheck.desc`)}
                        sxTitle={{
                            textAlign: "center"
                        }}
                    />

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                sm: "repeat(1, 1fr)",
                                md: "repeat(2, 1fr)",
                                lg: "repeat(3, 1fr)"
                            },
                            alignItems: "center"
                            // justifyContent: "space-between"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "35px",
                                mb: {
                                    xs: "30px",
                                    md: 0,
                                },
                            }}
                        >
                            {[
                                {
                                    title: t(`WhyShouldRegCheck.args.1`),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="45"
                                             viewBox="0 0 40 45" fill="none">
                                            <mask id="mask0_1256_2572"
                                                // style="mask-type:luminance"
                                                  maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="45">
                                                <path
                                                    d="M2 7.256L20.009 2L38 7.256V18.034C37.9999 23.5577 36.2617 28.9413 33.0316 33.4222C29.8016 37.903 25.2434 41.2539 20.003 43C14.761 41.2541 10.2013 37.9028 6.9701 33.421C3.73891 28.9392 2.00008 23.5541 2 18.029V7.256Z"
                                                    fill="white" stroke="white" strokeWidth="4"
                                                    strokeLinejoin="round"/>
                                                <path d="M11 21L18 28L30 16" stroke="black" strokeWidth="4"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </mask>
                                            <g mask="url(#mask0_1256_2572)">
                                                <path d="M-4 -2H44V46H-4V-2Z" fill="white"/>
                                            </g>
                                        </svg>
                                    )
                                },
                                {
                                    title: t(`WhyShouldRegCheck.args.2`),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43"
                                             viewBox="0 0 43 43" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M30.7028 0.677108C31.0253 0.353711 31.4366 0.133453 31.8845 0.0443115C32.3324 -0.0448298 32.7966 0.00116914 33.2183 0.176465L39.7513 2.88547C40.3146 3.11809 40.7629 3.56453 40.9978 4.12698C41.2326 4.68943 41.235 5.32204 41.0044 5.88625L38.3353 12.4192C38.1629 12.841 37.8692 13.2023 37.4914 13.4572C37.1136 13.7121 36.6687 13.8492 36.213 13.8511C35.7573 13.8531 35.3112 13.7199 34.9312 13.4682C34.5512 13.2166 34.2544 12.858 34.0783 12.4376L33.0248 9.91904L6.49384 21.2557C6.21553 21.3747 5.91651 21.4377 5.61385 21.4411C5.31119 21.4445 5.01083 21.3883 4.7299 21.2756C4.44897 21.163 4.19298 20.9961 3.97654 20.7845C3.76011 20.5729 3.58747 20.3208 3.46848 20.0425C3.34949 19.7642 3.28649 19.4651 3.28306 19.1625C3.27964 18.8598 3.33586 18.5595 3.44852 18.2785C3.56117 17.9976 3.72806 17.7416 3.93965 17.5252C4.15124 17.3087 4.40339 17.1361 4.6817 17.0171L31.2465 5.66818L30.2114 3.19568C30.0343 2.77447 29.9865 2.3101 30.074 1.86163C30.1615 1.41316 30.3804 1.00084 30.7028 0.677108ZM39.1585 16.8328C39.9731 16.8328 40.7543 17.1564 41.3303 17.7324C41.9063 18.3084 42.2299 19.0897 42.2299 19.9043V41.4043C42.2299 41.8115 42.0681 42.2022 41.7801 42.4902C41.4921 42.7782 41.1015 42.94 40.6942 42.94H33.0156C32.6083 42.94 32.2177 42.7782 31.9297 42.4902C31.6417 42.2022 31.4799 41.8115 31.4799 41.4043V19.9043C31.4799 19.0897 31.8035 18.3084 32.3795 17.7324C32.9555 17.1564 33.7367 16.8328 34.5513 16.8328H39.1585ZM25.9728 22.3368C25.3965 21.7619 24.6154 21.4393 23.8013 21.44H19.1942C18.3796 21.44 17.5984 21.7636 17.0224 22.3396C16.4464 22.9156 16.1228 23.6968 16.1228 24.5114V41.4043C16.1228 41.8115 16.2846 42.2022 16.5726 42.4902C16.8606 42.7782 17.2512 42.94 17.6585 42.94H25.3371C25.7443 42.94 26.135 42.7782 26.423 42.4902C26.711 42.2022 26.8728 41.8115 26.8728 41.4043V24.5114C26.8731 24.1076 26.7938 23.7076 26.6393 23.3345C26.4849 22.9614 26.2584 22.6223 25.9728 22.3368ZM8.4442 26.0471C9.25879 26.0471 10.04 26.3707 10.616 26.9467C11.192 27.5227 11.5156 28.3039 11.5156 29.1185V41.4043C11.5156 41.8115 11.3538 42.2022 11.0658 42.4902C10.7778 42.7782 10.3872 42.94 9.97991 42.94H2.30134C1.89404 42.94 1.50343 42.7782 1.21543 42.4902C0.927423 42.2022 0.765625 41.8115 0.765625 41.4043V29.1185C0.765625 28.3039 1.08922 27.5227 1.66523 26.9467C2.24123 26.3707 3.02246 26.0471 3.83705 26.0471H8.4442Z"
                                                  fill="white"/>
                                        </svg>
                                    )
                                },
                                {
                                    title: t(`WhyShouldRegCheck.args.3`),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36"
                                             viewBox="0 0 30 36" fill="none">
                                            <path
                                                d="M12.75 4.5H8.25C7.21584 4.5 6.19181 4.70369 5.23637 5.09945C4.28093 5.4952 3.4128 6.07527 2.68153 6.80653C1.95027 7.5378 1.3702 8.40593 0.974449 9.36137C0.578693 10.3168 0.375 11.3408 0.375 12.375C0.375 13.4092 0.578693 14.4332 0.974449 15.3886C1.3702 16.3441 1.95027 17.2122 2.68153 17.9435C3.4128 18.6747 4.28093 19.2548 5.23637 19.6506C6.19181 20.0463 7.21584 20.25 8.25 20.25H12.75V27H2.625V31.5H12.75V36H17.25V31.5H21.75C23.8386 31.5 25.8416 30.6703 27.3185 29.1935C28.7953 27.7166 29.625 25.7136 29.625 23.625C29.625 21.5364 28.7953 19.5334 27.3185 18.0565C25.8416 16.5797 23.8386 15.75 21.75 15.75H17.25V9H27.375V4.5H17.25V0H12.75V4.5ZM17.25 20.25H21.75C22.6451 20.25 23.5036 20.6056 24.1365 21.2385C24.7694 21.8714 25.125 22.7299 25.125 23.625C25.125 24.5201 24.7694 25.3786 24.1365 26.0115C23.5036 26.6444 22.6451 27 21.75 27H17.25V20.25ZM12.75 15.75H8.25C7.80679 15.75 7.36792 15.6627 6.95844 15.4931C6.54897 15.3235 6.17691 15.0749 5.86351 14.7615C5.55012 14.4481 5.30152 14.076 5.13191 13.6666C4.9623 13.2571 4.875 12.8182 4.875 12.375C4.875 11.9318 4.9623 11.4929 5.13191 11.0834C5.30152 10.674 5.55012 10.3019 5.86351 9.98851C6.17691 9.67512 6.54897 9.42652 6.95844 9.25691C7.36792 9.0873 7.80679 9 8.25 9H12.75V15.75Z"
                                                fill="white"/>
                                        </svg>
                                    )
                                }
                            ].map((item, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "flex",
                                        gap: "13px",
                                        alignItems: "center",
                                    }}
                                >
                                    <SvgIcon
                                        sx={{
                                            fontSize: 48
                                        }}
                                    >
                                        {item.icon}
                                    </SvgIcon>
                                    <Typography
                                        sx={{
                                            color: theme => theme.palette.primaryText.main,
                                            fontSize: 16,
                                            lineHeight: "19px",
                                            fontWeight: 500
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                maxWidth: "448px",
                                width: "100%",
                                height: "362px",
                                position: "relative",
                                order: {
                                    xs: -1,
                                    md: 0,
                                },
                            }}
                        >
                            <Image
                                src="/pc-img.png"
                                fill
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                                alt={"pc image"}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "35px",
                            }}
                        >
                            {[
                                {
                                    title: t(`WhyShouldRegCheck.args.4`),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42"
                                             viewBox="0 0 43 42" fill="none">
                                            <path
                                                d="M21.5208 0.167969C10.0333 0.167969 0.6875 9.5138 0.6875 21.0013C0.6875 32.4888 10.0333 41.8346 21.5208 41.8346C33.0083 41.8346 42.3542 32.4888 42.3542 21.0013C42.3542 9.5138 33.0083 0.167969 21.5208 0.167969ZM33.5 23.0846H19.4375V8.5013H23.6042V18.918H33.5V23.0846Z"
                                                fill="white"/>
                                        </svg>
                                    )
                                },
                                {
                                    title: t(`WhyShouldRegCheck.args.5`),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38"
                                             viewBox="0 0 38 38" fill="none">
                                            <path
                                                d="M12 24.25C20.5312 24.25 24.25 20.6607 24.25 12C24.25 20.6607 27.9425 24.25 36.5 24.25C27.9425 24.25 24.25 27.9425 24.25 36.5C24.25 27.9425 20.5312 24.25 12 24.25ZM1.5 9.375C6.9845 9.375 9.375 7.0685 9.375 1.5C9.375 7.0685 11.7498 9.375 17.25 9.375C11.7498 9.375 9.375 11.7498 9.375 17.25C9.375 11.7498 6.9845 9.375 1.5 9.375Z"
                                                stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                        </svg>
                                    )
                                },
                                {
                                    title: t(`WhyShouldRegCheck.args.6`),
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="34"
                                             viewBox="0 0 40 34" fill="none">
                                            <path
                                                d="M32.9667 0.667969L40 7.7013L14.0667 33.668L0 19.5846L7.03333 12.5513L14.0667 19.5846L32.9667 0.667969ZM32.9667 5.33464L14.0667 24.268L7.03333 17.318L4.68333 19.5846L14.0667 28.9513L35.3167 7.7013L32.9667 5.33464Z"
                                                fill="white"/>
                                        </svg>
                                    )
                                }
                            ].map((item, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: "flex",
                                        gap: "13px",
                                        alignItems: "center",
                                    }}
                                >
                                    <SvgIcon
                                        sx={{
                                            fontSize: 48
                                        }}
                                    >
                                        {item.icon}
                                    </SvgIcon>
                                    <Typography
                                        sx={{
                                            color: theme => theme.palette.primaryText.main,
                                            fontSize: 16,
                                            lineHeight: "19px",
                                            fontWeight: 500
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            mt: "50px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <TitleSection
                            label={t(`Plans.title`)}
                        />
                        <Typography
                            sx={{
                                fontSize: {xs: 16, sm: 20},
                                lineHeight: "24px",
                                fontWeight: 500,
                                color: theme => theme.palette.primaryText.main,
                                mt: "16px"
                            }}
                        >
                            {t(`Plans.desc`)}
                        </Typography>

                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <Tabs
                                        onChange={handleChange}
                                        value={value}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        sx={{
                                            width: "100%",
                                            mb: "28px"
                                        }}
                                    >
                                        <Tab
                                            label={t(`Plans.titles.1`)}
                                            value="1"
                                            sx={{
                                                color: "#8D8D8D",
                                                fontSize: {xs: 15, sm: 18},
                                                lineHeight: "20px",
                                                textTransform: "math-auto",
                                                '&.Mui-selected': {
                                                    color: 'primaryText.main',
                                                }
                                            }}
                                        />
                                        <Tab
                                            label={t(`Plans.titles.2`)}
                                            value="2"
                                            sx={{
                                                color: "#8D8D8D",
                                                fontSize: {xs: 15, sm: 18},
                                                lineHeight: "20px",
                                                textTransform: "math-auto",
                                                '&.Mui-selected': {
                                                    color: 'primaryText.main',
                                                }
                                            }}
                                        />
                                        <Tab
                                            label={t(`Plans.titles.3`)}
                                            value="3"
                                            sx={{
                                                color: "#8D8D8D",
                                                fontSize: {xs: 15, sm: 18},
                                                lineHeight: "20px",
                                                textTransform: "math-auto",
                                                '&.Mui-selected': {
                                                    color: 'primaryText.main',
                                                }
                                            }}
                                        />
                                    </Tabs>
                                </Box>
                                <TabPanel
                                    value="1"
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "25px",
                                        width: "100%",
                                        justifyContent: "center",
                                        padding: 0
                                    }}
                                >
                                    <ServiceCard
                                        title="INGAME SERVICE PLUS"
                                        description={t(`Plans.standard.1.desc`)}
                                        services={[
                                            {
                                                label: t(`Plans.standard.1.list.1`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                         viewBox="0 0 18 18" fill="none">
                                                        <path
                                                            d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.1.list.2`),
                                                icon: (
                                                    <TrashIcon
                                                        sx={{
                                                            fontSize: 18,
                                                            "& path": {
                                                                fill: "#ffffff"
                                                            }
                                                        }}
                                                    />
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.1.list.3`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"
                                                         viewBox="0 0 20 12" fill="none">
                                                        <path
                                                            d="M15.408 6C15.408 3.234 16.685 1.68 17.685 1.68H19C18.332 0.621 17.779 0 15.342 0H5.334C1.6 0 0 3.441 0 6C0 8.559 1.6 12 5.334 12H15.342C17.78 12 18.332 11.379 19 10.32H17.685C16.685 10.32 15.408 8.766 15.408 6ZM12.688 7.795C12.524 8.045 12.012 7.811 12.012 7.811L9.055 6.473C9.055 6.473 8.791 7.143 8.588 7.614C8.383 8.085 8.227 8.618 7.379 8.022C6.53 7.424 3.798 4.772 3.798 4.772C3.798 4.772 3.453 4.488 3.625 4.221C3.788 3.969 4.301 4.205 4.301 4.205L7.257 5.541C7.257 5.541 7.522 4.873 7.725 4.402C7.93 3.932 8.086 3.396 8.934 3.994C9.783 4.59 12.514 7.244 12.514 7.244C12.514 7.244 12.859 7.527 12.688 7.795ZM18.874 3.928H18.125C17.566 3.928 17.02 4.682 17.02 5.907C17.02 7.134 17.567 7.887 18.125 7.887H18.874C19.434 7.887 20 7.133 20 5.907C20 4.682 19.434 3.928 18.874 3.928Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.1.list.4`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M19.1673 0.833984H0.833984V19.1673L4.50065 15.5007H19.1673V0.833984ZM4.50065 11.834V9.56982L10.8073 3.26315C10.9907 3.07982 11.2748 3.07982 11.4582 3.26315L13.0807 4.88565C13.264 5.06898 13.264 5.35315 13.0807 5.53648L6.76482 11.834H4.50065ZM15.5007 11.834H8.62565L10.459 10.0007H15.5007V11.834Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            }
                                        ]}
                                        price={{
                                            uzs: +(servicePrices.find((item) => item.subCategory === "servicePlus")?.price || 0),
                                            usd: +(servicePrices.find((item) => item.subCategory === "servicePlus")?.price || 0)
                                        }}
                                    />
                                    <ServiceCard
                                        title="INGAME SERVICE PREMIUM"
                                        description={t(`Plans.standard.2.desc`)}
                                        services={[
                                            {
                                                label: t(`Plans.standard.2.list.1`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                         viewBox="0 0 18 18" fill="none">
                                                        <path
                                                            d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.2.list.2`),
                                                icon: (
                                                    <TrashIcon
                                                        sx={{
                                                            fontSize: 18,
                                                            "& path": {
                                                                fill: "#ffffff"
                                                            }
                                                        }}
                                                    />
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.2.list.3`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M11.2493 12.916C11.2493 12.1302 11.2493 11.7377 11.4935 11.4935C11.7377 11.2493 12.1302 11.2493 12.916 11.2493H16.666C17.4518 11.2493 17.8443 11.2493 18.0885 11.4935C18.3327 11.7377 18.3327 12.1302 18.3327 12.916V16.666C18.3327 17.4518 18.3327 17.8443 18.0885 18.0885C17.8443 18.3327 17.4518 18.3327 16.666 18.3327H12.916C12.1302 18.3327 11.7377 18.3327 11.4935 18.0885C11.2493 17.8443 11.2493 17.4518 11.2493 16.666V12.916ZM1.66602 3.33268C1.66602 2.54685 1.66602 2.15435 1.91018 1.91018C2.15435 1.66602 2.54685 1.66602 3.33268 1.66602H7.08268C7.86852 1.66602 8.26102 1.66602 8.50518 1.91018C8.74935 2.15435 8.74935 2.54685 8.74935 3.33268V7.08268C8.74935 7.86852 8.74935 8.26102 8.50518 8.50518C8.26102 8.74935 7.86852 8.74935 7.08268 8.74935H3.33268C2.54685 8.74935 2.15435 8.74935 1.91018 8.50518C1.66602 8.26102 1.66602 7.86852 1.66602 7.08268V3.33268ZM1.66602 12.916C1.66602 12.1302 1.66602 11.7377 1.91018 11.4935C2.15435 11.2493 2.54685 11.2493 3.33268 11.2493H7.08268C7.86852 11.2493 8.26102 11.2493 8.50518 11.4935C8.74935 11.7377 8.74935 12.1302 8.74935 12.916V16.666C8.74935 17.4518 8.74935 17.8443 8.50518 18.0885C8.26102 18.3327 7.86852 18.3327 7.08268 18.3327H3.33268C2.54685 18.3327 2.15435 18.3327 1.91018 18.0885C1.66602 17.8443 1.66602 17.4518 1.66602 16.666V12.916ZM11.2493 3.33268C11.2493 2.54685 11.2493 2.15435 11.4935 1.91018C11.7377 1.66602 12.1302 1.66602 12.916 1.66602H16.666C17.4518 1.66602 17.8443 1.66602 18.0885 1.91018C18.3327 2.15435 18.3327 2.54685 18.3327 3.33268V7.08268C18.3327 7.86852 18.3327 8.26102 18.0885 8.50518C17.8443 8.74935 17.4518 8.74935 16.666 8.74935H12.916C12.1302 8.74935 11.7377 8.74935 11.4935 8.50518C11.2493 8.26102 11.2493 7.86852 11.2493 7.08268V3.33268Z"
                                                            stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.2.list.4`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"
                                                         viewBox="0 0 20 12" fill="none">
                                                        <path
                                                            d="M15.408 6C15.408 3.234 16.685 1.68 17.685 1.68H19C18.332 0.621 17.779 0 15.342 0H5.334C1.6 0 0 3.441 0 6C0 8.559 1.6 12 5.334 12H15.342C17.78 12 18.332 11.379 19 10.32H17.685C16.685 10.32 15.408 8.766 15.408 6ZM12.688 7.795C12.524 8.045 12.012 7.811 12.012 7.811L9.055 6.473C9.055 6.473 8.791 7.143 8.588 7.614C8.383 8.085 8.227 8.618 7.379 8.022C6.53 7.424 3.798 4.772 3.798 4.772C3.798 4.772 3.453 4.488 3.625 4.221C3.788 3.969 4.301 4.205 4.301 4.205L7.257 5.541C7.257 5.541 7.522 4.873 7.725 4.402C7.93 3.932 8.086 3.396 8.934 3.994C9.783 4.59 12.514 7.244 12.514 7.244C12.514 7.244 12.859 7.527 12.688 7.795ZM18.874 3.928H18.125C17.566 3.928 17.02 4.682 17.02 5.907C17.02 7.134 17.567 7.887 18.125 7.887H18.874C19.434 7.887 20 7.133 20 5.907C20 4.682 19.434 3.928 18.874 3.928Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.2.list.5`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                         viewBox="0 0 22 22" fill="none">
                                                        <path
                                                            d="M12.375 19.25C14.0067 19.25 15.6017 18.7661 16.9585 17.8596C18.3152 16.9531 19.3726 15.6646 19.997 14.1571C20.6214 12.6497 20.7848 10.9909 20.4665 9.39051C20.1481 7.79017 19.3624 6.32016 18.2086 5.16637C17.0548 4.01259 15.5848 3.22685 13.9845 2.90853C12.3842 2.5902 10.7254 2.75357 9.21786 3.378C7.71037 4.00242 6.4219 5.05984 5.51538 6.41655C4.60885 7.77326 4.125 9.36831 4.125 11V15.2625L1.65 12.7875L0.6875 13.75L4.8125 17.875L8.9375 13.75L7.975 12.7875L5.5 15.2625V11C5.5 9.64026 5.90321 8.31105 6.65865 7.18046C7.41408 6.04987 8.48781 5.16868 9.74405 4.64833C11.0003 4.12798 12.3826 3.99183 13.7162 4.2571C15.0499 4.52238 16.2749 5.17716 17.2364 6.13864C18.1978 7.10013 18.8526 8.32514 19.1179 9.65876C19.3832 10.9924 19.247 12.3747 18.7267 13.631C18.2063 14.8872 17.3251 15.9609 16.1945 16.7164C15.064 17.4718 13.7347 17.875 12.375 17.875V19.25Z"
                                                            fill="white"/>
                                                    </svg>
                                                ),
                                            },
                                            {
                                                label: t(`Plans.standard.2.list.6`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M16.875 2.5H6.875C6.70924 2.5 6.55027 2.56585 6.43306 2.68306C6.31585 2.80027 6.25 2.95924 6.25 3.125V6.25H3.125C2.95924 6.25 2.80027 6.31585 2.68306 6.43306C2.56585 6.55027 2.5 6.70924 2.5 6.875V16.875C2.5 17.0408 2.56585 17.1997 2.68306 17.3169C2.80027 17.4342 2.95924 17.5 3.125 17.5H13.125C13.2908 17.5 13.4497 17.4342 13.5669 17.3169C13.6842 17.1997 13.75 17.0408 13.75 16.875V13.75H16.875C17.0408 13.75 17.1997 13.6842 17.3169 13.5669C17.4342 13.4497 17.5 13.2908 17.5 13.125V3.125C17.5 2.95924 17.4342 2.80027 17.3169 2.68306C17.1997 2.56585 17.0408 2.5 16.875 2.5ZM16.25 12.5H13.75V6.875C13.75 6.70924 13.6842 6.55027 13.5669 6.43306C13.4497 6.31585 13.2908 6.25 13.125 6.25H7.5V3.75H16.25V12.5Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.standard.2.list.7`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M19.1673 0.833984H0.833984V19.1673L4.50065 15.5007H19.1673V0.833984ZM4.50065 11.834V9.56982L10.8073 3.26315C10.9907 3.07982 11.2748 3.07982 11.4582 3.26315L13.0807 4.88565C13.264 5.06898 13.264 5.35315 13.0807 5.53648L6.76482 11.834H4.50065ZM15.5007 11.834H8.62565L10.459 10.0007H15.5007V11.834Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            }
                                        ]}
                                        price={{
                                            uzs: +(servicePrices.find((item) => item.subCategory === "servicePremium")?.price || 0),
                                            usd: +(servicePrices.find((item) => item.subCategory === "servicePremium")?.price || 0),
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel
                                    value="2"
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "25px",
                                        width: "100%",
                                        justifyContent: "center",
                                        padding: 0
                                    }}
                                >
                                    <ServiceCard
                                        title="INGAME SERVICE CUSTOM PLUS"
                                        description={t(`Plans.custom.1.desc`)}
                                        services={[
                                            {
                                                label: t(`Plans.custom.1.list.1`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                         viewBox="0 0 18 18" fill="none">
                                                        <path
                                                            d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.1.list.2`),
                                                icon: (
                                                    <TrashIcon
                                                        sx={{
                                                            fontSize: 18,
                                                            "& path": {
                                                                fill: "#ffffff"
                                                            }
                                                        }}
                                                    />
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.1.list.3`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M11.2493 12.916C11.2493 12.1302 11.2493 11.7377 11.4935 11.4935C11.7377 11.2493 12.1302 11.2493 12.916 11.2493H16.666C17.4518 11.2493 17.8443 11.2493 18.0885 11.4935C18.3327 11.7377 18.3327 12.1302 18.3327 12.916V16.666C18.3327 17.4518 18.3327 17.8443 18.0885 18.0885C17.8443 18.3327 17.4518 18.3327 16.666 18.3327H12.916C12.1302 18.3327 11.7377 18.3327 11.4935 18.0885C11.2493 17.8443 11.2493 17.4518 11.2493 16.666V12.916ZM1.66602 3.33268C1.66602 2.54685 1.66602 2.15435 1.91018 1.91018C2.15435 1.66602 2.54685 1.66602 3.33268 1.66602H7.08268C7.86852 1.66602 8.26102 1.66602 8.50518 1.91018C8.74935 2.15435 8.74935 2.54685 8.74935 3.33268V7.08268C8.74935 7.86852 8.74935 8.26102 8.50518 8.50518C8.26102 8.74935 7.86852 8.74935 7.08268 8.74935H3.33268C2.54685 8.74935 2.15435 8.74935 1.91018 8.50518C1.66602 8.26102 1.66602 7.86852 1.66602 7.08268V3.33268ZM1.66602 12.916C1.66602 12.1302 1.66602 11.7377 1.91018 11.4935C2.15435 11.2493 2.54685 11.2493 3.33268 11.2493H7.08268C7.86852 11.2493 8.26102 11.2493 8.50518 11.4935C8.74935 11.7377 8.74935 12.1302 8.74935 12.916V16.666C8.74935 17.4518 8.74935 17.8443 8.50518 18.0885C8.26102 18.3327 7.86852 18.3327 7.08268 18.3327H3.33268C2.54685 18.3327 2.15435 18.3327 1.91018 18.0885C1.66602 17.8443 1.66602 17.4518 1.66602 16.666V12.916ZM11.2493 3.33268C11.2493 2.54685 11.2493 2.15435 11.4935 1.91018C11.7377 1.66602 12.1302 1.66602 12.916 1.66602H16.666C17.4518 1.66602 17.8443 1.66602 18.0885 1.91018C18.3327 2.15435 18.3327 2.54685 18.3327 3.33268V7.08268C18.3327 7.86852 18.3327 8.26102 18.0885 8.50518C17.8443 8.74935 17.4518 8.74935 16.666 8.74935H12.916C12.1302 8.74935 11.7377 8.74935 11.4935 8.50518C11.2493 8.26102 11.2493 7.86852 11.2493 7.08268V3.33268Z"
                                                            stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.1.list.4`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"
                                                         viewBox="0 0 20 12" fill="none">
                                                        <path
                                                            d="M15.408 6C15.408 3.234 16.685 1.68 17.685 1.68H19C18.332 0.621 17.779 0 15.342 0H5.334C1.6 0 0 3.441 0 6C0 8.559 1.6 12 5.334 12H15.342C17.78 12 18.332 11.379 19 10.32H17.685C16.685 10.32 15.408 8.766 15.408 6ZM12.688 7.795C12.524 8.045 12.012 7.811 12.012 7.811L9.055 6.473C9.055 6.473 8.791 7.143 8.588 7.614C8.383 8.085 8.227 8.618 7.379 8.022C6.53 7.424 3.798 4.772 3.798 4.772C3.798 4.772 3.453 4.488 3.625 4.221C3.788 3.969 4.301 4.205 4.301 4.205L7.257 5.541C7.257 5.541 7.522 4.873 7.725 4.402C7.93 3.932 8.086 3.396 8.934 3.994C9.783 4.59 12.514 7.244 12.514 7.244C12.514 7.244 12.859 7.527 12.688 7.795ZM18.874 3.928H18.125C17.566 3.928 17.02 4.682 17.02 5.907C17.02 7.134 17.567 7.887 18.125 7.887H18.874C19.434 7.887 20 7.133 20 5.907C20 4.682 19.434 3.928 18.874 3.928Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.1.list.5`),
                                                icon: (
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <path
                                                            fill="white"
                                                            strokeWidth="4"
                                                            d="M14,14v2H3a1.05,1.05,0,0,1-1-1V12a1.05,1.05,0,0,1,1-1H17a2.05,2.05,0,0,0,2-2V6a2.05,2.05,0,0,0-2-2H6V1H0V7H6V5H17a1.05,1.05,0,0,1,1,1V9a1.05,1.05,0,0,1-1,1H3a2.05,2.05,0,0,0-2,2V15a2.05,2.05,0,0,0,2,2H14v3h6V14ZM5,6H1V2H5ZM19,19H15V15h4Z"></path>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.1.list.6`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20"
                                                         viewBox="0 0 19 20" fill="none">
                                                        <path
                                                            d="M18 8C17.7167 8 17.4793 7.904 17.288 7.712C17.0967 7.52 17.0007 7.28267 17 7C16.9993 6.71733 17.0953 6.48 17.288 6.288C17.4807 6.096 17.718 6 18 6C18.282 6 18.5197 6.096 18.713 6.288C18.9063 6.48 19.002 6.71733 19 7C18.998 7.28267 18.902 7.52033 18.712 7.713C18.522 7.90567 18.2847 8.00133 18 8ZM8 20V16.4L5.4 19L4 17.6L8 13.6V12H6.4L2.4 16L1 14.6L3.6 12H0V10H3.6L1 7.4L2.4 6L6.4 10H8V8.4L4 4.4L5.4 3L8 5.6V2H10V5.6L12.6 3L14 4.4L10 8.4V10H18V12H14.4L17 14.6L15.6 16L11.6 12H10V13.6L14 17.6L12.6 19L10 16.4V20H8ZM17 5V0H19V5H17Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.1.list.7`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M16.875 2.5H6.875C6.70924 2.5 6.55027 2.56585 6.43306 2.68306C6.31585 2.80027 6.25 2.95924 6.25 3.125V6.25H3.125C2.95924 6.25 2.80027 6.31585 2.68306 6.43306C2.56585 6.55027 2.5 6.70924 2.5 6.875V16.875C2.5 17.0408 2.56585 17.1997 2.68306 17.3169C2.80027 17.4342 2.95924 17.5 3.125 17.5H13.125C13.2908 17.5 13.4497 17.4342 13.5669 17.3169C13.6842 17.1997 13.75 17.0408 13.75 16.875V13.75H16.875C17.0408 13.75 17.1997 13.6842 17.3169 13.5669C17.4342 13.4497 17.5 13.2908 17.5 13.125V3.125C17.5 2.95924 17.4342 2.80027 17.3169 2.68306C17.1997 2.56585 17.0408 2.5 16.875 2.5ZM16.25 12.5H13.75V6.875C13.75 6.70924 13.6842 6.55027 13.5669 6.43306C13.4497 6.31585 13.2908 6.25 13.125 6.25H7.5V3.75H16.25V12.5Z"
                                                            fill="white"/>
                                                    </svg>
                                                ),
                                            },
                                            {
                                                label: t(`Plans.custom.1.list.8`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M19.1673 0.833984H0.833984V19.1673L4.50065 15.5007H19.1673V0.833984ZM4.50065 11.834V9.56982L10.8073 3.26315C10.9907 3.07982 11.2748 3.07982 11.4582 3.26315L13.0807 4.88565C13.264 5.06898 13.264 5.35315 13.0807 5.53648L6.76482 11.834H4.50065ZM15.5007 11.834H8.62565L10.459 10.0007H15.5007V11.834Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            }
                                        ]}
                                        price={{
                                            uzs: +(servicePrices.find((item) => item.subCategory === "serviceCustomerPlus")?.price || 0),
                                            usd: +(servicePrices.find((item) => item.subCategory === "serviceCustomerPlus")?.price || 0),
                                        }}
                                    />
                                    <ServiceCard
                                        title="INGAME SERVICE CUSTOM PREMIUM"
                                        description={t(`Plans.custom.2.desc`)}
                                        services={[
                                            {
                                                label: t(`Plans.custom.2.list.1`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                         viewBox="0 0 18 18" fill="none">
                                                        <path
                                                            d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.146 12.3707 1.888 11.112C0.63 9.85333 0.000667196 8.316 5.29101e-07 6.5C-0.000666138 4.684 0.628667 3.14667 1.888 1.888C3.14733 0.629333 4.68467 0 6.5 0C8.31533 0 9.853 0.629333 11.113 1.888C12.373 3.14667 13.002 4.684 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.81267 10.5627 9.688 9.688C10.5633 8.81333 11.0007 7.75067 11 6.5C10.9993 5.24933 10.562 4.187 9.688 3.313C8.814 2.439 7.75133 2.00133 6.5 2C5.24867 1.99867 4.18633 2.43633 3.313 3.313C2.43967 4.18967 2.002 5.252 2 6.5C1.998 7.748 2.43567 8.81067 3.313 9.688C4.19033 10.5653 5.25267 11.0027 6.5 11Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.2`),
                                                icon: (
                                                    <TrashIcon
                                                        sx={{
                                                            fontSize: 18,
                                                            "& path": {
                                                                fill: "#ffffff"
                                                            }
                                                        }}
                                                    />
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.3`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"
                                                         viewBox="0 0 20 12" fill="none">
                                                        <path
                                                            d="M15.408 6C15.408 3.234 16.685 1.68 17.685 1.68H19C18.332 0.621 17.779 0 15.342 0H5.334C1.6 0 0 3.441 0 6C0 8.559 1.6 12 5.334 12H15.342C17.78 12 18.332 11.379 19 10.32H17.685C16.685 10.32 15.408 8.766 15.408 6ZM12.688 7.795C12.524 8.045 12.012 7.811 12.012 7.811L9.055 6.473C9.055 6.473 8.791 7.143 8.588 7.614C8.383 8.085 8.227 8.618 7.379 8.022C6.53 7.424 3.798 4.772 3.798 4.772C3.798 4.772 3.453 4.488 3.625 4.221C3.788 3.969 4.301 4.205 4.301 4.205L7.257 5.541C7.257 5.541 7.522 4.873 7.725 4.402C7.93 3.932 8.086 3.396 8.934 3.994C9.783 4.59 12.514 7.244 12.514 7.244C12.514 7.244 12.859 7.527 12.688 7.795ZM18.874 3.928H18.125C17.566 3.928 17.02 4.682 17.02 5.907C17.02 7.134 17.567 7.887 18.125 7.887H18.874C19.434 7.887 20 7.133 20 5.907C20 4.682 19.434 3.928 18.874 3.928Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.4`),
                                                icon: (
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <path
                                                            fill="white"
                                                            strokeWidth="4"
                                                            d="M14,14v2H3a1.05,1.05,0,0,1-1-1V12a1.05,1.05,0,0,1,1-1H17a2.05,2.05,0,0,0,2-2V6a2.05,2.05,0,0,0-2-2H6V1H0V7H6V5H17a1.05,1.05,0,0,1,1,1V9a1.05,1.05,0,0,1-1,1H3a2.05,2.05,0,0,0-2,2V15a2.05,2.05,0,0,0,2,2H14v3h6V14ZM5,6H1V2H5ZM19,19H15V15h4Z"></path>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.5`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20"
                                                         viewBox="0 0 19 20" fill="none">
                                                        <path
                                                            d="M18 8C17.7167 8 17.4793 7.904 17.288 7.712C17.0967 7.52 17.0007 7.28267 17 7C16.9993 6.71733 17.0953 6.48 17.288 6.288C17.4807 6.096 17.718 6 18 6C18.282 6 18.5197 6.096 18.713 6.288C18.9063 6.48 19.002 6.71733 19 7C18.998 7.28267 18.902 7.52033 18.712 7.713C18.522 7.90567 18.2847 8.00133 18 8ZM8 20V16.4L5.4 19L4 17.6L8 13.6V12H6.4L2.4 16L1 14.6L3.6 12H0V10H3.6L1 7.4L2.4 6L6.4 10H8V8.4L4 4.4L5.4 3L8 5.6V2H10V5.6L12.6 3L14 4.4L10 8.4V10H18V12H14.4L17 14.6L15.6 16L11.6 12H10V13.6L14 17.6L12.6 19L10 16.4V20H8ZM17 5V0H19V5H17Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.6`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M16.875 2.5H6.875C6.70924 2.5 6.55027 2.56585 6.43306 2.68306C6.31585 2.80027 6.25 2.95924 6.25 3.125V6.25H3.125C2.95924 6.25 2.80027 6.31585 2.68306 6.43306C2.56585 6.55027 2.5 6.70924 2.5 6.875V16.875C2.5 17.0408 2.56585 17.1997 2.68306 17.3169C2.80027 17.4342 2.95924 17.5 3.125 17.5H13.125C13.2908 17.5 13.4497 17.4342 13.5669 17.3169C13.6842 17.1997 13.75 17.0408 13.75 16.875V13.75H16.875C17.0408 13.75 17.1997 13.6842 17.3169 13.5669C17.4342 13.4497 17.5 13.2908 17.5 13.125V3.125C17.5 2.95924 17.4342 2.80027 17.3169 2.68306C17.1997 2.56585 17.0408 2.5 16.875 2.5ZM16.25 12.5H13.75V6.875C13.75 6.70924 13.6842 6.55027 13.5669 6.43306C13.4497 6.31585 13.2908 6.25 13.125 6.25H7.5V3.75H16.25V12.5Z"
                                                            fill="white"/>
                                                    </svg>
                                                ),
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.7`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                         viewBox="0 0 22 22" fill="none">
                                                        <g clipPath="url(#clip0_1256_2717)">
                                                            <path
                                                                d="M11.6875 20.625C10.6277 20.6255 9.59739 20.2761 8.75646 19.6311C7.91553 18.9861 7.31103 18.0816 7.03677 17.0579C6.76251 16.0342 6.83383 14.9486 7.23967 13.9696C7.64551 12.9906 8.36316 12.1729 9.28125 11.6435L9.625 11.4455V3.4375C9.62312 2.95102 9.79371 2.47962 10.1065 2.10702C10.4193 1.73441 10.854 1.48472 11.3334 1.40228C11.8129 1.31985 12.306 1.41 12.7253 1.65674C13.1445 1.90348 13.4628 2.29083 13.6235 2.75H11.6875V4.125H13.75V5.5H11.6875V6.875H13.75V8.25H11.6875V9.625H13.75V11.4455L14.0938 11.6435C15.0118 12.1729 15.7295 12.9906 16.1353 13.9696C16.5412 14.9486 16.6125 16.0342 16.3382 17.0579C16.064 18.0816 15.4595 18.9861 14.6185 19.6311C13.7776 20.2761 12.7473 20.6255 11.6875 20.625ZM15.125 10.6672V3.4375C15.125 2.52582 14.7628 1.65148 14.1182 1.00682C13.4735 0.362164 12.5992 0 11.6875 0C10.7758 0 9.90148 0.362164 9.25682 1.00682C8.61216 1.65148 8.25 2.52582 8.25 3.4375V10.6672C7.14626 11.4047 6.30894 12.4776 5.86172 13.7274C5.4145 14.9773 5.38109 16.3378 5.76642 17.6081C6.15174 18.8784 6.93538 19.9911 8.00159 20.7819C9.0678 21.5726 10.3601 21.9995 11.6875 21.9995C13.0149 21.9995 14.3072 21.5726 15.3734 20.7819C16.4396 19.9911 17.2233 18.8784 17.6086 17.6081C17.9939 16.3378 17.9605 14.9773 17.5133 13.7274C17.0661 12.4776 16.2287 11.4047 15.125 10.6672Z"
                                                                fill="white"/>
                                                            <path
                                                                d="M11.6875 12.375C12.5992 12.375 13.4735 12.7372 14.1182 13.3818C14.7628 14.0265 15.125 14.9008 15.125 15.8125C15.125 16.7242 14.7628 17.5985 14.1182 18.2432C13.4735 18.8878 12.5992 19.25 11.6875 19.25C10.7758 19.25 9.90148 18.8878 9.25682 18.2432C8.61216 17.5985 8.25 16.7242 8.25 15.8125C8.25 14.9008 8.61216 14.0265 9.25682 13.3818C9.90148 12.7372 10.7758 12.375 11.6875 12.375Z"
                                                                fill="white"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_1256_2717">
                                                                <rect width="22" height="22" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                ),
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.8`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                         viewBox="0 0 22 22" fill="none">
                                                        <path
                                                            d="M19.2493 14.6673H2.74935V3.66732H19.2493M19.2493 1.83398H2.74935C1.73185 1.83398 0.916016 2.64982 0.916016 3.66732V14.6673C0.916016 15.1535 1.10917 15.6199 1.45299 15.9637C1.7968 16.3075 2.26312 16.5007 2.74935 16.5007H9.16602V18.334H7.33268V20.1673H14.666V18.334H12.8327V16.5007H19.2493C20.2668 16.5007 21.0827 15.6848 21.0827 14.6673V3.66732C21.0827 3.18109 20.8895 2.71477 20.5457 2.37096C20.2019 2.02714 19.7356 1.83398 19.2493 1.83398ZM13.7493 5.04232L13.181 6.29815L11.916 6.87565L13.181 7.45315L13.7493 8.70898L14.3268 7.45315L15.5827 6.87565L14.3268 6.29815L13.7493 5.04232ZM9.62435 6.87565L8.62518 9.08482L6.41602 10.084L8.62518 11.0832L9.62435 13.2923L10.6327 11.0832L12.8327 10.084L10.6327 9.08482L9.62435 6.87565Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.9`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="17"
                                                         viewBox="0 0 12 17" fill="none">
                                                        <path
                                                            d="M6 17C4.4087 17 2.88258 16.3679 1.75736 15.2426C0.632141 14.1174 0 12.5913 0 11C0 7 6 0.25 6 0.25C6 0.25 12 7 12 11C12 12.5913 11.3679 14.1174 10.2426 15.2426C9.11742 16.3679 7.5913 17 6 17Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.10`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                         viewBox="0 0 22 22" fill="none">
                                                        <path
                                                            d="M12.375 19.25C14.0067 19.25 15.6017 18.7661 16.9585 17.8596C18.3152 16.9531 19.3726 15.6646 19.997 14.1571C20.6214 12.6497 20.7848 10.9909 20.4665 9.39051C20.1481 7.79017 19.3624 6.32016 18.2086 5.16637C17.0548 4.01259 15.5848 3.22685 13.9845 2.90853C12.3842 2.5902 10.7254 2.75357 9.21786 3.378C7.71037 4.00242 6.4219 5.05984 5.51538 6.41655C4.60885 7.77326 4.125 9.36831 4.125 11V15.2625L1.65 12.7875L0.6875 13.75L4.8125 17.875L8.9375 13.75L7.975 12.7875L5.5 15.2625V11C5.5 9.64026 5.90321 8.31105 6.65865 7.18046C7.41408 6.04987 8.48781 5.16868 9.74405 4.64833C11.0003 4.12798 12.3826 3.99183 13.7162 4.2571C15.0499 4.52238 16.2749 5.17716 17.2364 6.13864C18.1978 7.10013 18.8526 8.32514 19.1179 9.65876C19.3832 10.9924 19.247 12.3747 18.7267 13.631C18.2063 14.8872 17.3251 15.9609 16.1945 16.7164C15.064 17.4718 13.7347 17.875 12.375 17.875V19.25Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.11`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M19.1673 0.833984H0.833984V19.1673L4.50065 15.5007H19.1673V0.833984ZM4.50065 11.834V9.56982L10.8073 3.26315C10.9907 3.07982 11.2748 3.07982 11.4582 3.26315L13.0807 4.88565C13.264 5.06898 13.264 5.35315 13.0807 5.53648L6.76482 11.834H4.50065ZM15.5007 11.834H8.62565L10.459 10.0007H15.5007V11.834Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.custom.2.list.12`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M11.2493 12.916C11.2493 12.1302 11.2493 11.7377 11.4935 11.4935C11.7377 11.2493 12.1302 11.2493 12.916 11.2493H16.666C17.4518 11.2493 17.8443 11.2493 18.0885 11.4935C18.3327 11.7377 18.3327 12.1302 18.3327 12.916V16.666C18.3327 17.4518 18.3327 17.8443 18.0885 18.0885C17.8443 18.3327 17.4518 18.3327 16.666 18.3327H12.916C12.1302 18.3327 11.7377 18.3327 11.4935 18.0885C11.2493 17.8443 11.2493 17.4518 11.2493 16.666V12.916ZM1.66602 3.33268C1.66602 2.54685 1.66602 2.15435 1.91018 1.91018C2.15435 1.66602 2.54685 1.66602 3.33268 1.66602H7.08268C7.86852 1.66602 8.26102 1.66602 8.50518 1.91018C8.74935 2.15435 8.74935 2.54685 8.74935 3.33268V7.08268C8.74935 7.86852 8.74935 8.26102 8.50518 8.50518C8.26102 8.74935 7.86852 8.74935 7.08268 8.74935H3.33268C2.54685 8.74935 2.15435 8.74935 1.91018 8.50518C1.66602 8.26102 1.66602 7.86852 1.66602 7.08268V3.33268ZM1.66602 12.916C1.66602 12.1302 1.66602 11.7377 1.91018 11.4935C2.15435 11.2493 2.54685 11.2493 3.33268 11.2493H7.08268C7.86852 11.2493 8.26102 11.2493 8.50518 11.4935C8.74935 11.7377 8.74935 12.1302 8.74935 12.916V16.666C8.74935 17.4518 8.74935 17.8443 8.50518 18.0885C8.26102 18.3327 7.86852 18.3327 7.08268 18.3327H3.33268C2.54685 18.3327 2.15435 18.3327 1.91018 18.0885C1.66602 17.8443 1.66602 17.4518 1.66602 16.666V12.916ZM11.2493 3.33268C11.2493 2.54685 11.2493 2.15435 11.4935 1.91018C11.7377 1.66602 12.1302 1.66602 12.916 1.66602H16.666C17.4518 1.66602 17.8443 1.66602 18.0885 1.91018C18.3327 2.15435 18.3327 2.54685 18.3327 3.33268V7.08268C18.3327 7.86852 18.3327 8.26102 18.0885 8.50518C17.8443 8.74935 17.4518 8.74935 16.666 8.74935H12.916C12.1302 8.74935 11.7377 8.74935 11.4935 8.50518C11.2493 8.26102 11.2493 7.86852 11.2493 7.08268V3.33268Z"
                                                            stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                )
                                            },
                                        ]}
                                        price={{
                                            uzs: +(servicePrices.find((item) => item.subCategory === "serviceCustomerPremium")?.price || 0),
                                            usd: +(servicePrices.find((item) => item.subCategory === "serviceCustomerPremium")?.price || 0)
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel
                                    value="3"
                                    sx={{
                                        width: "100%",
                                        padding: 0,
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <ServiceCard
                                        isFullDescription
                                        title={t(`Plans.additional.1.title`)}
                                        description={t(`Plans.additional.1.desc`)}
                                        services={[
                                            {
                                                label: t(`Plans.additional.1.list.1`),
                                                icon: (
                                                    <TrashIcon
                                                        sx={{
                                                            fontSize: 18,
                                                            "& path": {
                                                                fill: "#ffffff"
                                                            }
                                                        }}
                                                    />
                                                )
                                            },
                                            {
                                                label: t(`Plans.additional.1.list.2`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20"
                                                         viewBox="0 0 19 20" fill="none">
                                                        <path
                                                            d="M18 8C17.7167 8 17.4793 7.904 17.288 7.712C17.0967 7.52 17.0007 7.28267 17 7C16.9993 6.71733 17.0953 6.48 17.288 6.288C17.4807 6.096 17.718 6 18 6C18.282 6 18.5197 6.096 18.713 6.288C18.9063 6.48 19.002 6.71733 19 7C18.998 7.28267 18.902 7.52033 18.712 7.713C18.522 7.90567 18.2847 8.00133 18 8ZM8 20V16.4L5.4 19L4 17.6L8 13.6V12H6.4L2.4 16L1 14.6L3.6 12H0V10H3.6L1 7.4L2.4 6L6.4 10H8V8.4L4 4.4L5.4 3L8 5.6V2H10V5.6L12.6 3L14 4.4L10 8.4V10H18V12H14.4L17 14.6L15.6 16L11.6 12H10V13.6L14 17.6L12.6 19L10 16.4V20H8ZM17 5V0H19V5H17Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.additional.1.list.3`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12"
                                                         viewBox="0 0 20 12" fill="none">
                                                        <path
                                                            d="M15.408 6C15.408 3.234 16.685 1.68 17.685 1.68H19C18.332 0.621 17.779 0 15.342 0H5.334C1.6 0 0 3.441 0 6C0 8.559 1.6 12 5.334 12H15.342C17.78 12 18.332 11.379 19 10.32H17.685C16.685 10.32 15.408 8.766 15.408 6ZM12.688 7.795C12.524 8.045 12.012 7.811 12.012 7.811L9.055 6.473C9.055 6.473 8.791 7.143 8.588 7.614C8.383 8.085 8.227 8.618 7.379 8.022C6.53 7.424 3.798 4.772 3.798 4.772C3.798 4.772 3.453 4.488 3.625 4.221C3.788 3.969 4.301 4.205 4.301 4.205L7.257 5.541C7.257 5.541 7.522 4.873 7.725 4.402C7.93 3.932 8.086 3.396 8.934 3.994C9.783 4.59 12.514 7.244 12.514 7.244C12.514 7.244 12.859 7.527 12.688 7.795ZM18.874 3.928H18.125C17.566 3.928 17.02 4.682 17.02 5.907C17.02 7.134 17.567 7.887 18.125 7.887H18.874C19.434 7.887 20 7.133 20 5.907C20 4.682 19.434 3.928 18.874 3.928Z"
                                                            fill="white"/>
                                                    </svg>
                                                )
                                            },
                                            {
                                                label: t(`Plans.additional.1.list.4`),
                                                icon: (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         viewBox="0 0 20 20" fill="none">
                                                        <path
                                                            d="M16.875 2.5H6.875C6.70924 2.5 6.55027 2.56585 6.43306 2.68306C6.31585 2.80027 6.25 2.95924 6.25 3.125V6.25H3.125C2.95924 6.25 2.80027 6.31585 2.68306 6.43306C2.56585 6.55027 2.5 6.70924 2.5 6.875V16.875C2.5 17.0408 2.56585 17.1997 2.68306 17.3169C2.80027 17.4342 2.95924 17.5 3.125 17.5H13.125C13.2908 17.5 13.4497 17.4342 13.5669 17.3169C13.6842 17.1997 13.75 17.0408 13.75 16.875V13.75H16.875C17.0408 13.75 17.1997 13.6842 17.3169 13.5669C17.4342 13.4497 17.5 13.2908 17.5 13.125V3.125C17.5 2.95924 17.4342 2.80027 17.3169 2.68306C17.1997 2.56585 17.0408 2.5 16.875 2.5ZM16.25 12.5H13.75V6.875C13.75 6.70924 13.6842 6.55027 13.5669 6.43306C13.4497 6.31585 13.2908 6.25 13.125 6.25H7.5V3.75H16.25V12.5Z"
                                                            fill="white"/>
                                                    </svg>
                                                ),
                                            },
                                        ]}
                                        price={{
                                            uzs: +(servicePrices.find((item) => item.category === "add")?.price || 0),
                                            usd: +(servicePrices.find((item) => item.category === "add")?.price || 0),
                                        }}
                                    />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Box>

                </AppContainer>
            </Box>

            <Box
                sx={{
                    padding: {xs: "40px 0", sm: "100px 0"}
                }}
            >
                <AppContainer
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        flexWrap: "wrap"
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "592px",
                            width: "100%",
                            height: "353px",
                            position: "relative"
                        }}
                    >
                        <Image
                            src="/about-ingame-img.jpeg"
                            alt="about ingame image"
                            fill
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            maxWidth: "553px",
                            width: "100%"
                        }}
                    >
                        <Typography
                            color="primaryText.main"
                            sx={{
                                fontSize: 30,
                                lineHeight: "37px",
                                fontWeight: 600
                            }}
                        >
                            {t("AboutService.title")}
                        </Typography>
                        <Typography
                            color="primaryText.main"
                            sx={{
                                mt: "18px",
                                fontSize: 16,
                                lineHeight: "19px"
                            }}
                        >
                            {t("AboutService.desc")}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: "28px",
                                flexWrap: "wrap",
                                width: "100%",
                                mt: "30px"
                            }}
                        >
                            {[
                                {
                                    title: "2324",
                                    description: t("AboutService.stats.techRev")
                                },
                                {
                                    title: `1 ${t("AboutService.stats.w2")}`,
                                    description: t("AboutService.stats.warranty")
                                },
                                {
                                    title: "23",
                                    description: t("AboutService.stats.spec")
                                }
                            ].map((item, idx) => (
                                <Box key={idx}>
                                    <Typography
                                        color="primaryText.main"
                                        sx={{
                                            fontSize: 30,
                                            lineHeight: "37px",
                                            fontWeight: 600,
                                            textAlign: "center"
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        color="primaryText.main"
                                        sx={{
                                            fontSize: 16,
                                            lineHeight: "19px",
                                            fontWeight: 500
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </AppContainer>
            </Box>

            <Box
                sx={{
                    backgroundColor: "#0F0F0F",
                    padding: {xs: "20px 0", sm: "40px 0"}
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
                        label={t(`Steps.title`)}
                        sxTitle={{
                            fontSize: {xs: 30, sm: 40},
                            lineHeight: {xs: "35px", sm: "50px"},
                            fontWeight: 600
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: "25px",
                            mt: "20px",
                            flexWrap: "wrap",
                            justifyContent: "center"
                        }}
                    >
                        {[1,2,3,4,5].map((item, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    maxWidth: "223px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    color="primaryText.main"
                                    sx={{
                                        fontSize: 40,
                                        lineHeight: "50px",
                                        fontWeight: 600,
                                        padding: "9px 26px",
                                        borderWidth: "4px",
                                        borderColor: "primary.main",
                                        borderStyle: "solid",
                                        width: "68px",
                                        height: "68px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {item}
                                </Typography>
                                <Typography
                                    color="primaryText.main"
                                    sx={{
                                        fontSize: 16,
                                        lineHeight: "19px",
                                        fontWeight: 500,
                                        textAlign: "center",
                                        mt: "20px"
                                    }}
                                >
                                    {t(`Steps.${item}`)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                </AppContainer>
            </Box>


            <HomeFooter/>


        </Box>
    );
};

export default SecondService;
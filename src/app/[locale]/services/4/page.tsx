"use client";
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import AppContainer from "@/ui/app-container/app-container";
import ServicesImg from "@/components/services-img/services-img";
import Image from "next/image";
import AppButton from '@/ui/button/button';
import Typography from "@mui/material/Typography";
import ButtonOutlined from '@/ui/button/button-outlined';
import HomeFaq from '@/components/home-faq/home-faq';
import HomeFooter from '@/components/home-footer/home-footer';
import OrderAnUpgrade from "@/components/order-an-upgrade/order-an-upgrade";
import { useTranslations } from 'next-intl';

const Page = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleOpen = () => {
        setIsOpen(true);
    }
    const tb = useTranslations("Breadcrumbs");
    const t = useTranslations("ServicePages.4")
    const td = useTranslations("OrderAnUpgrade")
    return (
        <Box>
            <OrderAnUpgrade
                isOpen={isOpen}
                onClose={handleClose}
                title={td("title")}
                list={[
                    {
                        title: td("steps.outerServices.title"),
                        services: [
                            {
                                title: td("steps.outerServices.services.1.title"),
                                list: [0, 1, 2, 3, 4].map((idx)=> td(`steps.outerServices.services.1.list.${idx}`))
                            },
                            {
                                title: td("steps.outerServices.services.2.title"),
                                list: [0, 1, 2, 3, 4].map((idx)=> td(`steps.outerServices.services.2.list.${idx}`))
                            }
                        ],
                        hasOtherServices: true,
                    },
                    {
                        title: td("steps.additional.title"),
                        services: [
                            {
                                title: td("steps.additional.services.1.title"),
                                list: [0, 1, 2, 3, 4, 5].map((idx)=> td(`steps.additional.services.1.list.${idx}`))
                            },
                            {
                                title: td("steps.additional.services.2.title"),
                                list: [0, 1].map((idx)=> td(`steps.additional.services.2.list.${idx}`))
                            }
                        ],
                        hasOtherServices: false,
                    },
                    {
                        title: td("steps.deadlines.title"),
                        services: [
                            {
                                title: td("steps.deadlines.services.1.title"),
                                list: [0, 1, 2, 3, 4].map((idx)=> td(`steps.deadlines.services.1.list.${idx}`))
                            },
                            {
                                title: td("steps.deadlines.services.2.title"),
                                list: [0, 1, 2, 3, 4].map((idx)=> td(`steps.deadlines.services.2.list.${idx}`))
                            }
                        ],
                        hasOtherServices: false,
                    }
                ]}
            />
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
                    src="/service-hero-4-img.png"
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
                    padding: "30px 0",
                }}
            >
                <AppContainer>
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "14px",
                            flexWrap: "wrap"
                        }}
                    >
                        {[
                            {
                                label: t("miniNav.1"),
                            },
                            {
                                label: t("miniNav.2"),
                            },
                            {
                                label: t("miniNav.3"),
                            },
                            {
                                label: t("miniNav.4"),
                            },
                            {
                                label: t("miniNav.5"),
                            }
                        ].map((item, idx) => (
                            <a
                                key={item.label}
                                href={`#${(idx + 1)}`}
                            >
                                <AppButton
                                    label={item.label}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        color: "primaryText.main",
                                        textTransform: "math-auto",
                                        fontSize: 16,
                                        padding: "8px 14px",
                                        lineHeight: "20px"
                                    }}
                                />
                            </a>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "40px",
                            width: "100%",
                            mt: "48px"
                        }}
                    >
                        {[
                            {
                                label: t("miniServices.1.label"),
                                description: t("miniServices.1.description")
                            },
                            {
                                label: t("miniServices.2.label"),
                                description: t("miniServices.2.description")
                           },
                            {
                                label: t("miniServices.3.label"),
                                description: t("miniServices.3.description")
                           },
                            {
                                label: t("miniServices.4.label"),
                                description: t("miniServices.4.description")
                          },
                            {
                                label: t("miniServices.5.label"),
                                description: t("miniServices.5.description")
                          }
                        ].map((item, idx) => (
                            <Box
                                key={item.label}
                                id={`${(idx + 1)}`}
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    flexDirection: {xs: "column", md: (idx + 1) % 2 === 0 ? "row-reverse" : "row"}
                                }}
                            >
                                <Box
                                    sx={{
                                        width: {xs: "100%", md: "567px"},
                                        minHeight: "320px",
                                        backgroundColor: "#141414"
                                    }}
                                >

                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "#252525",
                                        padding: "34px 27px",
                                        flex: 1,
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
                                    <Box
                                        sx={{
                                            mt: "11px",
                                            width: "100%",
                                            height: "2px",
                                            backgroundColor: "primary.main",
                                            position: "relative",
                                            "&:after": {
                                                content: '""',
                                                display: "block",
                                                width: "10px",
                                                height: "10px",
                                                position: "absolute",
                                                backgroundColor: "primary.main",
                                                right: 0,
                                                top: "calc(50% - 5px)"
                                            }
                                        }}
                                    />
                                    <Typography
                                        color="primaryText.main"
                                        sx={{
                                            fontSize: 15,
                                            fontWeight: 500,
                                            lineHeight: "18px",
                                            mt: "12px",
                                        }}
                                    >
                                        {item.description}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            mt: "56px",
                                        }}
                                    >
                                        <ButtonOutlined
                                            label={t("orderUpg")}
                                            lineColor="#252525"
                                            onClick={handleOpen}
                                            buttonSx={{
                                                padding: "12px 20px",
                                                lineHeight: "30px",
                                                textTransform: "math-auto"
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </AppContainer>
            </Box>

            <HomeFaq/>

            <HomeFooter/>

        </Box>
    );
};

export default Page;
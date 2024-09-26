"use client";
import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import AboutDescription from "@/app/[locale]/about/components/about-description";
import Button from "@mui/material/Button";
import ArrowBottom from "@/ui/icons/arrow-bottom";
import QuoteIcon from "@/ui/icons/quote-icon";
import Typography from "@mui/material/Typography";
import {useTranslations} from "next-intl";

const AboutUsSection = () => {
    const t = useTranslations("About");
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef<HTMLPreElement>(null!);

    const toggleBiography = () => {
        setOpen(!open);
        setHeight(open ? 0 : contentRef.current.scrollHeight);
    };

    useEffect(() => {
        if (open) {
            const currentHeight = contentRef.current.scrollHeight;
            if (currentHeight !== height) {
                setHeight(currentHeight);
            }
        }
    }, [open, height]);


    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                // alignItems: "center",
                gap: "28px",
                flexDirection: {xs: "column", md: "row"}
            }}
        >
            <Box>
                <Box
                    sx={{
                        width: "300px",
                        height: "300px",
                        backgroundColor: "#141414"
                    }}
                >

                </Box>
            </Box>
            <Box>
                <AboutDescription>{t("aboutUs.text")}</AboutDescription>

                <Button
                    variant="text"
                    onClick={toggleBiography}
                    sx={{
                        padding: 0,
                        mt: "10px"
                    }}
                >
                    {t("aboutUs.buttonText")}
                    <ArrowBottom
                        sx={{
                            fontSize: 12,
                            ml: "4px",
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s'
                        }}
                    />
                </Button>

                <Typography
                    component="pre"
                    ref={contentRef}
                    sx={{
                        whiteSpace: "pre-wrap",
                        color: "primaryText.main",
                        height: open ? `${height}px` : '0px',
                        overflow: 'hidden',
                        transition: 'height 0.5s ease-in-out'
                    }}
                >
                    {t("aboutUs.biographyText")}
                </Typography>

                <Box
                    sx={{
                        borderColor: "primary.main",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "16px 22px",
                        mt: "20px",
                        position: "relative"
                    }}
                >
                    <QuoteIcon
                        sx={{
                            position: "absolute",
                            top: "-14px",
                            right: "24px",
                            fontSize: "33px",
                            "& path": {
                                fill: "primary.main",
                            }
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: {xs: 16, sm: 20},
                            lineHeight: "24px",
                            color: "primaryText.main"
                        }}
                    >
                        {t("aboutUs.ourMission.title")}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: {xs: 14, md: 16},
                            lineHeight: "19px",
                            mt: "10px",
                            color: "primaryText.main"
                        }}
                    >
                        {t("aboutUs.ourMission.desc")}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutUsSection;
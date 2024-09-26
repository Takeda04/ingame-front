import React from 'react';
import {Box, Typography} from "@mui/material";
import {useTranslations} from "next-intl";

const BasketHeader = () => {
    const t = useTranslations("Basket")

    return (
        <Box
            sx={{
                backgroundColor: "#2D2D2D",
                padding: "6px 0",
                display: {xs: "none", lg: "flex"}
            }}
        >
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#D1D1D1",
                    maxWidth: "360px",
                    width: "100%",
                    textAlign: "center"
                }}
            >
                {t("products")}
            </Typography>
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#D1D1D1",
                    maxWidth: "130px",
                    width: "100%",
                }}
            >
                {t("availability")}
            </Typography>
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#D1D1D1",
                    maxWidth: "135px",
                    width: "100%"
                }}
            >
                {t("count")}
            </Typography>
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#D1D1D1",
                    maxWidth: "100px",
                    width: "100%"
                }}
            >
                {t("price")}
            </Typography>
        </Box>
    );
};

export default BasketHeader;
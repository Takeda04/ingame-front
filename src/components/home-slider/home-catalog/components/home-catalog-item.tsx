import React, {FC} from 'react';
import {Box, Typography, useTheme} from "@mui/material";
import Image from "next/image";
import {useLocale} from "next-intl";
import {Catalog} from "@/http/catalog-api";

interface IHomeCatalogItemProps {
    catalog: Catalog;
}

const HomeCatalogItem: FC<IHomeCatalogItemProps> = ({catalog}) => {
    const theme = useTheme();
    const localActive = useLocale() as "ru" | "uz";

    return (

        <Box
            sx={{
                width: {xs: "160px", sm: "210px"},
                height: {xs: "163px", sm: "180px"},
                margin: "0 auto"
            }}
        >

            <Box
                sx={{
                    position: "relative",
                    width: "112px",
                    height: "112px",
                    margin: "0 auto"
                }}
            >
                <Image
                    src={catalog.image || ""}
                    alt="image"
                    fill
                    style={{objectFit: "contain"}}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </Box>
            <Typography
                sx={{
                    color: theme.palette.primaryText.main,
                    fontSize: {xs: 14,sm: 22},
                    lineHeight: {xs: "17px", sm: "27px"},
                    marginTop: "14px",
                    textAlign: "center",
                    fontWeight: 500
                }}
            >
                {catalog.name[localActive]}
            </Typography>
        </Box>
    );
};

export default HomeCatalogItem;
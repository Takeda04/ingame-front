import React, {FC} from 'react';
import {Box} from "@mui/material";
import HomeCatalogItem from "@/components/home-slider/home-catalog/components/home-catalog-item";
import NavigationLink from "@/components/navigation-link/navigation-link";
import {ICatalog} from "@/http/catalog-api";

interface IHomeCatalogProps {
    catalogs: ICatalog;
}

const HomeCatalogList: FC<IHomeCatalogProps> = ({catalogs}) => {
    return (
        <Box
            sx={{
                maxWidth: "882px",
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)"
                },
                gap: "10px 14px"
            }}
        >
            {catalogs.map((catalog, idx) => {
                return (
                    <NavigationLink key={idx} href={`/category/${catalog.slug}`}>
                        <HomeCatalogItem
                            catalog={catalog}
                        />
                    </NavigationLink>
                )
            })}
        </Box>
    );
};

export default HomeCatalogList;
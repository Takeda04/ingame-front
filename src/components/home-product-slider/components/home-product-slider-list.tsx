"use client";
import React, {FC} from 'react';
import {Product} from "@/http/products-api";
import ProductCard from "@/components/product-card/product-card";
import Box from "@mui/material/Box";

interface IHomeProductSliderList {
    products: Product[];
}

const HomeProductSliderList: FC<IHomeProductSliderList> = ({products}) => {

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                },
                width: "100%",
                placeItems: "center",
                mt: "30px",
                gap: "20px"
            }}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </Box>
    );
};

export default HomeProductSliderList;
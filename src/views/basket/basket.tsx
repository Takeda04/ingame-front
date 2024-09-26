"use client";
import React, {useEffect, useState} from 'react';
import AppContainer from "@/ui/app-container/app-container";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import {Box, Typography, useTheme} from "@mui/material";
import AppButton from '@/ui/button/button';
import BasketCard from "@/components/basket-card/basket-card";
import BasketHeader from "@/components/basket-header/basket-header";
import {changeCountProductsInBasket, getBasketProducts, removeProductFromBasket} from "@/utils/basket-util";
import axios from 'axios';
import {IProductCredit, Product} from "@/http/products-api";
import {useLocale, useTranslations} from "next-intl";
import {useAppContext} from "@/context/app-context";
import {useRouter} from "next/navigation";
import {toastError} from "@/utils/toast-util";
import {Desktop} from "@/http/desktops-api";

const Basket = () => {
    const [products, setProducts] = useState<{
        product: Product | Desktop;
        productId: number;
        productSlug: number;
        credit: IProductCredit,
        count: number;
        id: string;
    }[]>([]);
    const t = useTranslations("Breadcrumbs");
    const basketTranslation = useTranslations("Basket");
    const localActive = useLocale() as "ru" | "uz";
    const {currency, formatPrice, basketProducts, deleteProductFromBasket, refreshBasketProducts} = useAppContext();
    const totalPrice = products.reduce((acc, item) => {
        if(item.credit != null) {
            return acc;
        }
        return acc + (+item.product.price[currency] * item.count);
    }, 0)

    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const theme = useTheme();

    const fetchData = async () => {
        try {
            const {data} = await axios.post("/api/basket", {
                products: basketProducts
            });
            setProducts(data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const handleClick = () => {
        if(products.length === 0) {
            toastError("Корзина пусто", theme);
            return;
        }
        router.push(`/${localActive}/checkout`);
    }

    const handleChangeCountOfProducts = (id: string, type: "INC" | "DEC") => {
        const result = changeCountProductsInBasket(id, type);
        if (result) {
            setProducts((prev) => prev.map((item) => {
                if (item.id == id) {
                    if (type === "INC") {
                        return {
                            ...item,
                            count: item.count + 1,
                        }
                    } else {
                        return {
                            ...item,
                            count: item.count - 1,
                        }
                    }
                }
                return item;
            }));
            refreshBasketProducts();
        }
    }

    const handleRemoveProduct = (id: string) => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        deleteProductFromBasket(id);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <Box
            sx={{
                paddingBottom: "55px"
            }}
        >
            <AppContainer>
                <Breadcrumb
                    list={[
                        {
                            label: t("main"),
                            link: "/"
                        },
                        {
                            label: t("basket")
                        }
                    ]}
                />

                <Box
                    sx={{
                        display: "flex",
                        gap: "19px",
                        flexDirection: {xs: "column", lg: "row"}
                    }}
                >

                    <Box
                        sx={{
                            flex: 1
                        }}
                    >
                        <BasketHeader/>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "25px",
                                mt: "21px"
                            }}
                        >
                            {products.map((item) => (
                                <BasketCard
                                    handleChangeCountOfProducts={handleChangeCountOfProducts}
                                    removeProductFromBasket={handleRemoveProduct}
                                    key={item.id}
                                    product={item}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "#121212",
                            padding: "20px",
                            maxWidth: "430px",
                            width: "100%",
                            height: "min-content"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 18,
                                    color: theme => theme.palette.primaryText.main
                                }}
                            >
                                {basketTranslation("total")}: .............
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 20,
                                    color: theme => theme.palette.primaryText.main
                                }}
                            >
                                {formatPrice(totalPrice)}
                            </Typography>
                        </Box>

                        <AppButton
                            size="small"
                            label={basketTranslation("continue")}
                            onClick={handleClick}
                            sx={{
                                width: "100%",
                                mt: "27px",
                                fontSize: 18
                            }}
                        />

                    </Box>
                </Box>
            </AppContainer>
        </Box>
    );
};

export default Basket;
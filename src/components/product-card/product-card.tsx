"use client";
import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import {Product} from "@/http/products-api";
import Image from "next/image";
import {useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BasketIcon from "@/ui/icons/basket";
import {clampText} from "@/utils/clamp-text";
import FireIcon from "@/ui/icons/fire-icon";
import {useLocale, useTranslations} from "next-intl";
import {calculateDiscountPercentage} from "@/utils/helpers";
import {useAppContext} from "@/context/app-context";
import NavigationLink from "@/components/navigation-link/navigation-link";
import {addProductToBasket, isProductInBasket} from "@/utils/basket-util";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useRouter} from "next/navigation";

interface IProductCardProps {
    product: Product;
}

const ProductCard: FC<IProductCardProps> = ({product}) => {
    const theme = useTheme();
    const localActive = useLocale() as "uz" | "ru";
    const {currency, formatPrice, refreshBasketProducts} = useAppContext();
    const isDiscount = Boolean(product.discount && product.discount.usd);
    const router = useRouter();
    const [isInBasket, setIsInBasket] = useState(isProductInBasket(product.id, false));
    const t = useTranslations("productCard");

    const handleClickBasket = (e: React.MouseEvent) => {
        e.preventDefault();

        if (isInBasket) {
            router.push(`/${localActive}/basket`)
            return;
        }
        addProductToBasket(product.id, product.slug, null, 1, false);
        setIsInBasket(isProductInBasket(product.id, false));
        refreshBasketProducts();
    }


    const handleClickBuy = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/${localActive}/checkout?p=${product.id}&slug=${product.slug}`);
    }

    return (
        <NavigationLink href={`/products/${product.slug}`}>
            <Box
                sx={{
                    width: "300px",
                    backgroundColor: theme.palette.productBackground.main,
                    padding: "20px",
                    position: "relative",
                }}
            >
                {isDiscount && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "absolute",
                            left: "4px",
                            top: "-18px",
                            zIndex: 10
                        }}
                    >
                        <Typography
                            sx={{
                                borderWidth: "1px",
                                borderColor: theme.palette.primary.main,
                                borderStyle: "solid",
                                padding: "8px 9px",
                                fontWeight: 700,
                                fontSize: "16px",
                                lineHeight: "20px",
                                color: theme.palette.primaryText.main,
                                mr: "5px"
                            }}
                        >
                            - {calculateDiscountPercentage(product.price[currency], product.discount[currency])} %
                        </Typography>

                        <FireIcon
                            sx={{
                                fontSize: 45
                            }}
                        />
                    </Box>
                )}


                <Box
                    sx={{
                        position: "relative",
                        height: "250px",
                        width: "100%"
                    }}
                >
                    <Image
                        src={product.images?.[0]?.image_path}
                        alt="image"
                        fill
                        style={{
                            objectFit: "contain",

                        }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </Box>
                <Typography
                    component="h4"
                    sx={{
                        fontSize: {xs: 16, md: 20},
                        fontWeight: 600,
                        lineHeight: "24px",
                        color: theme.palette.primaryText.main,
                        mt: "18px",
                        height: "48px",
                        ...clampText(2, 24),
                    }}
                >
                    {product.name[localActive]}
                </Typography>


                <Box
                    sx={{
                        mt: "23px",
                        height: "46px",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography
                        component="span"
                        sx={{
                            display: "block",
                            fontSize: {xs: 15, md: 18},
                            lineHeight: {xs: "18px", md: "22px"},
                            color: theme.palette.primaryText.main,
                            textDecoration: "line-through"
                        }}
                    >
                        {isDiscount && (
                            formatPrice(
                                product.price[currency],
                            )
                        )}
                    </Typography>

                    <Typography
                        component="h5"
                        sx={{
                            fontWeight: 600,
                            fontSize: {xs: 16, md: 20},
                            lineHeight: {xs: "19px", md: "24px"},
                            color: theme.palette.primary.main,
                            marginTop: "auto"
                        }}
                    >
                        {formatPrice(
                            isDiscount ? product.discount[currency] || 0 : product.price[currency],
                        )}
                    </Typography>
                </Box>


                <Typography
                    sx={{
                        mt: "9px",
                        fontSize: {xs: 12, md: 16},
                        lineHeight: "19px",
                        fontWeight: 300,
                        height: "38px",
                        color: theme.palette.primaryText.main,
                        ...clampText(2, 19),
                    }}
                    dangerouslySetInnerHTML={{ __html: product.description[localActive] }}
                    component="p"
                />


                <Box
                    sx={{
                        display: "flex",
                        justifyContent: {xs: "space-between", md: "flex-end"},
                        mt: "10px"
                    }}
                >
                    <Button
                        onClick={handleClickBuy}
                        variant="outlined"
                        sx={{
                            fontWeight: 700,
                            fontSize: 16,
                            lineHeight: "20px",
                            borderRadius: 0,
                            color: theme.palette.primaryText.main,
                            padding: {xs: "8px 49px", md: "8px 15px"},
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main
                            }
                        }}
                    >
                        {t("buy")}
                    </Button>
                    <IconButton
                        onClick={handleClickBasket}
                        sx={{
                            ml: "10px",
                            borderColor: theme => isInBasket ? "transparent" : theme.palette.primaryText.main,
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderRadius: 0,
                            backgroundColor: theme => isInBasket ? theme.palette.primary.main : "transparent",
                            "&:hover": {
                                backgroundColor: theme => isInBasket ? theme.palette.primary.main : "transparent",
                            }
                        }}
                    >
                        {isInBasket ? (
                            <AddShoppingCartIcon
                                sx={{
                                    fill: theme => theme.palette.primaryText.main,
                                    fontSize: 20,
                                }}
                            />
                        ) : (
                            <BasketIcon
                                sx={{
                                    fontSize: 20,
                                }}
                            />
                        )}

                    </IconButton>
                </Box>
            </Box>
        </NavigationLink>
    );
};

export default ProductCard;
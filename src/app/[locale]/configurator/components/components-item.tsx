"use client";
import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Product} from "@/http/products-api";
import {useLocale} from "next-intl";
import {FormControlLabel, Radio} from "@mui/material";
import {useAppContext} from "@/context/app-context";
import {cutText} from "@/utils/helpers";
import Image from "next/image";
import {clampText} from "@/utils/clamp-text";
import Button from "@mui/material/Button";
import AppButton from "@/ui/button/button";


interface IComponentsItem {
    label: string;
    products: Product[];
    assembledProducts: Product[];
    selectedProduct: Product | null;
    onChangeCheckbox: (product: Product, key: string) => void;
    grid: boolean;
    onRemoveProduct: (key: string) => void;
};

const groupProductsByAttribute = (products: Product[], attributeName: string) => {
    const groupedBySize: { [key: string]: Product[] } = {
        all: products
    };

    products.forEach((product) => {
        const size = product.attributes.find(attr => attr.type.ru === attributeName)?.value;
        if (size) {
            if (!groupedBySize[size]) groupedBySize[size] = [];
            groupedBySize[size].push(product);
        }
    });

    return groupedBySize;
};


const ComponentsItem: FC<IComponentsItem> = ({
                                                 label,
                                                 products,
                                                 assembledProducts,
                                                 selectedProduct,
                                                 onChangeCheckbox,
                                                 grid,
                                                 onRemoveProduct
                                             }) => {
    const {currency, formatPrice} = useAppContext();
    const localActive = useLocale() as "ru" | "uz";
    const [selectedGroup, setSelectedGroup] = useState("all");
    let groupedProducts: { [key: string]: Product[] } = {};

    if (label === "ram") {
        groupedProducts = groupProductsByAttribute(products, "Количество памяти");
    } else if (label === "video_cards") {
        groupedProducts = groupProductsByAttribute(products, "Модель");
    } else if (label === "cpu") {
        groupedProducts = groupProductsByAttribute(products, "Наименование процессора");
    } else if (label === "motherboard") {
        groupedProducts = groupProductsByAttribute(products, "Тип процессора");
    } else if (label === "cooling") {
        groupedProducts = groupProductsByAttribute(products, "Производитель");
    } else if (label === "ssd" || label === "hdd") {
        groupedProducts = groupProductsByAttribute(products, "Память");
    } else if (label === "psu") {
        groupedProducts = groupProductsByAttribute(products, "Мощность");
    } else {
        groupedProducts = groupProductsByAttribute(products, "Бренд");
    }


    return (
        <Box
            sx={{
                mt: "43px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Typography
                    color="primaryText.main"
                    sx={{
                        fontWeight: 600,
                        fontSize: {xs: 14, md: 24},
                        lineHeight: {xs: "33px", md: "14px"},
                        textTransform: "capitalize"
                    }}
                >
                    {label.replaceAll(/_/g, " ")}
                </Typography>
                <Box
                    sx={{
                        ml: "20px",
                        display: "flex",
                        gap: "20px"
                    }}
                >
                    {Object.keys(groupedProducts).sort().map(size => (
                        <AppButton
                            key={size}
                            label={size}
                            variant="outlined"
                            size="small"
                            onClick={() => setSelectedGroup(size)}
                            sx={{
                                color: theme => theme.palette.primaryText.main,
                                borderColor: selectedGroup === size ? "#D3176D" : "#B7B4B5",
                                fontSize: 16
                            }}
                        />
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    backgroundColor: "productBackground.main",
                    display: "flex",
                    padding: !grid ? "30px" : "15px",
                    gap: "13px",
                    mt: "12px"
                }}
            >
                {!grid && (
                    <Box
                        sx={{
                            maxWidth: "232px",
                            maxHeight: "226px",
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            display: {xs: "none", md: "block"}
                        }}
                    >
                        {!!selectedProduct && (
                            <Box
                                src={selectedProduct?.images?.[0]?.image_path}
                                component="img"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        )}
                    </Box>
                )}
                {grid ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}
                    >
                        {products.map((item) => {
                            const productPrice = item.price[currency] - (selectedProduct?.price[currency] || 0);

                            return (
                                <Box
                                    key={item.id}
                                    sx={{
                                        maxWidth: "280px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "232px",
                                            height: "226px",
                                            position: "relative"
                                        }}
                                    >
                                        <Image
                                            src={item.images?.[0]?.image_path}
                                            fill
                                            alt="product image"
                                            style={{
                                                objectFit: "contain"
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={item.id === selectedProduct?.id}
                                                    onChange={() => onChangeCheckbox(item, item.type)}
                                                />
                                            }
                                            label={item.name[localActive]}
                                            componentsProps={{
                                                typography: {
                                                    fontWeight: 600,
                                                    fontSize: {xs: 14, md: 16},
                                                    lineHeight: "24px",
                                                    ...clampText(2, 24)
                                                }
                                            }}
                                            sx={{

                                                color: "primaryText.main"
                                            }}
                                        />
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        {groupedProducts[selectedGroup].map((item) => {
                            const productPrice = item.price[currency] - (selectedProduct?.price[currency] || 0);

                            return (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: {xs: "block", md: "flex"},
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderColor: "#353535",
                                        borderStyle: "solid",
                                        borderWidth: "0 0 1px 0",
                                        width: "100%",
                                        padding: "10px 0",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={!!selectedProduct && item.id === selectedProduct.id}
                                                    onChange={() => onChangeCheckbox(item, item.type)}
                                                />
                                            }
                                            label={cutText(item.name[localActive], 40)}
                                            componentsProps={{
                                                typography: {
                                                    fontWeight: 600,
                                                    fontSize: {xs: 14, md: 16},
                                                    lineHeight: "24px",
                                                }
                                            }}
                                            sx={{

                                                color: "primaryText.main"
                                            }}
                                        />
                                    </Box>
                                    {item.id !== selectedProduct?.id ? (
                                        <Typography
                                            sx={{
                                                color: "secondaryText.main",
                                                ml: {xs: "35px", md: "0"},
                                                fontSize: {xs: 14, md: 18}
                                            }}
                                        >
                                            {`${productPrice > 0 ? "+" : ""}${formatPrice(productPrice)}`}
                                        </Typography>
                                    ) : (
                                        <Button
                                            variant="text"
                                            onClick={() => onRemoveProduct(label)}
                                        >
                                            Удалить
                                        </Button>
                                    )}
                                </Box>
                            )
                        })}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ComponentsItem;
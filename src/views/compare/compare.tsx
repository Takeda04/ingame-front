"use client";
import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import {deleteProductFromCompare, getProductsFromCompare} from "@/utils/basket-util";
import axios from "axios";
import {Desktop} from "@/http/desktops-api";
import {useLocale, useTranslations} from "next-intl";
import {useAppContext} from "@/context/app-context";
import IconButton from "@mui/material/IconButton";
import TrashIcon from "@/ui/icons/trash-icon";

function Compare() {
    const [products, setProducts] = useState<Desktop[]>([]);
    const [loading, setLoading] = useState(true);
    const { currency, formatPrice } = useAppContext();
    const t = useTranslations("Compare");
    const localActive = useLocale() as "ru" | "uz";

    const fetchData = async () => {
        const storageProducts = getProductsFromCompare();
        try {
            const {data} = await axios.post("/api/compare", {
                products: storageProducts
            });
            setProducts(data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const handleClick = (id: number) => {
        setProducts((prev) => prev.filter((item) => item.id != id));
        deleteProductFromCompare(id);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return null;
    }

    const uniqueAttributes: {
        id: number;
        type: {
            uz: string;
            ru: string;
        },
        value: string;
        values: string[];
        pivot: {
            desktop_computer_id: number;
            attribute_id: number;
        }
    }[] = [];
    products.forEach((product, idx) => {
        product.attributes.flat().forEach(attribute => {
            const product = uniqueAttributes.find((item) => item.type.ru === attribute.type.ru)
            const row = {
                ...attribute,
                values: new Array(products.length).fill("-"),
            };
            if (product) {
                product.values[idx] = attribute.value;
            } else {
                row.values[idx] = attribute.value;
                uniqueAttributes.push(row);
            }

        });
    });

    return (
        <Box>
            <AppContainer>
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        mt: "35px",
                        mb: "14px",
                        fontSize: {xs: 20, sm: 30},
                        fontWeight: 600,
                        lineHeight: "36.9px",
                        color: theme => theme.palette.primaryText.main
                    }}
                >
                    {t("title")}
                </Typography>
                <TableContainer>
                    <Table
                        sx={{
                            mb: "50px",
                            overflowX: "scroll",
                            tableLayout: "fixed",
                            width: "100%",
                            borderCollapse: "separate",
                            borderSpacing: "14px",
                        }}
                        aria-label="comparison table"
                    >
                        <TableHead>
                            <TableRow>
                                {products.map((item) => (
                                    <TableCell
                                        key={item.id}
                                        sx={{
                                            padding: 0,
                                            border: "10px solid transparent",
                                            width: {xs: 280, sm: 300},
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: theme => theme.palette.productBackground.main,
                                                padding: "18px 21px",
                                                width: {xs: 280, sm: 300},
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: {xs: "200px", sm: "250px"},
                                                    width: "100%"
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={item.images?.[0]?.image_path}
                                                    sx={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                sx={{
                                                    fontSize: {xs: 14, sm: 20},
                                                    fontWeight: 600,
                                                    lineHeight: "24px",
                                                    color: theme => theme.palette.primaryText.main,
                                                    mt: "10px"
                                                }}
                                            >
                                                {item.name[localActive]}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: {xs: 16, sm: 20},
                                                        lineHeight: "24px",
                                                        color: "#C6C6C6"
                                                    }}
                                                >
                                                    {formatPrice(item.price[currency])}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => handleClick(item.id)}
                                                >
                                                    <TrashIcon
                                                        sx={{
                                                            fontSize: 18
                                                        }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uniqueAttributes.map(row => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        width: {xs: 280, sm: 300},
                                    }}
                                >
                                    {row.values.map((str, idx) => (
                                        <TableCell
                                            key={idx}
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: {xs: 13, sm: 16},
                                                color: theme => theme.palette.primaryText.main,
                                                borderColor: "#3F3F3F"
                                            }}
                                        >
                                            {idx === 0 && (
                                                <Typography>
                                                    {row.type[localActive]}
                                                </Typography>
                                            )}
                                            {str}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AppContainer>
        </Box>
    );
}

export default Compare;

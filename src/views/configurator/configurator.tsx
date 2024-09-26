"use client"
import React, {FC, useEffect, useMemo, useState} from 'react';
import AppContainer from "@/ui/app-container/app-container";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Box from "@mui/material/Box";
import TitleSection from "@/ui/title-section/title-section";
import ComponentsItem from "@/app/[locale]/configurator/components/components-item";
import {IAttribute, Product} from "@/http/products-api";
import {Desktop} from "@/http/desktops-api";
import ModalComponentsIncompatible from "@/app/[locale]/configurator/components/modal-components-incompatible";
import Typography from "@mui/material/Typography";
import {useAppContext} from "@/context/app-context";
import {Divider, List, ListItem, useTheme} from "@mui/material";
import {useLocale} from "next-intl";
import AppButton from "@/ui/button/button";
import {useRouter} from "next/navigation";
import NavigationLink from '@/components/navigation-link/navigation-link';
import Loading from "@/app/[locale]/loading";

interface IConfigurator {
    products: { [key: string]: Product[] };
    desktop: Desktop;
}

const groupProductsByAttribute = (products: { [key: string]: Product[] }, key: string, attributeName: string) => {
    const ramProducts = products[key];
    const groupedBySize: { [key: string ]: Product[] } = {};

    ramProducts.forEach((product) => {
        const size = product.attributes.find(attr => attr.type.ru === attributeName)?.value;
        if (size) {
            if (!groupedBySize[size]) groupedBySize[size] = [];
            groupedBySize[size].push(product);
        }
    });

    return groupedBySize;
};

const Configurator: FC<IConfigurator> = ({products, desktop}) => {
    const {currency, formatPrice} = useAppContext();
    const localActive = useLocale() as "ru" | "uz";
    const desktopProductIds = useMemo(() => new Set(desktop.products.map(product => product.id)), [desktop.products]);
    const [selectedProductIds, setSelectedProductIds] = useState(() => {
        return Object.keys(products).reduce((result: { [key: string]: Product | null }, item) => {
            result[item] = products[item].find(product => desktopProductIds.has(product.id)) || null;
            return result;
        }, {});
    });
    const router = useRouter();
    const theme = useTheme();
    const [incompatibilities, setIncompatibilities] = useState<{
        attribute: IAttribute,
        product: Product
    }[]>([]);
    const [loading, setLoading] = useState(true);


    // const ramGroups = useMemo(() => , [products]);
    // console.log(ramGroups);

    const handleChangeCheckbox = (product: Product, key: string) => {
        setSelectedProductIds(prevState => {
            const newState = {
                ...prevState,
                [key]: product
            };

            if (product.type === "cpu" || product.type === "motherboard") {
                const cpuSocket = newState["cpu"]?.attributes.find((attribute) => attribute.type.ru === "Сокет");
                const motherboardSocket = newState["motherboard"]?.attributes.find((attribute) => attribute.type.ru === "Сокет");
                if (cpuSocket && motherboardSocket && motherboardSocket.id !== cpuSocket.id) {
                    setIncompatibilities([
                        {
                            product: newState["cpu"]!,
                            attribute: cpuSocket,
                        },
                        {
                            product: newState["motherboard"]!,
                            attribute: motherboardSocket
                        }!
                    ]);
                    return prevState;
                }
            }

            if (product.type === "ram" || product.type === "motherboard") {
                const ramType = newState["ram"]?.attributes.find((attribute) => attribute.type.ru === "Тип памяти");
                const motherboardType = newState["motherboard"]?.attributes.find((attribute) => attribute.type.ru === "Тип памяти");
                if (ramType && motherboardType && ramType.id !== motherboardType.id) {
                    setIncompatibilities([
                            {
                                product: newState["ram"]!,
                                attribute: ramType
                            },
                            {
                                product: newState["motherboard"]!,
                                attribute: motherboardType
                            }!
                        ]
                    );
                    return prevState;
                }
            }

            return newState;
        });
    };

    const handleCloseModal = () => {
        setIncompatibilities([]);
    }

    const totalPrice = Object.keys(selectedProductIds).reduce((acc, item) => acc + (selectedProductIds[item]?.price[currency] || 0), 0);

    const navigateToCheckout = () => {
        const ids: string[] = [];
        Object.keys(selectedProductIds).forEach((key) => {
            if (selectedProductIds[key]?.id) {
                ids.push(`products[]=${selectedProductIds[key]?.id}`);
            }
        })
        router.push(`/${localActive}/checkout/?configurator=${desktop.id}&${ids.join("&")}`);
    };

    const handleRemoveProduct = (key: string) => {
        setSelectedProductIds(prevState => ({
            ...prevState,
            [key]: null,
        }));
    }

    useEffect(() => {
        const productList: Product[] = [];

        Object.keys(products).forEach((key) => {
            productList.push(...products[key]);
        });

        let imagesCount = productList.length;
        const handleImageLoad = () => {
            imagesCount -= 1;
            if (imagesCount === 0) {
                setLoading(false);
            }
        };

        productList.forEach(product => {
            const img = new Image();
            img.src = product.images?.[0]?.image_path || '';
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad;
        });
    }, [products]);

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <ModalComponentsIncompatible
                handleClose={handleCloseModal}
                open={incompatibilities && incompatibilities?.length > 0}
                incompatibilities={incompatibilities}
            />
            <Box>
                <AppContainer>
                    <Breadcrumb
                        list={[
                            {
                                label: "Главная",
                                link: "/"
                            },
                            {
                                label: "Конфигуратор"
                            },
                            {
                                label: "Игровые ПК"
                            }
                        ]}
                    />

                    <Box
                        sx={{
                            display: {xs: "flex", md: "none"},
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            backgroundColor: "#111111",
                            padding: "7px 20px",
                            justifyContent: "space-between",
                            zIndex: 100
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: "primaryText.main",
                                    fontSize: 14,
                                    lineHeight: "20px"
                                }}
                            >
                                Цена:
                            </Typography>
                            <Typography
                                sx={{
                                    color: "secondaryText.main",
                                    fontSize: 14,
                                    lineHeight: "20px"
                                }}
                            >
                                {formatPrice(totalPrice)}
                            </Typography>
                        </Box>
                        <AppButton
                            onClick={navigateToCheckout}
                            size="small"
                            label="Купить"
                            variant="outlined"
                            sx={{
                                color: "primaryText.main",
                                textTransform: "math-auto",
                                padding: "8px 14px",
                            }}
                        />

                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "space-between",
                            marginBottom: "40px",

                            flexDirection: {xs: "column", md: "row",}
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: {xs: "100%", md: "282px",},
                                width: "100%",
                                position: {xs: "static", md: "sticky"},
                                top: "100px",
                                height: "700px",
                                overflowY: "scroll",
                                display: {xs: "none", md: "block"},

                                "&::-webkit-scrollbar": {
                                    width: "5px",
                                    height: "5px",
                                    borderRadius: "5px"
                                },
                                "&::-webkit-scrollbar-track": {
                                    background: theme => theme.palette.primaryText.main,
                                    borderRadius: "5px"
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: theme => theme.palette.primary.main,
                                    borderRadius: "2px"
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    mt: "10px",
                                    padding: "15px 18px",
                                    backgroundColor: "#111111"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        color: "primaryText.main",
                                        fontSize: 14,
                                        lineHeight: "20px"
                                    }}
                                >
                                    Конфигуратор:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "primaryText.main",
                                        fontSize: 16,
                                        lineHeight: "20px"
                                    }}
                                >
                                    {desktop.name[localActive]}
                                </Typography>
                                <Typography
                                    sx={{
                                        mt: "20px",
                                        fontWeight: 600,
                                        color: "primaryText.main",
                                        fontSize: 14,
                                        lineHeight: "20px"
                                    }}
                                >
                                    Цена:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "primaryText.main",
                                        fontSize: 16,
                                        lineHeight: "20px"
                                    }}
                                >
                                    {formatPrice(totalPrice)}
                                </Typography>
                                <Box
                                    sx={{
                                        mt: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                >
                                    <AppButton
                                        onClick={navigateToCheckout}
                                        size="small"
                                        label="Купить"
                                        variant="outlined"
                                        sx={{
                                            color: "primaryText.main",
                                            textTransform: "math-auto",
                                            padding: "8px 14px",
                                        }}
                                    />
                                </Box>
                                <Typography
                                    color="secondaryText.main"
                                    sx={{
                                        mt: "8px",
                                        fontSize: 14
                                    }}
                                >
                                    Доставим заказ за 1 день
                                </Typography>
                                <Divider
                                    sx={{
                                        width: "100%",
                                        margin: "15px 0",
                                        borderColor: "#2A2A2A"
                                    }}
                                />

                                <List
                                    sx={{
                                        margin: 0,
                                        padding: 0
                                    }}
                                >
                                    {Object.keys(selectedProductIds).map((key) => (
                                        <ListItem
                                            key={key}
                                            sx={{
                                                display: "block",
                                                padding: 0
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    mt: "20px",
                                                    fontWeight: 600,
                                                    color: "primaryText.main",
                                                    fontSize: 14,
                                                    lineHeight: "20px",
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {key.replaceAll(/_/g, " ")}
                                            </Typography>
                                            <NavigationLink
                                                style={{
                                                    color: theme.palette.primaryText.main,
                                                    fontSize: 16,
                                                    lineHeight: "20px",
                                                    textDecoration: "underline"
                                                }}
                                                href={`/products/${selectedProductIds[key]?.slug}`}
                                            >
                                                {selectedProductIds[key]?.name[localActive]}
                                            </NavigationLink>
                                        </ListItem>
                                    ))}
                                </List>

                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%"
                            }}
                        >
                            <TitleSection
                                label="Игровые ПК"
                            />
                            <Box
                                sx={{
                                    mt: "30px"
                                }}
                            >
                                {Object.keys(products).map((item) => {
                                    const selectedProduct = selectedProductIds[item];

                                    return (
                                        <Box
                                            id={`component-item-${item}`}
                                            key={item}
                                        >
                                            <ComponentsItem
                                                label={item}
                                                products={products[item]}
                                                assembledProducts={desktop.products}
                                                selectedProduct={selectedProduct}
                                                onChangeCheckbox={handleChangeCheckbox}
                                                onRemoveProduct={handleRemoveProduct}
                                                grid={item === "monitors"}
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                </AppContainer>
            </Box>
        </>
    );
};

export default Configurator;
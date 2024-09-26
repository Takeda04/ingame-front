"use client";
import React, {FC, useEffect, useState} from 'react';
import AppContainer from "@/ui/app-container/app-container";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import TitleSection from "@/ui/title-section/title-section";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {IProductFilter, IProductFilterAttribute} from "@/http/products-api";
import {Button, Checkbox, Divider, FormControlLabel, FormGroup, Pagination, TextField, useTheme} from "@mui/material";
import ProductCard from "@/components/product-card/product-card";
import FilterIcon from "@/ui/icons/filter-icon";
import ButtonOutlined from "@/ui/button/button-outlined";
import {useLocale} from "next-intl";
import HomeSelectPc from "@/components/home-select-pc/home-select-pc";
import WhyChooseUs from "@/components/why-choose-us/why-choose-us";
import HomeFooter from "@/components/home-footer/home-footer";
import Grow from "@mui/material/Grow";
import CloseIcon from "@/ui/icons/close-icon";
import IconButton from "@mui/material/IconButton";
import {useRouter} from "next/navigation";
import HomeFaq from '@/components/home-faq/home-faq';
import {Catalog} from "@/http/catalog-api";
import CurrencyFilterInput from "@/components/currency-filter-input/currency-filter-input";
import {CommitFromClients} from "@/http/comments-api";

interface ICategoryProps {
    products: IProductFilter;
    catalog: Catalog | null;
    minPriceValue: string | undefined;
    maxPriceValue: string | undefined;
    brandsSearchParams: string[] | undefined;
    attributes: string[] | undefined;
    currentPage: string;
    commitsFromClients: CommitFromClients[];
}

function parseProductAttributes(productAttributes: IProductFilterAttribute[], localActive: "uz" | "ru") {
    const result: { [key: string]: IProductFilterAttribute[] } = {};

    productAttributes.forEach((item) => {
        const activeType = localActive === "uz" ? item.type[0] : item.type[1];
        if (result[activeType]) {
            result[activeType].push(item);
            return;
        }
        result[activeType] = [item];
    });

    return result;
}


const CategoryPage: FC<ICategoryProps> = ({
                                              products,
                                              catalog,
                                              minPriceValue,
                                              maxPriceValue,
                                              brandsSearchParams,
                                              currentPage,
                                              commitsFromClients,
                                              attributes
                                          }) => {
    const brands = products.products_brands;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const router = useRouter();
    const theme = useTheme();
    const [filter, setFilter] = useState<{
        min_price: undefined | string,
        max_price: undefined | string,
        brand_search_params: string[] | undefined,
        page: number,
        attributes: string[] | undefined,
    }>({
        min_price: minPriceValue,
        max_price: maxPriceValue,
        brand_search_params: brandsSearchParams,
        page: +currentPage,
        attributes: attributes
    });
    const localActive = useLocale() as "uz" | "ru";
    const productAttributes = parseProductAttributes(products.products_attributes, localActive);
    const maxItems = 6;
    const itemHeight = 48;

    const handleClickFilterButton = () => {
        setIsFilterMenuOpen(true);
    }

    const handleClickCloseFilterButton = () => {
        setIsFilterMenuOpen(false);
    }

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    const handleChangePagination = (event: any, value: number) => {
        setFilter((prev) => ({...prev, page: value}));
    }

    const resetFilter = () => {
        setFilter({
            min_price: undefined,
            max_price: undefined,
            brand_search_params: undefined,
            page: filter.page,
            attributes: undefined,
        });
        handleClickFilter();
    };

    const handleToggleCheckbox = (brandId: number) => {
        setFilter(prevSelected => {
            const brandIdStr = brandId.toString();
            if (prevSelected.brand_search_params && prevSelected.brand_search_params.includes(brandIdStr)) {
                return {
                    ...prevSelected,
                    brand_search_params: prevSelected.brand_search_params.filter(id => id !== brandIdStr)
                };
            } else {
                return {
                    ...prevSelected,
                    brand_search_params: [...(prevSelected.brand_search_params || []), brandIdStr]
                };
            }
        });
    };

    const handleToggleAttributes = (attributeId: number) => {
        setFilter(prevSelected => {
            const attributeIdStr = attributeId.toString();
            if (prevSelected.attributes && prevSelected.attributes.includes(attributeIdStr)) {
                return {
                    ...prevSelected,
                    attributes: prevSelected.attributes.filter(id => id !== attributeIdStr)
                };
            } else {
                return {
                    ...prevSelected,
                    attributes: [...(prevSelected.attributes || []), attributeIdStr]
                };
            }
        });
    };

    const handleClickFilter = () => {
        let route = `/${localActive}/category/${catalog?.slug}/`;

        const queryParams = [];
        if (filter.min_price) {
            queryParams.push(`min_price=${filter.min_price}`);
        }
        if (filter.max_price) {
            queryParams.push(`max_price=${filter.max_price}`);
        }
        if (filter.page) {
            queryParams.push(`page=${filter.page}`);
        }
        if (filter.brand_search_params) {
            filter.brand_search_params.forEach((item) => {
                queryParams.push(`brand[]=${item}`);
            });
        }
        if(filter.attributes && Array.isArray(filter.attributes)) {
            filter.attributes.forEach((item) => {
                queryParams.push(`attributes[]=${item}`);
            })
        }
        if(filter.attributes && !Array.isArray(filter.attributes)) {
            queryParams.push(`attributes[]=${filter.attributes}`);
        }

        if (queryParams.length) {
            route += `?${queryParams.join('&')}`;
        }

        router.push(route, {scroll: true});
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;

        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        handleClickFilter();
    }, [filter.page]);

    return (
        <Box
            sx={{
                overflowX: "hidden"
            }}
        >
            <AppContainer>
                <Breadcrumb
                    list={[
                        {
                            label: "Главная",
                            link: "/"
                        },
                        {
                            label: catalog?.name?.[localActive] || ""
                        }
                    ]}
                />
            </AppContainer>

            <Box
                sx={{
                    display: {xs: "flex", sm: "none"},
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        padding: "14px 24px",
                        borderColor: "#272727",
                        borderBottomWidth: "1px",
                        borderTopWidth: "1px",
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderStyle: "solid",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                        onClick={handleClickFilterButton}
                    >
                        <FilterIcon/>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 12,
                                lineHeight: "14px",
                                ml: "10px",
                                color: theme => theme.palette.primaryText.main
                            }}
                        >
                            Фильтры
                        </Typography>
                    </Box>
                    {isFilterMenuOpen && (
                        <IconButton
                            onClick={handleClickCloseFilterButton}
                            sx={{
                                padding: 0
                            }}
                        >
                            <CloseIcon
                                sx={{
                                    fontSize: "14px",
                                    "& path": {
                                        fill: "#8C8888"
                                    }
                                }}
                            />
                        </IconButton>
                    )}
                </Box>

                <Grow in={isFilterMenuOpen}>
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: "100%",
                            backgroundColor: theme => theme.palette.secondary.main,
                            width: "100%",
                            padding: "16px 20px",
                            zIndex: 100
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "20px",
                                lineHeight: "24px",
                                mb: "12px",
                                color: theme => theme.palette.primaryText.main
                            }}
                        >
                            Цена
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: "108px"
                                }}
                            >
                                <CurrencyFilterInput
                                    defaultValue={filter.min_price}
                                    onValueChange={(values) => setFilter((prev) => ({...prev, min_price: values.value}))}
                                />
                            </Box>
                            <Divider
                                sx={{
                                    borderColor: "#474747",
                                    width: "8px",
                                    margin: "0 3px"
                                }}
                            />
                            <Box
                                sx={{
                                    maxWidth: "108px"
                                }}
                            >
                                <CurrencyFilterInput
                                    defaultValue={filter.max_price}
                                    onValueChange={(values) => setFilter((prev) => ({...prev, max_price: values.value}))}
                                />
                            </Box>
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "20px",
                                lineHeight: "24px",
                                mb: "12px",
                                color: theme => theme.palette.primaryText.main,
                                mt: "20px"
                            }}
                        >
                            Бренды
                        </Typography>
                        <FormGroup
                            sx={{
                                mt: "12px",
                                maxHeight: isExpanded ? `${brands.length * itemHeight}px` : `${maxItems * itemHeight}px`,
                                overflow: 'hidden',
                                transition: 'max-height 0.5s ease-in-out',
                            }}
                        >
                            {brands?.map((brand) => (
                                <FormControlLabel
                                    sx={{
                                        color: theme => theme.palette.primaryText.main,
                                        mb: "20px",
                                        width: "100%"
                                    }}
                                    key={brand.id}
                                    control={
                                        <Checkbox
                                            sx={{
                                                padding: 0,
                                                mr: "8px",
                                                ml: "8px",
                                                "& .MuiSvgIcon-root path": {
                                                    fill: theme => theme.palette.primaryText.main
                                                }
                                            }}
                                            checked={filter.brand_search_params?.includes(brand.id.toString()) || false}
                                            onChange={() => handleToggleCheckbox(brand.id)}
                                            size="medium"
                                        />
                                    }
                                    label={brand.name}
                                />
                            ))}
                        </FormGroup>
                        <Typography
                            onClick={handleToggle}
                            sx={{
                                cursor: "pointer",
                                color: "#655F5F",
                                fontSize: 13,
                                textAlign: "center",
                                textDecoration: "underline"
                            }}
                        >
                            {isExpanded ? "Скрыть" : "Увидеть больше"}
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={handleClickFilter}
                            sx={{
                                marginTop: "10px",
                            }}
                        >
                            Применить
                        </Button>

                    </Box>
                </Grow>
            </Box>


            <AppContainer>


                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {xs: "column", sm: "row"},
                        gap: "24px",
                        paddingBottom: "40px"
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "230px",
                            display: {xs: "none", sm: "block"}
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "20px",
                                lineHeight: "24px",
                                mb: "12px",
                                color: theme => theme.palette.primaryText.main
                            }}
                        >
                            Цена
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: "108px"
                                }}
                            >
                                <CurrencyFilterInput
                                    defaultValue={filter.min_price}
                                    onValueChange={(values, sourceInfo) => setFilter((prev) => ({
                                        ...prev,
                                        min_price: values.value
                                    }))}
                                />
                            </Box>
                            <Divider
                                sx={{
                                    borderColor: "#474747",
                                    width: "8px",
                                    margin: "0 3px"
                                }}
                            />
                            <Box
                                sx={{
                                    maxWidth: "108px"
                                }}
                            >
                                <CurrencyFilterInput
                                    defaultValue={filter.max_price}
                                    onValueChange={(values, sourceInfo) => setFilter((prev) => ({
                                        ...prev,
                                        max_price: values.value
                                    }))}
                                />
                            </Box>
                        </Box>

                        <Divider
                            sx={{
                                borderColor: "#707070",
                                width: "100%",
                                margin: "22px 0"
                            }}
                        />

                        {Object.keys(productAttributes).map((item) => (
                            <React.Fragment key={item}>
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        lineHeight: "24px",
                                        mb: "12px",
                                        color: theme => theme.palette.primaryText.main
                                    }}
                                >
                                    {item}
                                </Typography>
                                <FormGroup
                                    sx={{
                                        mt: "12px",
                                    }}
                                >
                                    {productAttributes[item].map((attribute, idx) => (
                                        <FormControlLabel
                                            sx={{
                                                color: theme => theme.palette.primaryText.main,
                                                mb: "20px",
                                                width: "100%"
                                            }}
                                            key={attribute.id}
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        padding: 0,
                                                        mr: "8px",
                                                        ml: "8px",
                                                        "& .MuiSvgIcon-root path": {
                                                            fill: theme => theme.palette.primaryText.main
                                                        }
                                                    }}
                                                    checked={filter.attributes?.includes(attribute.id.toString()) || false}
                                                    onChange={() => handleToggleAttributes(attribute.id)}
                                                    size="medium"
                                                />
                                            }
                                            label={attribute.value}
                                        />
                                    ))}
                                </FormGroup>
                                <Divider
                                    sx={{
                                        borderColor: "#707070",
                                        width: "100%",
                                        marginTop: "12px",
                                        marginBottom: "22px"
                                    }}
                                />
                            </React.Fragment>
                        ))}

                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: "20px",
                                lineHeight: "24px",
                                mb: "12px",
                                color: theme => theme.palette.primaryText.main
                            }}
                        >
                            Бренды
                        </Typography>
                        <FormGroup
                            sx={{
                                mt: "12px",
                                maxHeight: isExpanded ? `${brands.length * itemHeight}px` : `${maxItems * itemHeight}px`,
                                overflow: 'hidden',
                                transition: 'max-height 0.5s ease-in-out',
                            }}
                        >
                            {brands?.map((brand) => (
                                <FormControlLabel
                                    sx={{
                                        color: theme => theme.palette.primaryText.main,
                                        mb: "20px",
                                        width: "100%"
                                    }}
                                    key={brand.id}
                                    control={
                                        <Checkbox
                                            sx={{
                                                padding: 0,
                                                mr: "8px",
                                                ml: "8px",
                                                "& .MuiSvgIcon-root path": {
                                                    fill: theme => theme.palette.primaryText.main
                                                }
                                            }}
                                            checked={filter.brand_search_params?.includes(brand.id.toString()) || false}
                                            onChange={() => handleToggleCheckbox(brand.id)}
                                            size="medium"
                                        />
                                    }
                                    label={brand.name}
                                />
                            ))}
                        </FormGroup>
                        <Typography
                            onClick={handleToggle}
                            sx={{
                                cursor: "pointer",
                                color: "#655F5F",
                                fontSize: 13,
                                textAlign: "center",
                                textDecoration: "underline"
                            }}
                        >
                            {isExpanded ? "Скрыть" : "Увидеть больше"}
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                mt: "20px",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >
                            <ButtonOutlined
                                onClick={handleClickFilter}
                                label={"Применить"}
                                buttonSx={{
                                    padding: "11px 32px",
                                    fontSize: 16,
                                    lineHeight: "19px"
                                }}
                            />
                            <Typography
                                onClick={resetFilter}
                                sx={{
                                    mt: "9px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "17px",
                                    color: "#655F5F",
                                    textDecoration: "underline"
                                }}
                            >
                                Сбросить фильтр
                            </Typography>
                        </Box>

                    </Box>

                    <Box
                        sx={{
                            mt: {xs: "10px", sm: 0}
                        }}
                    >
                        <TitleSection
                            label={catalog?.name?.[localActive] || ""}
                        />
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "repeat(1, 1fr)",
                                    md: "repeat(2, 1fr)",
                                    lg: "repeat(3, 1fr)",
                                },
                                width: "100%",
                                placeItems: "center",
                                mt: "30px",
                                gap: "20px",
                            }}
                        >
                            {products.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </Box>
                        {products.meta.total !== 0 && (
                            <Box
                                sx={{
                                    mt: "35px",
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Pagination
                                    sx={{
                                        "& .MuiButtonBase-root": {
                                            borderRadius: 0,
                                            borderColor: "primary.main",
                                            color: "primary.main",
                                            fontWeight: 800,
                                            lineHeight: "21px",
                                            fontSize: "18px",
                                            padding: "20px 16px"
                                        },
                                        "& li:first-of-type .MuiButtonBase-root": {
                                            borderRadius: 0,
                                            borderColor: "#BCBCBC",

                                            "& svg": {
                                                fill: "#BCBCBC"
                                            }
                                        },
                                        "& li:last-child .MuiButtonBase-root": {
                                            borderRadius: 0,
                                            borderColor: "#BCBCBC",

                                            "& svg": {
                                                fill: "#BCBCBC"
                                            }
                                        },
                                        "& .Mui-selected": {
                                            background: `${theme.palette.primary.main} !important`,
                                            color: "primaryText.main",
                                            "&:hover": {
                                                backgroundColor: "primary.light",
                                            }
                                        }
                                    }}
                                    count={products.meta.links.length - 2}
                                    page={filter.page}
                                    onChange={handleChangePagination}
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            </AppContainer>
            <HomeSelectPc/>
            <WhyChooseUs commitsFromClients={commitsFromClients}/>
            <HomeFaq/>
            <HomeFooter/>
        </Box>
    );
};

export default CategoryPage;
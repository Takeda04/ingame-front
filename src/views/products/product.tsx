"use client";
import React, {FC, useEffect, useState} from 'react';
import AppContainer from "@/ui/app-container/app-container";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Box from "@mui/material/Box";
import {IProductCredit, IProductImage, Product} from "@/http/products-api";
import Typography from "@mui/material/Typography";
import FireIcon from "@/ui/icons/fire-icon";
import {clampText} from "@/utils/clamp-text";
import Button from "@mui/material/Button";
import AppButton from "@/ui/button/button";
import {FormControl, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import TitleSection from "@/ui/title-section/title-section";
import ProductSecondaryCard from "@/components/product-secondary-card/product-secondary-card";
import {useAppContext} from "@/context/app-context";
import withProductSlider from "@/components/product-slider/product-slider";
import SectionDescription from "@/components/section-description/section-description";
import ReviewCard from "@/components/review-card/review-card";
import {
    addProductToBasket,
    getBasketProductByIdAndCreditId,
    IBasketProduct,
    isProductInBasket,
} from "@/utils/basket-util";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import ProductDetailDrawer from "@/components/product-detail-drawer/product-detail-drawer";
import {calculateDiscountPercentage} from "@/utils/helpers";
import {Desktop} from "@/http/desktops-api";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface IProductProps {
    product: Product | Desktop;
    locale: "uz" | "ru";
    similarProducts: Product[] | undefined;
    isDesktop?: boolean;
}

const parseProductCredit = (credit: Product["credits"] | Desktop["credits"] | null) => {
    if (!credit) {
        return {};
    }
    const result: { [key: string]: Product["credits"] | Desktop["credits"] } = {};
    credit.forEach((item) => {
        if (result[item.months]) {
            result[item.months] = [...result[item.months], item];
        } else {
            result[item.months] = [item];
        }
    });
    return result;
}

const reviewBreakpoints = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 2,
    },
    tablet: {
        breakpoint: {
            max: 1200,
            min: 0
        },
        items: 1,
    }
}

const ProductPage: FC<IProductProps> = ({product, locale, similarProducts, isDesktop}) => {
    const [availableCredit, setAvailableCredit] = useState(parseProductCredit(product.credits));
    const [activeAvailableCredit, setActiveAvailableCredit] = useState<string | null>(product.credits?.[0]?.months?.toString() || null);
    const [activeImage, setActiveImage] = useState<IProductImage | null>(
        product.images?.[0] || null
    );
    const router = useRouter();
    const localActive = useLocale();
    const [isInBasket, setIsInBasket] = useState(false);
    const [activeCredit, setActiveCredit] = useState<IProductCredit | null>(null);
    const [isDetailProductOpen, setIsDetailProductOpen] = useState(false);
    const isDiscount = Boolean(product.discount && product.discount.usd);
    const [basketProduct, setBasketProduct] = useState<IBasketProduct | null>(null);
    const t = useTranslations("Product");
    const {currency, formatPrice, refreshBasketProducts} = useAppContext();

    const handleClickBasket = () => {
        if (isInBasket && basketProduct) {
            router.push(`/${localActive}/basket`);
            return;
        }
        addProductToBasket(product.id, product.slug, activeCredit, 1, isDesktop);
        setIsInBasket(isProductInBasket(product.id));
        setBasketProduct(getBasketProductByIdAndCreditId(product.id, activeCredit?.id || null));
        refreshBasketProducts();
    }

    const handleBuy = (e: React.MouseEvent) => {
        router.push(`/${localActive}/checkout?p=${product.id}&slug=${product.slug}&desktop=${isDesktop ? 1 : 0}`);
    }


    const ProductSlider = withProductSlider<Product>(
        ProductSecondaryCard
    );

    const ReviewSlider = withProductSlider(
        ReviewCard
    );

    const handleClickImage = (image: IProductImage) => {
        setActiveImage(image);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsInBasket(isProductInBasket(product.id));
            setBasketProduct(getBasketProductByIdAndCreditId(product.id, activeCredit?.id || null));
        }
    }, [product.id, activeCredit]);

    return (
        <>
            <ProductDetailDrawer
                isOpen={isDetailProductOpen}
                onClose={() => setIsDetailProductOpen(false)}
                product={product}
                isInBasket={isInBasket}
                handleClickBasket={handleClickBasket}
                basketProduct={basketProduct}
                activeCredit={activeCredit}
                isDesktop={isDesktop}
            />
            <Box
                sx={{
                    overflowX: "hidden"
                }}
            >
                <AppContainer
                    sx={{
                        maxWidth: "1320px"
                    }}
                >
                    <Breadcrumb
                        list={[
                            {
                                label: t("pagination.main"),
                                link: "/"
                            },
                            {
                                label: t("pagination.config"),
                            },
                            {
                                label: product.name[locale]
                            }
                        ]}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: {xs: "20px", sm: 0},
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {xs: "row", sm: "column"},
                                order: {xs: 2, sm: 1},
                                gap: "25px",
                                height: {xs: "100%", sm: "375px"},
                                overflowX: product.images.length > 3 ? {xs: "scroll", sm: "hidden"} : "hidden",
                                overflowY: product.images.length > 3 ? {xs: "hidden", sm: "scroll"} : "hidden",
                                width: "min-content",

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
                            {product.images.map((item) => (
                                <Box
                                    key={item.id}
                                    onClick={() => handleClickImage(item)}
                                    sx={{
                                        backgroundColor: "#404040",
                                        minWidth: "100px",
                                        minHeight: "100px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: activeImage?.id === item.id ? "2px" : 0,
                                        borderStyle: "solid",
                                        borderColor: theme => activeImage?.id === item.id ? theme.palette.primary.main : "transparent",
                                        cursor: "pointer"
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image_path}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                width: "400px",
                                height: "400px",
                                position: "relative",
                                order: {xs: 1, sm: 2},
                            }}
                        >
                            <Zoom>
                                <Box
                                    component="img"
                                    src={activeImage?.image_path}
                                    sx={{
                                        width: "100%",
                                        maxHeight: "400px",
                                        height: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </Zoom>
                            {isDiscount && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        display: "flex",
                                        gap: "20px"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                            borderColor: theme => theme.palette.primary.main,
                                            color: theme => theme.palette.primaryText.main,
                                            fontSize: 16,
                                            fontWeight: 700,
                                            lineHeight: "20px",
                                            padding: "10px",
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
                        </Box>

                        <Box
                            sx={{
                                maxWidth: "363px",
                                order: {xs: 3, sm: 3},
                            }}
                        >
                            <Typography
                                component="h2"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: {xs: 18, sm: 30},
                                    lineHeight: {xs: "20px", sm: "30px"},
                                    color: theme => theme.palette.primaryText.main,
                                    ...clampText(2, 30),
                                }}
                            >
                                {product.name[locale]}
                            </Typography>

                            <Typography
                                component="p"
                                sx={{
                                    fontSize: {xs: 12, sm: 14},
                                    lineHeight: "20px",
                                    color: "#CCCCCC",
                                    ...clampText(3, 20),
                                }}
                                dangerouslySetInnerHTML={{__html: product.description[locale]}}
                            />
                            <Button
                                variant="text"
                                onClick={() => setIsDetailProductOpen(true)}
                                sx={{
                                    padding: 0,
                                    fontSize: 13,
                                    lineHeight: "20px",
                                    textTransform: "math-auto"
                                }}
                            >
                                {t("readMore")}
                            </Button>

                            <Typography
                                variant="h3"
                                sx={{
                                    mt: "4px",
                                    color: theme => theme.palette.primaryText.main,
                                    fontWeight: 600,
                                    fontSize: {xs: 22, sm: 30},
                                    lineHeight: "36px"
                                }}
                            >
                                {formatPrice(isDiscount ? product.discount[currency] || 0 : product.price[currency])}
                            </Typography>

                            <Box
                                sx={{
                                    mt: "13px",
                                    display: "flex",
                                    gap: "14px"
                                }}
                            >
                                <AppButton
                                    label={t("btns.buy")}
                                    size="small"
                                    onClick={handleBuy}
                                    sx={{
                                        width: {xs: "100%", sm: "max-content"},
                                        padding: "11px 21px"
                                    }}
                                />
                                <AppButton
                                    label={t("btns.toBasket")}
                                    size="small"
                                    variant={basketProduct ? "contained" : "outlined"}
                                    onClick={handleClickBasket}
                                    sx={{
                                        width: {xs: "100%", sm: "max-content"},
                                        padding: "11px 21px",
                                        color: theme => theme.palette.primaryText.main
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                padding: "24px 16px",
                                backgroundColor: "#252525",
                                maxWidth: "306px",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                order: 4,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    lineHeight: "20px",
                                    color: theme => theme.palette.primaryText.main
                                }}
                            >
                                {t("divPay")}
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    {Object.keys(availableCredit).map((item) => (
                                        <FormControlLabel
                                            key={item}
                                            value={item}
                                            checked={activeAvailableCredit === item}
                                            onChange={() => {
                                                setActiveAvailableCredit(item);
                                                setActiveCredit(null)
                                            }}
                                            control={
                                                <Radio
                                                    sx={{
                                                        "& svg": {
                                                            fill: theme => theme.palette.primaryText.main
                                                        }
                                                    }}
                                                />
                                            }
                                            label={item}
                                            sx={{
                                                color: theme => theme.palette.primaryText.main,
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <Box
                                sx={{
                                    mt: "18px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "7px",
                                    mb: "12px"
                                }}
                            >
                                {activeAvailableCredit && availableCredit[activeAvailableCredit].map((item) => (
                                    <Box
                                        key={item.id}
                                        onClick={() => {
                                            setActiveCredit(item);
                                            setBasketProduct(getBasketProductByIdAndCreditId(product.id, item.id || null));
                                        }}
                                        sx={{
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                            borderColor: item.id === activeCredit?.id ? "#D3176D" : "#DEDEDE",
                                            width: "100%",
                                            padding: "8px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "77px",
                                                height: "25px"
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={item.logo}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>

                                        <Typography
                                            sx={{
                                                color: theme => theme.palette.primaryText.main,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {activeAvailableCredit && (
                                                (item[currency]).toLocaleString("ru-RU", {
                                                    maximumFractionDigits: 0
                                                }) + " " + currency + "/" + "мес"
                                            )}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Box
                                sx={{
                                    mt: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <AppButton
                                    size="small"
                                    label={t("btns.reset")}
                                    onClick={() => setActiveCredit(null)}
                                    sx={{
                                        fontSize: 14,
                                        padding: "10px 87px"
                                    }}
                                />
                            </Box>
                        </Box>

                    </Box>
                </AppContainer>

                {similarProducts && (
                    <Box
                        sx={{
                            padding: "40px 0"
                        }}
                    >
                        <AppContainer
                            sx={{
                                maxWidth: "1320px"
                            }}
                        >
                            <TitleSection
                                label={t("relatedProd")}
                            />
                            <Box
                                sx={{
                                    mt: "30px"
                                }}
                            >
                                <ProductSlider
                                    list={similarProducts}

                                />
                            </Box>
                        </AppContainer>
                    </Box>
                )}

                <Box
                    sx={{
                        backgroundColor: theme => theme.palette.secondary.light,
                        padding: "45px 0"
                    }}
                >
                    <AppContainer
                        sx={{
                            maxWidth: "1320px"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <TitleSection label={t("comments.title")}/>
                            <SectionDescription label={t("comments.description")}/>
                        </Box>
                        <ReviewSlider
                            breakpoints={reviewBreakpoints}
                            list={product.comments}
                            containerSx={{
                                clipPath: "inset(-100vw -100vw -100vw 0)",
                                "& .react-multi-carousel-list": {
                                    overflow: "visible"
                                }
                            }}
                        />
                    </AppContainer>
                </Box>
            </Box>
        </>
    );
};

export default ProductPage;

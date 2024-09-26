"use client";
import AppContainer from '@/ui/app-container/app-container';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    SvgIcon,
    TextField,
    useTheme
} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {createOrder, IDeliveryMethods, IPaymentTypes} from "@/http/checkout-api";
import {useLocale, useTranslations} from "next-intl";
import AppButton from "@/ui/button/button";
import {IProductCredit, Product} from "@/http/products-api";
import {getBasketProducts, removeProductFromBasket} from "@/utils/basket-util";
import axios, {AxiosError} from "axios";
import {useAppContext} from "@/context/app-context";
import {useRouter} from "next/navigation";
import {toastError, toastSuccess} from "@/utils/toast-util";
import uuidv4 from "@/utils/uuidv4";
import {Desktop} from "@/http/desktops-api";
import Image from "next/image";
import {clampText} from "@/utils/clamp-text";
import ProductDetailDrawer from "@/components/product-detail-drawer/product-detail-drawer";
import {formatAndParseResponseError} from "@/utils/axios";
import CustomTelInput from "@/components/tel-input/tel-input";


interface ICheckout {
    deliveryMethods: IDeliveryMethods[];
    paymentTypes: IPaymentTypes[];
    configurator: string | undefined;
    desktopProductsId: string[] | undefined;
    product: {
        productId: string | undefined;
        productSlug: string | undefined;
        isProductDesktop: "1" | "0" | undefined;
    }
}

const Checkout: FC<ICheckout> = ({deliveryMethods, paymentTypes, product, configurator, desktopProductsId}) => {
    const localActive = useLocale() as "ru" | "uz";
    const theme = useTheme();
    const [activeDeliveryMethod, setActiveDeliveryMethod] = useState<number | null>(null);
    const [activePaymentType, setActivePaymentType] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const {currency, formatPrice, refreshBasketProducts} = useAppContext();
    const [isDetailProductOpen, setIsDetailProductOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        comment: "",
    });
    const [products, setProducts] = useState<{
        product: Product | Desktop;
        productId: number;
        productSlug: number;
        credit: IProductCredit,
        count: number;
        id: string;
        isDesktop?: boolean;
    }[]>([]);
    const [configuratorDesktop, setConfiguratorDesktop] = useState<Desktop | null>(null);
    const errorTranslations = useTranslations("Errors");

    const totalPrice = products.reduce((acc, item) => acc + item.product.price[currency], 0);
    const router = useRouter();

    const handleChangeDeliveryMethod = (deliveryId: number) => {
        setActiveDeliveryMethod(deliveryId);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleChangePhone = (newValue: string) => {
        setFormData((prev) => ({
            ...prev,
            phoneNumber: newValue,
        }));
    }

    const handleSubmit = async () => {
        try {
            let {fullName, address, comment, phoneNumber} = formData;
            if (phoneNumber.length != 12) {
                toastError(errorTranslations("invalidPhoneNumber"), theme);
                return;
            }
            if(!fullName) {
                toastError(errorTranslations("fullNameShouldBeFilled"), theme);
                return;
            }
            if (!activeDeliveryMethod) {
                toastError(errorTranslations("notSelectedDeliveryType"), theme);
                return;
            }
            if (!activePaymentType) {
                toastError(errorTranslations("notSelectedPaymentType"), theme);
                return;
            }
            if (!address) {
                toastError(errorTranslations("addressShouldBeFilled"), theme);
                return;
            }
            if (configurator && desktopProductsId) {
                if (activePaymentType == 3) {
                    toastError(errorTranslations("cannotSelectCreditForConfiguration"), theme);
                    return;
                }

                await createOrder({
                    customer_name: fullName,
                    customer_phone: "+998" + phoneNumber.replaceAll(/[+|\s-]/g, ""),
                    address: address,
                    comment: comment,
                    delivery_method_id: activeDeliveryMethod,
                    total_price: 0,
                    products: [{
                        desktop_id: +configurator,
                        quantity: 1,
                        payment_type_id: activePaymentType,
                        edit_product: desktopProductsId.map((item) => +item),
                    }],
                });
            } else {
                await createOrder({
                    customer_name: fullName,
                    customer_phone: "+998" + phoneNumber.replaceAll(/[+|\s-]/g, ""),
                    address: address,
                    comment: comment,
                    delivery_method_id: activeDeliveryMethod,
                    total_price: 0,
                    products: products.map((item) => {
                        let basketProduct: {
                            product_id?: number;
                            quantity: number;
                            payment_type_id: number;
                            credit_id?: number;
                            credit_term?: number;
                            desktop_id?: number;
                        } = {
                            quantity: item.count,
                            payment_type_id: activePaymentType,
                        }

                        if (item.isDesktop) {
                            basketProduct.desktop_id = item.productId;
                        } else {
                            basketProduct.product_id = item.productId;
                        }

                        if (item.credit) {
                            basketProduct.credit_id = item.credit.id;
                            basketProduct.credit_term = item.credit.months;
                        } else if (activePaymentType === 3) {
                            basketProduct.credit_term = 12;
                            basketProduct.credit_id = 4;
                        }

                        return basketProduct;
                    })
                });
                products.forEach((item) => removeProductFromBasket(item.id));
                refreshBasketProducts();
            }
            toastSuccess("Ваша заявка отправлена", theme);
            router.push(`/${localActive}/`);
        } catch (e) {
            if (e instanceof AxiosError) {
                formatAndParseResponseError(e, theme);
            }
            console.log(e);
        }

    }

    const fetchData = async () => {
        let _products = getBasketProducts();
        if (product.productSlug && product.productId) {
            _products = [
                {
                    productId: +product.productId,
                    productSlug: product.productSlug,
                    credit: null,
                    count: 1,
                    id: uuidv4(),
                    isDesktop: product.isProductDesktop === "1"
                }
            ]
        }
        try {
            if (configurator && desktopProductsId) {
                const {data} = await axios.post("/api/configurator", {
                    desktopId: configurator,
                    productIds: desktopProductsId
                });
                console.log(data);
                setConfiguratorDesktop(data);
            } else {
                const {data} = await axios.post("/api/basket", {
                    products: _products
                });
                setProducts(data);
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const handleChangePaymentTypes = (paymentId: number) => {
        setActivePaymentType(paymentId);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const t = useTranslations("Checkout")
    if (loading) {
        return null;
    }
    return (
        <>
            {configuratorDesktop && (
                <ProductDetailDrawer
                    isOpen={isDetailProductOpen}
                    onClose={() => setIsDetailProductOpen(false)}
                    product={configuratorDesktop}
                    isInBasket={false}
                    handleClickBasket={() => undefined}
                    basketProduct={null}
                    activeCredit={null}
                    isDesktop={true}
                    isConfigurator={true}
                />
            )}
            <Box
                sx={{
                    padding: "40px 0"
                }}
            >
                <AppContainer
                    sx={{
                        display: "flex",
                        gap: "22px",
                        justifyContent: "center",
                        flexDirection: {xs: "column", md: "row"}
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "644px",
                            width: "100%"
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 16,
                                color: theme => theme.palette.primaryText.main
                            }}
                        >
                            {t("titles.order")}
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: "#2D2D2D",
                                padding: "8px 10px",
                                display: "flex",
                                mt: "16px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#D1D1D1",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    display: "flex"
                                }}
                            >
                                {t("placeholders.fullName")}*
                            </Typography>
                            <TextField
                                variant="standard"
                                name="fullName"
                                onChange={handleChange}
                                value={formData.fullName}
                                sx={{
                                    ml: "10px",
                                    "& .MuiInputBase-input": {
                                        padding: 0,
                                        color: theme => theme.palette.primaryText.main
                                    },
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#2D2D2D",
                                padding: "8px 10px",
                                display: "flex",
                                mt: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#D1D1D1",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    display: "flex"
                                }}
                            >
                                {t("placeholders.phoneNum")}
                            </Typography>


                            <CustomTelInput
                                value={formData.phoneNumber}
                                onChange={handleChangePhone}
                                variant="standard"
                                InputProps={{
                                    startAdornment: (
                                        <Typography
                                            sx={{
                                                mr: "8px"
                                            }}
                                        >
                                            +998
                                        </Typography>
                                    ),
                                    sx: {
                                        ml: "10px",
                                        color: theme => theme.palette.primaryText.main,
                                        '&::placeholder': {
                                            color: theme => theme.palette.primaryText.main,
                                            padding: 0,
                                            fontSize: 20,
                                            lineHeight: "24px"
                                        }
                                    }
                                }}
                            />

                        </Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 16,
                                color: theme => theme.palette.primaryText.main,
                                mt: "24px"
                            }}
                        >
                            {t("titles.receive")}
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                row
                            >
                                {deliveryMethods.map((item) => (
                                    <FormControlLabel
                                        key={item.id}
                                        value={item.id}
                                        onChange={() => handleChangeDeliveryMethod(item.id)}
                                        checked={item.id === activeDeliveryMethod}
                                        control={
                                            <Radio
                                                sx={{
                                                    "& svg": {
                                                        fill: theme => theme.palette.primaryText.main
                                                    }
                                                }}
                                            />
                                        }
                                        sx={{
                                            color: theme => theme.palette.primaryText.main,
                                            fontSize: "18px",
                                            fontWeight: 500
                                        }}
                                        label={item.name[localActive]}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Box>
                            {activeDeliveryMethod === 2 && [
                                {
                                    label: t("deliveryMethods.mebel.title"),
                                    logo: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20"
                                             viewBox="0 0 28 20"
                                             fill="none">
                                            <path
                                                d="M2.75 0C2.08696 0 1.45107 0.263392 0.982233 0.732233C0.513392 1.20107 0.25 1.83696 0.25 2.5V16.25H2.75C2.75 17.2446 3.14509 18.1984 3.84835 18.9017C4.55161 19.6049 5.50544 20 6.5 20C7.49456 20 8.44839 19.6049 9.15165 18.9017C9.85491 18.1984 10.25 17.2446 10.25 16.25H17.75C17.75 17.2446 18.1451 18.1984 18.8483 18.9017C19.5516 19.6049 20.5054 20 21.5 20C22.4946 20 23.4484 19.6049 24.1517 18.9017C24.8549 18.1984 25.25 17.2446 25.25 16.25H27.75V10L24 5H20.25V0M11.5 2.5L16.5 7.5L11.5 12.5V8.75H4V6.25H11.5M20.25 6.875H23.375L25.8375 10H20.25M6.5 14.375C6.99728 14.375 7.47419 14.5725 7.82583 14.9242C8.17746 15.2758 8.375 15.7527 8.375 16.25C8.375 16.7473 8.17746 17.2242 7.82583 17.5758C7.47419 17.9275 6.99728 18.125 6.5 18.125C6.00272 18.125 5.52581 17.9275 5.17417 17.5758C4.82254 17.2242 4.625 16.7473 4.625 16.25C4.625 15.7527 4.82254 15.2758 5.17417 14.9242C5.52581 14.5725 6.00272 14.375 6.5 14.375ZM21.5 14.375C21.9973 14.375 22.4742 14.5725 22.8258 14.9242C23.1775 15.2758 23.375 15.7527 23.375 16.25C23.375 16.7473 23.1775 17.2242 22.8258 17.5758C22.4742 17.9275 21.9973 18.125 21.5 18.125C21.0027 18.125 20.5258 17.9275 20.1742 17.5758C19.8225 17.2242 19.625 16.7473 19.625 16.25C19.625 15.7527 19.8225 15.2758 20.1742 14.9242C20.5258 14.5725 21.0027 14.375 21.5 14.375Z"
                                                fill="#929292"/>
                                        </svg>),
                                    price: "100 000" + t("deliveryMethods.mebel.price")
                                },
                                {
                                    label: t("deliveryMethods.freeOneDay.title"),
                                    description: t("deliveryMethods.freeOneDay.desc"),
                                    logo: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="26"
                                             viewBox="0 0 18 26"
                                             fill="none">
                                            <path
                                                d="M9 12.375C8.1712 12.375 7.37634 12.0458 6.79029 11.4597C6.20424 10.8737 5.875 10.0788 5.875 9.25C5.875 8.4212 6.20424 7.62634 6.79029 7.04029C7.37634 6.45424 8.1712 6.125 9 6.125C9.8288 6.125 10.6237 6.45424 11.2097 7.04029C11.7958 7.62634 12.125 8.4212 12.125 9.25C12.125 9.66038 12.0442 10.0667 11.8871 10.4459C11.7301 10.825 11.4999 11.1695 11.2097 11.4597C10.9195 11.7499 10.575 11.9801 10.1959 12.1371C9.81674 12.2942 9.41038 12.375 9 12.375ZM9 0.5C6.67936 0.5 4.45376 1.42187 2.81282 3.06282C1.17187 4.70376 0.25 6.92936 0.25 9.25C0.25 15.8125 9 25.5 9 25.5C9 25.5 17.75 15.8125 17.75 9.25C17.75 6.92936 16.8281 4.70376 15.1872 3.06282C13.5462 1.42187 11.3206 0.5 9 0.5Z"
                                                fill="#929292"/>
                                        </svg>
                                    ),
                                },
                                {
                                    label: t("deliveryMethods.toRegions.title"),
                                    description: t("deliveryMethods.toRegions.desc"),
                                    logo: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24"
                                             viewBox="0 0 12 24"
                                             fill="none">
                                            <path
                                                d="M12 6C12 8.79 10.08 11.115 7.5 11.79V21C7.5 22.5 4.5 24 4.5 24V11.79C1.92 11.115 0 8.79 0 6C0 2.685 2.685 0 6 0C9.315 0 12 2.685 12 6ZM3 4.5C3 5.325 3.675 6 4.5 6C5.325 6 6 5.325 6 4.5C6 3.675 5.325 3 4.5 3C3.675 3 3 3.675 3 4.5Z"
                                                fill="#929292"/>
                                        </svg>
                                    )
                                }
                            ].map((item, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        padding: "16px 20px",
                                        borderColor: theme => theme.palette.primary.main,
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        mt: "12px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "27px",
                                                height: "20px",
                                            }}
                                        >
                                            <SvgIcon>
                                                {item.logo}
                                            </SvgIcon>
                                        </Box>
                                        <Box
                                            sx={{
                                                ml: "10px"
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "16px",
                                                    fontWeight: 600,
                                                    color: theme => theme.palette.primaryText.main
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    lineHeight: "14px",
                                                    color: "#B8B8B8"
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Box>
                                    </Box>

                                </Box>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                backgroundColor: "#2D2D2D",
                                padding: "8px 10px",
                                display: "flex",
                                mt: "16px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#D1D1D1",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    display: "flex",
                                }}
                            >
                                {t("placeholders.adress")}*
                            </Typography>
                            <TextField
                                name="address"
                                onChange={handleChange}
                                value={formData.address}
                                variant="standard"
                                sx={{
                                    ml: "10px",
                                    "& .MuiInputBase-input": {
                                        padding: 0,
                                        color: theme => theme.palette.primaryText.main
                                    }
                                }}
                            />

                        </Box>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 16,
                                color: theme => theme.palette.primaryText.main,
                                mt: "24px"
                            }}
                        >
                            {t("titles.payMethod")}
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                row
                            >
                                {paymentTypes.map((item) => (
                                    <FormControlLabel
                                        key={item.id}
                                        value={item.id}
                                        onChange={() => handleChangePaymentTypes(item.id)}
                                        checked={item.id === activePaymentType}
                                        control={
                                            <Radio
                                                sx={{
                                                    "& svg": {
                                                        fill: theme => theme.palette.primaryText.main
                                                    }
                                                }}
                                            />
                                        }
                                        sx={{
                                            color: theme => theme.palette.primaryText.main,
                                            fontSize: "18px",
                                            fontWeight: 500
                                        }}
                                        label={item.name[localActive]}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 16,
                                color: theme => theme.palette.primaryText.main,
                                mt: "24px"
                            }}
                        >
                            {t("titles.comment")}
                        </Typography>
                        <textarea
                            name="phoneNumber"
                            onChange={(e) => setFormData((prev) => ({...prev, comment: e.target.value}))}
                            value={formData.comment}
                            style={{
                                background: "transparent",
                                resize: "vertical",
                                width: "100%",
                                color: theme.palette.primaryText.main,
                                fontFamily: "ClashDisplay-Variable,sans-serif",
                                height: "105px",
                                marginTop: "8px"
                            }}
                        />

                        <Box
                            sx={{
                                mt: "20px"
                            }}
                        >
                            <AppButton
                                size={"small"}
                                onClick={handleSubmit}
                                label={t("titles.order")}
                                sx={{
                                    fontSize: 18,
                                    textTransform: "math-auto"
                                }}
                            />
                        </Box>

                    </Box>
                    <Box
                        sx={{
                            width: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                borderColor: theme.palette.primary.main,
                                borderStyle: "solid",
                                borderWidth: "3px",
                                padding: "24px 18px",
                                width: "100%",
                                maxWidth: "300px"
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
                                        fontSize: 14,
                                        lineHeight: "20px",
                                        color: theme.palette.primaryText.main
                                    }}
                                >
                                    {`${t("count.prods")}:`}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        lineHeight: "20px",
                                        color: theme.palette.primaryText.main
                                    }}
                                >
                                    {products.reduce((acc, item) => acc + item.count, 0)}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: "10px"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        lineHeight: "20px",
                                        color: theme.palette.primaryText.main
                                    }}
                                >
                                    {`${t("count.deliv")}:`}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        lineHeight: "20px",
                                        color: theme.palette.primaryText.main
                                    }}
                                >
                                    {currency === "uzs" ? "100 000 сум" : "10$"}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: "10px"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        lineHeight: "20px",
                                        color: theme.palette.primaryText.main
                                    }}
                                >
                                    {`${t("count.overall")}:`}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 14,
                                        lineHeight: "20px",
                                        color: theme.palette.primaryText.main
                                    }}
                                >
                                    {formatPrice(totalPrice)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                backgroundColor: "#131212",
                                padding: "32px 15px",
                                mt: "28px"
                            }}
                        >
                            {configuratorDesktop ? (
                                <Box
                                    sx={{
                                        padding: "17px 7px",
                                        borderWidth: "0 0 1px 0",
                                        borderColor: "#2F2F2F",
                                        borderStyle: "solid",
                                        display: "flex",
                                        gap: "18px"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#404040",
                                            padding: "18px 15px",
                                            width: "100px",
                                            height: "100px",
                                            minWidth: "100px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        >
                                            <Image
                                                src={configuratorDesktop.images?.[0]?.image_path}
                                                alt="product image"
                                                fill
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",

                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            padding: "15px 0"
                                        }}
                                    >
                                        <Typography
                                            color="primaryText.main"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 16,
                                                lineHeight: "30px",
                                                ...clampText(1, 30)
                                            }}
                                        >
                                            {configuratorDesktop.name[localActive]}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#CCCCCC",
                                                fontSize: 14,
                                                lineHeight: "16px"
                                            }}
                                        >
                                            Кол-во: {configuratorDesktop.products.length}
                                        </Typography>
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
                                            Читать далее
                                        </Button>
                                    </Box>

                                </Box>
                            ) : products.map((product) => (
                                <Box
                                    key={product.id}
                                    sx={{
                                        padding: "17px 7px",
                                        borderWidth: "0 0 1px 0",
                                        borderColor: "#2F2F2F",
                                        borderStyle: "solid",
                                        display: "flex",
                                        gap: "18px"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#404040",
                                            padding: "18px 15px",
                                            width: "100px",
                                            height: "100px",
                                            minWidth: "100px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        >
                                            <Image
                                                src={product.product.images?.[0]?.image_path}
                                                alt="product image"
                                                fill
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",

                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            padding: "15px 0"
                                        }}
                                    >
                                        <Typography
                                            color="primaryText.main"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 16,
                                                lineHeight: "30px",
                                                ...clampText(1, 30)
                                            }}
                                        >
                                            {product.product.name[localActive]}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#CCCCCC",
                                                fontSize: 14,
                                                lineHeight: "16px"
                                            }}
                                        >
                                            Кол-во: {product.count}
                                        </Typography>
                                        <Typography
                                            color="primaryText.main"
                                            sx={{
                                                mt: "5px",
                                                fontWeight: 600,
                                                fontSize: 14,
                                                lineHeight: "20px"
                                            }}
                                        >
                                            {product.credit ? (
                                                formatPrice(product.credit[currency] / product.credit.months) + "/мес"
                                            ) : (
                                                formatPrice(product.product.price[currency])
                                            )}
                                        </Typography>
                                    </Box>

                                </Box>
                            ))}
                        </Box>

                    </Box>
                </AppContainer>
            </Box>
        </>
    );
};

export default Checkout;
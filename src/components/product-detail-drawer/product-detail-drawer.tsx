import React, {FC} from 'react';
import {Box, Drawer} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IProductCredit, Product} from "@/http/products-api";
import {useLocale} from 'next-intl';
import {useAppContext} from "@/context/app-context";
import AppButton from "@/ui/button/button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {IBasketProduct} from "@/utils/basket-util";
import {Desktop} from "@/http/desktops-api";

interface IProductDetailDrawer {
    isOpen: boolean;
    onClose: () => void;
    product: Product | Desktop;
    isInBasket: boolean;
    handleClickBasket: () => void;
    basketProduct: IBasketProduct | null;
    activeCredit: IProductCredit | null;
    isDesktop: boolean | undefined;
    isConfigurator?: boolean;
}

const ProductDetailDrawer: FC<IProductDetailDrawer> = ({
                                                           isOpen,
                                                           onClose,
                                                           product,
                                                           isInBasket,
                                                           handleClickBasket,
                                                           basketProduct,
                                                           activeCredit,
                                                           isDesktop,
                                                           isConfigurator
                                                       }) => {
    const localActive = useLocale() as "ru" | "uz";
    const {currency, formatPrice} = useAppContext();

    return (
        <Drawer
            anchor={"right"}
            open={isOpen}
            onClose={onClose}
            sx={{}}
            PaperProps={{
                sx: {
                    backgroundColor: theme => theme.palette.secondary.light,
                    maxWidth: "780px",
                    width: "100%"
                }
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    padding: "30px",
                    paddingBottom: "100px"

                }}
            >
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    <IconButton
                        sx={{
                            ml: "auto",
                            padding: 0
                        }}
                        onClick={onClose}
                    >
                        <CloseIcon
                            sx={{
                                fill: theme => theme.palette.primaryText.main
                            }}
                        />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        height: "100%",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {xs: 18, sm: 22},
                            fontWeight: 600,
                            lineHeight: "30px",
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        {product.name[localActive]}
                    </Typography>
                    <Typography
                        component="pre"
                        sx={{
                            fontSize: {xs: 12, sm: 16},
                            lineHeight: {xs: "18px", sm: "30px"},
                            mt: "12px",
                            color: theme => theme.palette.primaryText.main,
                            whiteSpace: "pre-wrap"
                        }}
                        dangerouslySetInnerHTML={{__html: product.description[localActive]}}
                    />

                    <Typography
                        sx={{
                            fontSize: {xs: 14, sm: 16},
                            fontWeight: 600,
                            lineHeight: "30px",
                            mt: "16px",
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        Общие характеристики
                    </Typography>
                    {/*@ts-ignore*/}
                    {isDesktop ? product?.products?.map((item: Product) => (
                        <Box
                            key={item.id}
                            sx={{
                                mt: "10px"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Typography
                                    color="primary.main"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: {xs: 12, sm: 18},
                                        textTransform: "capitalize"
                                    }}
                                >
                                    {item.type.replaceAll(/[_]/g, " ")}
                                </Typography>
                                <Typography
                                    color="primaryText.main"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: {xs: 12, sm: 17},
                                        textAlign: "right"
                                    }}
                                >
                                    {item.name[localActive]}
                                </Typography>
                            </Box>
                            {item.attributes.map((attribute) => (
                                <Box
                                    key={attribute.id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: {xs: 12, sm: 16},
                                            fontWeight: 400,
                                            lineHeight: "30px",
                                            color: theme => theme.palette.secondaryText.main
                                        }}
                                    >
                                        {attribute.type[localActive]}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: {xs: 12, sm: 16},
                                            fontWeight: 400,
                                            lineHeight: "30px",
                                            color: theme => theme.palette.secondaryText.main
                                        }}
                                    >
                                        {attribute.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )) : product.attributes.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {xs: 12, sm: 16},
                                    fontWeight: 400,
                                    lineHeight: "30px",
                                    color: theme => theme.palette.primaryText.main
                                }}
                            >
                                {item.type[localActive]}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: {xs: 12, sm: 16},
                                    fontWeight: 400,
                                    lineHeight: "30px",
                                    color: theme => theme.palette.primaryText.main
                                }}
                            >
                                {item.value}
                            </Typography>
                        </Box>
                    ))}


                </Box>
            </Box>

            {!isConfigurator && (
                <Box
                    sx={{
                        backgroundColor: theme => theme.palette.productBackground.main,
                        padding: {xs: "14px 20px", sm: "20px 70px"},
                        display: "flex",
                        alignItems: "center",

                        position: "fixed",
                        zIndex: 100,
                        bottom: 0,

                        width: "100%"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: {xs: 16, sm: 24},
                            lineHeight: "29px",
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        {formatPrice(product.price[currency])}
                    </Typography>
                    <Box
                        sx={{
                            ml: {xs: "20px", sm: "42px"}
                        }}
                    >
                        <AppButton
                            size={"large"}
                            label={"В корзину"}
                            onClick={handleClickBasket}
                            variant={basketProduct ? "contained" : "outlined"}
                            sx={{
                                fontSize: {xs: "16px", sm: "18px"},
                                padding: {xs: "8px 37px", sm: "13px 60px"}
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Drawer>
    );
};

export default ProductDetailDrawer;
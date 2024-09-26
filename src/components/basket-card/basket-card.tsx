import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import TrashIcon from "@/ui/icons/trash-icon";
import {IProductCredit, Product} from "@/http/products-api";
import {useLocale} from "next-intl";
import {clampText} from "@/utils/clamp-text";
import {useAppContext} from "@/context/app-context";
import IconButton from "@mui/material/IconButton";
import {Desktop} from "@/http/desktops-api";

interface IBasketCardProps {
    product: {
        product: Product | Desktop;
        productId: number;
        productSlug: number;
        credit: IProductCredit;
        count: number;
        id: string;
    };
    handleChangeCountOfProducts: (id: string, type: "INC" | "DEC") => void;
    removeProductFromBasket: (id: string) => void;
}

const BasketCard: FC<IBasketCardProps> = ({product, handleChangeCountOfProducts, removeProductFromBasket}) => {
    const localeActive = useLocale() as "ru" | "uz";
    const {currency, formatPrice} = useAppContext();

    const handleChange = (type: "INC" | "DEC") => {
        if (type === "DEC" && (product.count - 1 === 0)) {
            return;
        }
        handleChangeCountOfProducts(product.id, type);
    }

    const handleClick = () => {
        removeProductFromBasket(product.id);
    }


    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#404040",
                    width: "100px",
                    height: "100px",
                    padding: "10px"
                }}
            >
                <Box
                    component="img"
                    src={product.product.images?.[0]?.image_path}
                    sx={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%"
                    }}
                />
            </Box>

            <Box
                sx={{
                    ml: "18px",
                    display: "flex",
                    flex: 1,
                    flexWrap: "wrap"
                }}
            >
                <Box
                    sx={{
                        maxWidth: "237px",
                        width: "100%"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: theme => theme.palette.primaryText.main,
                            ...clampText(1, 30)
                        }}
                    >
                        {product.product.name[localeActive]}
                    </Typography>
                    <Typography
                        component="p"
                        sx={{
                            fontSize: 14,
                            color: "#CCCCCC",
                            ...clampText(3, 20)
                        }}
                    >
                        {product.product.description[localeActive]}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        maxWidth: "121px",
                        width: "100%",
                        ml: "10px"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        Заказ
                    </Typography>
                    <Typography
                        component="p"
                        sx={{
                            fontSize: 14,
                            color: "#CCCCCC"
                        }}
                    >
                        1-3 дней
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "min-content",
                        maxWidth: "130px",
                        width: "100%",
                        mt: {xs: "12px", sm: 0}
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#262626",
                            width: "25px",
                            height: "30px",
                            fontSize: 16,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: theme => theme.palette.primaryText.main
                        }}
                        onClick={() => handleChange("DEC")}
                    >
                        -
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "#2D2D2D",
                            width: "25px",
                            height: "30px",
                            fontSize: 16,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        {product.count}
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "#2D2D2D",
                            width: "25px",
                            height: "30px",
                            fontSize: 16,
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: theme => theme.palette.primaryText.main
                        }}
                        onClick={() => handleChange("INC")}
                    >
                        +
                    </Box>

                    <IconButton
                        sx={{
                            ml: "14px",
                            padding: 0,
                        }}
                        onClick={handleClick}
                    >
                        <TrashIcon
                            sx={{
                                fontSize: 18
                            }}
                        />
                    </IconButton>
                </Box>

                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 16,
                        color: theme => theme.palette.primaryText.main,
                        order: {xs: -1, sm: 4}
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
    );
};

export default BasketCard;
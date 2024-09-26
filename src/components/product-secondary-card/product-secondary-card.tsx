import {Box} from '@mui/material';
import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import {Product} from "@/http/products-api";
import {useLocale} from "next-intl";
import {useAppContext} from "@/context/app-context";
import {clampText} from "@/utils/clamp-text";
import NavigationLink from "@/components/navigation-link/navigation-link";

interface IProductSecondaryCardProps {
    item: Product;
}

const ProductSecondaryCard: FC<IProductSecondaryCardProps> = ({item: product}) => {
    const localActive = useLocale() as "ru" | "uz"
    const {currency, formatPrice} = useAppContext();

    return (
        <NavigationLink href={`/products/${product.slug}`}>
            <Box
                sx={{
                    width: "304px",
                    height: "325px",
                    backgroundColor: theme => theme.palette.productBackground.main,
                    padding: "22px 38px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "226px"
                    }}
                >
                    <Box
                        component="img"
                        src={product.images?.[0]?.image_path}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Box>

                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 16,
                        lineHeight: "24px",
                        color: theme => theme.palette.primaryText.main,
                        ...clampText(1, 24)
                    }}
                >
                    {product.name[localActive]}
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 20,
                        lineHeight: "24px",
                        color: theme => theme.palette.primaryText.main
                    }}
                >
                    {formatPrice(product.price[currency])}
                </Typography>
            </Box>
        </NavigationLink>
    );
};

export default ProductSecondaryCard;
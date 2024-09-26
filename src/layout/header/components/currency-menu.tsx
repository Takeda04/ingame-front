import React, {FC, useRef} from 'react';
import Button from "@mui/material/Button";
import ArrowIcon from "@/ui/icons/arrow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import {useAppContext} from "@/context/app-context";
import {useOutsideClick} from "@/hooks/use-outside-click";

interface ICurrencyMenuProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const CurrencyMenu: FC<ICurrencyMenuProps> = ({isOpen, onOpen, onClose}) => {
    const {changeCurrency, currency = "uzs"} = useAppContext();
    const theme = useTheme();

    const containerRef = useRef(null);

    useOutsideClick(containerRef, onClose);

    const handleClick = () => {
        if (isOpen) {
            onClose();
            return;
        }
        onOpen();
    }

    const handleChange = (currency: "uzs" | "usd") => {
        changeCurrency(currency);
        onClose();
    }

    return (
        <Box
            sx={{
                position: "relative",
                zIndex: 1000
            }}
            ref={containerRef}
        >
            <Button
                onClick={handleClick}
                sx={{
                    color: "white",
                    textTransform: "capitalize",
                    fontSize: 20,
                    lineHeight: "20px",
                    fontWeight: 400,
                    display: {xs: "none", lg: "flex"}
                }}
            >
                {currency.toUpperCase()}
                <ArrowIcon
                    sx={{
                        width: "14px",
                        margin: "auto",
                        marginLeft: "5px",
                    }}
                />
            </Button>

            {isOpen && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        backgroundColor: theme.palette.primaryText.main,
                        zIndex: 10,
                        left: "10%",
                        width: "80px",
                        display: {xs: "none", lg: "block"}
                    }}
                >
                    <Typography
                        onClick={() => handleChange("usd")}
                        sx={{
                            padding: "10px",
                            color: theme.palette.secondary.dark,
                            cursor: "pointer",
                            backgroundColor: currency === "usd" ? "#cccccc" : "#ffffff"
                        }}
                    >USD</Typography>
                    <Typography
                        onClick={() => handleChange("uzs")}
                        sx={{
                            padding: "10px",
                            color: theme.palette.secondary.dark,
                            cursor: "pointer",
                            backgroundColor: currency === "uzs" ? "#cccccc" : "#ffffff"
                        }}
                    >UZS</Typography>
                </Box>
            )}
        </Box>
    );
};

export default CurrencyMenu;
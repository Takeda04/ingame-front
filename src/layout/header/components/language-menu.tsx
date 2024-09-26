import React, {FC, useRef, useTransition} from 'react';
import Button from "@mui/material/Button";
import ArrowIcon from "@/ui/icons/arrow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useLocale} from "next-intl";
import {useTheme} from "@mui/material";
import {useRouter} from "next/navigation";
import {useOutsideClick} from "@/hooks/use-outside-click";

interface ILanguageMenu {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
const LanguageMenu: FC<ILanguageMenu> = ({ isOpen, onOpen, onClose }) => {
    const theme = useTheme();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const localActive = useLocale();

    const containerRef = useRef(null);
    useOutsideClick(containerRef, onClose);
    const handleChangeLanguage = (lang: string) => {
        const path = window.location.href;
        const url = new URL(path);
        const result = url.pathname.slice(3, url.pathname.length) + url.search;
        startTransition(() => {
            router.replace(`/${lang}${result}`, { scroll: true });
        });
        onClose();
    }

    const handleClick = () => {
        if(isOpen) {
            onClose();
            return;
        }
        onOpen();
    };

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
                    marginLeft: "5px",
                    color: "white",
                    textTransform: "capitalize",
                    fontSize: 20,
                    lineHeight: "20px",
                    fontWeight: 400,
                    display: {xs: "none", lg: "flex"}
                }}
            >
                {localActive.toUpperCase()}
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
                        onClick={() => handleChangeLanguage("ru")}
                        sx={{
                            padding: "10px",
                            color: theme.palette.secondary.dark,
                            cursor: "pointer",
                            backgroundColor: localActive === "ru" ? "#cccccc" : "#ffffff"
                        }}
                    >RU</Typography>
                    <Typography
                        onClick={() => handleChangeLanguage("uz")}
                        sx={{
                            padding: "10px",
                            color: theme.palette.secondary.dark,
                            cursor: "pointer",
                            backgroundColor: localActive === "uz" ? "#cccccc" : "#ffffff"
                        }}
                    >UZ</Typography>
                </Box>
            )}
        </Box>
    );
};

export default LanguageMenu;